<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        $roles = Role::all();
        return Inertia::render('Auth/Register', compact('roles'));
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'nomor_induk' => 'required|numeric|unique:users,nomor_induk',
            'nomor_hp' => 'required|numeric|unique:users,nomor_hp',
            'role' => 'required',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);
        // dd($request->all());

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'nomor_hp' => $request->nomor_hp,
            'nomor_induk' => $request->nomor_induk,
            'role_id' => $request->role,
            'password' => Hash::make($request->password),
        ]);

        // event(new Registered($user));
        return redirect()->route('adminUser');

    }
}
