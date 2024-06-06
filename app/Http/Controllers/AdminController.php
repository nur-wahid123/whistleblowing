<?php

namespace App\Http\Controllers;

use App\Models\Message;
use App\Models\Role;
use App\Models\User;
use Barryvdh\DomPDF\PDF;
use DateTime;
use Barryvdh\DomPDF\Facade\Pdf as dombro;
use Dompdf\Dompdf;
use Illuminate\Http\Request;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Worksheet\Drawing;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(Auth::user()->role);
        $pesan = Message::count();
        $diterima = Message::where('status', 'diterima')->count();
        $ditolak = Message::where('status', 'ditolak')->count();
        $data = ['pesan' => $pesan, 'diterima' => $diterima, 'ditolak' => $ditolak];
        return Inertia::render('Admin/AdminDashboard',compact('data'));
    }

    //display the user page
    public function user()
    {
        $users = User::where('role_id', '!=', 5)->orderBy('name', 'asc')->with(['role'])->paginate(10);
        $roles = Role::all();
        return Inertia::render('Admin/AdminUser', compact('users', 'roles'));
    }
    public function aktifkan($id)
    {
        $user = User::find($id);
        $user->status = 'aktif';
        $user->save();
        return redirect()->back()->with('success', 'Berhasil Mengaktifkan user');
    }
    public function keluhan(Request $request)
    {
        $messages = Message::with(['sender', 'reciever'])->latest()->paginate(10);
        // dd($messages);
        if ($request->refresh) {
            return response()->json($messages);
        }
        // dd("helo");
        return Inertia::render('Admin/AdminKeluhan', compact('messages'));
    }
    public function cetak($id)
    {
        // $monthDate = DateTime::createFromFormat('U', $timestamp);
        $message = Message::with(['sender', 'reciever'])->find($id);
        $fileName = 'Rekap Keluhan ' . now()->format('H.i.s d-m-Y') . '.pdf';
        return response()->json(["data"=>$message,"fileName"=>$fileName]);
        // dd($message->sender->name);
    }

    public function rekap()
    {
        $firstMessage = Message::orderBy('created_at', 'asc')->first();
        $nowDate = now();
        $firstMessageDate = new DateTime($firstMessage->created_at);
        $firstMessageDate = $firstMessageDate->modify('first day of this month');
        $months = [];
        do {
            $temp = [
                "timestamp" => $firstMessageDate->getTimestamp(),
                "date" => $firstMessageDate->format('M Y')
            ];
            $months[] = $temp;
            $firstMessageDate = $firstMessageDate->modify('+1 month');
            // echo ($nowDate > $firstMessageDate);
        } while ($nowDate >= $firstMessageDate);
        return Inertia::render('Admin/AdminRekap', compact('months'));
    }

    public function downloadRekap($timestamp)
    {
        // dd("halo");
        $monthDate = DateTime::createFromFormat('U', $timestamp);
        $messagesThisMonth = Message::
            whereMonth('created_at', '=', $monthDate->format('m'))
            ->whereYear('created_at', '=', $monthDate->format('Y'))
            ->with(['sender', 'reciever'])
            ->get();
        $fileName = 'Rekap Keluhan ' . now()->format('H.i.s d-m-Y') . '.pdf';

        return response()->json(["data"=>$messagesThisMonth,"fileName"=>$fileName]);
    }
    public function nonaktifkan($id)
    {
        $user = User::find($id);
        $user->status = 'nonaktif';
        $user->save();
        return redirect()->back()->with('success', 'Berhasil Menonaktifkan user');
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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
