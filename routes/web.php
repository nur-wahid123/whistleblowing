<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\PicController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});
Route::get('/oi','App\Http\Controllers\MyController@index');
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::group(['middleware' => ['isUser']], function () {
        Route::get('/home', [MessageController::class, 'home'])->name('home');
        Route::get('/dashboard', [MessageController::class, 'index'])->name('dashboard');
        Route::get('/search',[MessageController::class,'userSearch']);
        Route::post('/pesan/tambah',[MessageController::class,'store'])->name('add.message');
        Route::post('/pesan/edit/{id}',[MessageController::class,'edit'])->name('edit.message');
        Route::get('/pesan/delete/{id}',[MessageController::class,'destroy'])->name('delete.message');
    });
    Route::group(['prefix' => 'admin', 'middleware' => ['isAdmin']], function () {
        Route::get('/dashboard', [AdminController::class, 'index'])->name('adminDashboard');
        Route::get('/user', [AdminController::class, 'user'])->name('adminUser');
        Route::get('/keluhan', [AdminController::class, 'keluhan'])->name('adminKeluhan');
        Route::get('/aktifkan/{id}', [AdminController::class, 'aktifkan']);
        Route::get('/cetak/{id}', [AdminController::class, 'cetak']);
        Route::get('/nonaktifkan/{id}', [AdminController::class, 'nonaktifkan']);
        Route::get('/rekap',[AdminController::class, 'rekap'])->name('adminRekap');
        Route::get('/download-rekap/{timestamp}',[AdminController::class, 'downloadRekap'])->name('adminDownloadRekap');
    });
    Route::group(['prefix' => 'pic', 'middleware' => ['isPic']], function () {
        Route::get('/home', [PicController::class, 'landing'])->name('picLanding');
        Route::get('/dashboard', [PicController::class, 'index'])->name('picDashboard');
        Route::get('/proses/{id}',[PicController::class, 'proses'])->name("picProses");
        Route::post('/proses/tolak',[PicController::class, 'tolak'])->name("picProsesTolak");
        Route::post('/proses/terima',[PicController::class, 'terima'])->name("picProsesTerima");
        Route::get('/rekap',[PicController::class, 'rekap'])->name('picRekap');
        Route::get('/download-rekap/{timestamp}',[PicController::class, 'downloadRekap'])->name('picDownloadRekap');
    });
});
Route::middleware('auth')->group(function () {
    Route::group(['middleware' => ['isUser']], function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    });
    Route::group(['prefix' => 'admin', 'middleware' => ['isAdmin']], function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.admin.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.admin.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.admin.destroy');
    });
    Route::group(['prefix' => 'pic', 'middleware' => ['isPic']], function () {
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.pic.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.pic.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.pic.destroy');
    });
});

require __DIR__ . '/auth.php';
