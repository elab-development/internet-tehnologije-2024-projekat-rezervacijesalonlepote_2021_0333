<?php

use App\Models\Klijent;
use App\Models\Radnica;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('termins', function (Blueprint $table) {
            $table->id();
            $table->date('datum');
            $table->dateTime('vreme');
            $table->double('ukupnaCena');
            $table->dateTime('trajanje');
            $table->foreignIdFor(Radnica::class);
            $table->foreignIdFor(Klijent::class);

            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('termins');
    }
};
