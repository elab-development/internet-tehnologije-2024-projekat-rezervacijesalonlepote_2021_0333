<?php

use App\Models\Termin;
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
        Schema::create('uslugas', function (Blueprint $table) {
            $table->unsignedInteger('redniBroj', true);
            $table->foreignIdFor(Termin::class)->constrained();
            $table->primary(['redniBroj', 'termin_id']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('uslugas');
    }
};
