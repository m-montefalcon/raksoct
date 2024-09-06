<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('author')->references('id')->on('users');
            $table->foreignId('assign_to')->nullable()->references('id')->on('users'); // Ensure assign_to is a foreign key
            $table->string('title');
            $table->string('description');
            $table->enum('status', ['todo', 'inprogress', 'done']);
            $table->enum('priority', ['low', 'medium', 'high']);
            $table->string('due_date');
            $table->string('file');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
