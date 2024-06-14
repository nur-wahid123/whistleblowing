<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        if(Auth::check()) {
            if (Auth::user()->role_id != 1) {
                if (Auth::user()->role->second_role == 'admin') {
                    return redirect()->intended(route('adminDashboard', absolute: false));
                }
                return redirect()->intended(route('picDashboard', absolute: false));
            }
            return redirect()->intended(route('home', absolute: false));
        }
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        $request->authenticate();

        $request->session()->regenerate();
        if (Auth::user()->status != 'aktif') {
            Auth::logout();
            $request->session()->invalidate();

            $request->session()->regenerateToken();

            return redirect()->back()->withErrors('Akun anda tidak aktif, silahkan hubungi admin');
        }
        if (Auth::user()->role_id != 1) {
            if (Auth::user()->role->second_role == 'admin') {
                return redirect()->intended(route('adminDashboard', absolute: false));
            }
            return redirect()->intended(route('picLanding', absolute: false));
        }
        return redirect()->intended(route('home', absolute: false));
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
