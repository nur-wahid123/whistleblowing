<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class isPic
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user()->role->second_role == 'admin') {
            return redirect()->route('adminDashboard')->withErrors('Maaf, kamu tidak memiliki akses');
        } elseif ($request->user()->role_id != 1) {
            return $next($request);
        } elseif ($request->user()->role_id == 1) {
            return redirect()->route('dashboard')->withErrors('Maaf, kamu tidak memiliki akses');
        }
        return redirect()->back()->withErrors('Maaf, kamu tidak memiliki akses');
    }
}
