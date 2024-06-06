<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('messages', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('sender');
            $table->unsignedBigInteger('reciever');
            $table->foreign('sender')->references('id')->on('users')->onDelete('restrict');
            $table->foreign('reciever')->references('id')->on('roles')->onDelete('restrict');
            $table->text('value')->nullable();
            $table->text('catatan_admin')->nullable();
            $table->text('gambar_mahasiswa')->nullable();
            $table->text('gambar_admin')->nullable();
            $table->enum('status', ['menunggu','diproses', 'diterima','ditolak'])->default('menunggu');
            $table->timestamps();
            $table->dateTime('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('messages');
    }
};
