<?php

namespace App\Http\Controllers;

use App\Models\Message;
use DateInterval;
use DateTime;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;

class PicController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // dd(["halo",$a]);
        $messages = Message::where('reciever_id', auth()->user()->role_id)->with(['sender', 'reciever'])->latest()->paginate(10);
        return Inertia::render('PIC/PicDashboard', compact('messages'));
    }

    public function proses($id)
    {
        $data = Message::with(['sender', 'reciever'])->find($id);
        if ($data->status == "ditolak" || $data->status == "diterima") {
            return redirect()->back()->withErrors("Maaf, data yng sudah selesai diproses tidak bisa di edit kembali");
        }
        $data->status = "diproses";
        $data->save();
        // dd($data);
        return Inertia::render('PIC/PicProses', compact('data'));
    }

    public function tolak(Request $request)
    {
        // dd($request->hasFile("image"));
        if (!$request->hasFile('image')) {
            $request->validate([
                "catatan" => "required",
            ]);
        } else {
            $request->validate([
                "catatan" => "required",
                "image" => "file|mimes:png,jpg,jpeg|max:2056"
            ]);
        }
        $data = Message::find($request->id);
        $data->status = "ditolak";
        $data->catatan_admin = $request->catatan;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = "pic_" . Auth::user()->role_id . "_" . $data->id . "." . $file->getClientOriginalExtension();
            $file->storeAs("image/pic", $fileName, 'public');
            $data->gambar_admin = $fileName;
        }
        $data->save();
        return Inertia::location("/pic/dashboard");
    }

    public function terima(Request $request)
    {
        // dd($request->hasFile("image"));
        if (!$request->hasFile('image')) {
            $request->validate([
                "catatan" => "required",
            ]);
        } else {
            $request->validate([
                "catatan" => "required",
                "image" => "file|mimes:png,jpg,jpeg|max:2056"
            ]);
        }
        $data = Message::find($request->id);
        $data->status = "diterima";
        $data->catatan_admin = $request->catatan;
        if ($request->hasFile('image')) {
            $file = $request->file('image');
            $fileName = "pic_" . Auth::user()->role_id . "_" . $data->id . "." . $file->getClientOriginalExtension();
            $file->storeAs("image/pic", $fileName, 'public');
            $data->gambar_admin = $fileName;
        }
        $data->save();
        return Inertia::location("/pic/dashboard");
    }

    public function rekap()
    {
        $firstMessage = Message::where('reciever_id', auth()->user()->role_id)->orderBy('created_at', 'asc')->first();
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
        return Inertia::render('PIC/PicRekap', compact('months'));
    }

    public function landing()
    {
        $pesan = Message::where('reciever_id', Auth::user()->role_id)->count();
        $diterima = Message::where('reciever_id', Auth::user()->role_id)->where('status', 'diterima')->count();
        $ditolak = Message::where('reciever_id', Auth::user()->role_id)->where('status', 'ditolak')->count();
        $data = ['pesan' => $pesan, 'diterima' => $diterima, 'ditolak' => $ditolak];
        return Inertia::render('PIC/PicLanding', compact('data'));
    }

    public function downloadRekap($timestamp)
    {
        $monthDate = DateTime::createFromFormat('U', $timestamp);
        $messagesThisMonth = Message::
            whereMonth('created_at', '=', $monthDate->format('m'))
            ->whereYear('created_at', '=', $monthDate->format('Y'))
            ->where('reciever_id', Auth::user()->role_id)
            ->with(['sender', 'reciever'])
            ->get();
        $fileName = 'Rekap Keluhan ' . now()->format('H.i.s d-m-Y') . '.pdf';

        return response()->json(["data" => $messagesThisMonth, "fileName" => $fileName]);
        // // dd("halo");
        // $monthDate = DateTime::createFromFormat('U', $timestamp);
        // $messagesThisMonth = Message::
        //     where('reciever_id', auth()->user()->role_id)
        //     ->whereMonth('created_at', '=', $monthDate->format('m'))
        //     ->whereYear('created_at', '=', $monthDate->format('Y'))
        //     ->with(['sender', 'reciever'])
        //     ->get();
        // $spreadsheet = new Spreadsheet();
        // $sheet = $spreadsheet->getActiveSheet();
        // $sheet->setCellValue('A1', 'ID Keluhan');
        // $sheet->setCellValue('B1', 'ID Pengirim');
        // $sheet->setCellValue('C1', 'Nama Pengirim');
        // $sheet->setCellValue('D1', 'Email Pengirim');
        // $sheet->setCellValue('E1', 'Nama Bagian');
        // $sheet->setCellValue('F1', 'Isi Keluhan');
        // $sheet->setCellValue('G1', 'Tanggal Dikirim');
        // $sheet->setCellValue('H1', 'Status');
        // $row = 2;

        // // Loop through messages and populate data rows
        // foreach ($messagesThisMonth as $message) {
        //     $sheet->setCellValue('A' . $row, $message->id);
        //     $sheet->setCellValue('B' . $row, $message->getRelation('sender')->id);
        //     $sheet->setCellValue('C' . $row, $message->getRelation('sender')->name);
        //     $sheet->setCellValue('D' . $row, $message->getRelation('sender')->email);
        //     $sheet->setCellValue('E' . $row, $message->getRelation('reciever')->name);
        //     $sheet->setCellValue('F' . $row, $message->value); // Assuming 'created_at' column
        //     $sheet->setCellValue('G' . $row, $message->created_at); // Assuming 'created_at' column
        //     $sheet->setCellValue('H' . $row, $message->status); // Assuming 'created_at' column

        //     $row++; // Increment row index for next message
        // }
        // $writer = new Xlsx($spreadsheet);
        // $fileName = 'Rekap Keluhan ' . now()->format('H.i.s d-m-Y') . '.xlsx';
        // header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        // header('Content-Disposition: attachment;filename="' . $fileName . '"');
        // header('Cache-Control: max-age=0');
        // $writer->save('php://output');

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
