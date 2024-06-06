<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Dompdf\Dompdf;
use Exception;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\View;

class MyController extends Controller
{
    public function index()
    {
        try {
            $pdf = new Dompdf();
            $message = Message::first();
            $html = view('singlemessage',compact($message));
            $pdf->setPaper('A4', 'portrait');
            $pdf->loadHtml($html);

            $pdf->render();

            return $this->downloadPdf($pdf, 'orders.pdf');
        } catch (Exception $e) {
            // Handle exception gracefully (e.g., log error, redirect with error message)
            return back()->with('error', 'Error generating PDF: ' . $e->getMessage());
        }
    }

    protected function downloadPdf(Dompdf $pdf, string $fileName): Response
    {
        $content = $pdf->output();
        $headers = [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'attachment;filename="' . $fileName . '"',
        ];

        return new Response($content, 200, $headers);
    }

}
