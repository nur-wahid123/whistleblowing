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
        return response()->json(["message"=>"Hello"]);
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
