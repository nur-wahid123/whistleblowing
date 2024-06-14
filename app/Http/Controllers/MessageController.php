<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Role;
use Date;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MessageController extends Controller
{
    /**
     * Display a listing of the resource.
     */

     public function home(){
        $pesan = Message::where('sender_id', Auth::user()->id)->count();
        $diterima = Message::where('sender_id', Auth::user()->id)->where('status', 'diterima')->count();
        $ditolak = Message::where('sender_id', Auth::user()->id)->where('status', 'ditolak')->count();
        $data = ['pesan' => $pesan, 'diterima' => $diterima, 'ditolak' => $ditolak];
        return Inertia::render('LandingPage', compact('data'));

     }
    public function index()
    {
        $today = now();
        $lastMessageDate = $today;
        $lastMessageDate->subDays(7);
        $countMessage = Message::where("sender_id", auth()->id())->where('created_at', '>', $lastMessageDate)->latest()->count();
        $datas = Message::where('sender_id', auth()->id())->with('sender')->with('reciever')->paginate(10);
        $pics = Role::where('id', '!=', 1, 'and')->where('id', '!=', 5, 'and')->get();
        return Inertia::render('Dashboard', compact('datas', 'pics', 'countMessage'));
    }
    public function userSearch(Request $request)
    {
        // return response()->json($request->all());

        if ($request->searchBy == 'reciever') {
            // dd("halo");
            $messages = Message::whereHas('reciever',function($query) use ($request){
                $query->where('name', 'like', "%{$request->search}%");
            })
                ->where('sender_id', auth()->id())
                ->with(['sender', 'reciever']) // Eager load sender with only ID and email for efficiency
                ->orderBy($request->orderBy, $request->orderType) // Optional: Order by creation date (descending)
                ->paginate(10);
            return response()->json($messages);
        }
        $messages = Message::where(function ($query) use ($request) {
            $query->where('sender_id', auth()->id())
                ->where($request->searchBy, 'like', "%{$request->search}%")
            ;
        })
            // ->where('reciever_id', auth()->user()->role_id) // Assuming filtering by receiver ID
            ->with(['sender', 'reciever']) // Eager load sender with only ID and email for efficiency
            ->orderBy($request->orderBy, $request->orderType) // Optional: Order by creation date (descending)
            ->paginate(10);

        return response()->json($messages);
    }
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            "bagian" => "required|exists:roles,id",
            "message" => "required",
            "image"=>["required","max:5120","file","mimes:png,jpg,jpeg"]
        ]);
        // dd($request->all());
        $today = now();
        $file = $request->file('image');
        $lastMessageDate = $today;
        $lastMessageDate->subDays(7);
        $countMessage = Message::where("sender_id", auth()->id())->where('created_at', '>', $lastMessageDate)->latest()->count();
        // dd($lastMessageDate);
        if ($countMessage >= 4) {
            return redirect()->back()->withErrors('Anda sudah melampaui batas maksimal mengirim pesan pada minggu ini! Jumlah Pesan : ' . $countMessage);
        }
        $message = new Message();
        $message->sender_id = auth()->id();
        $message->reciever_id = $request->bagian;
        $message->value = $request->message;
        $message->save();
        $fileName = "mahasiswa_".$message->id.".".$file->getClientOriginalExtension();
        $message->gambar_mahasiswa = $fileName;
        $message->save();
        $file->storeAs('image/mahasiswa',$fileName,'public');
        return redirect()->back()->with("success", "Berhasil Menambah Pesan");
    }

    /**
     * Display the specified resource.
     */
    public function show(Message $message)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Message $message)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Message $message)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Message $message)
    {
        //
    }
}
