<?php

namespace App\Models;

use App\Models\Termin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Usluga extends Model
{
    /** @use HasFactory<\Database\Factories\UslugaFactory> */
    use HasFactory;
    protected $guarded=[];

    public function termin(): BelongsTo
    {
        return $this->belongsTo(Termin::class, 'klijent_id', 'id');
    }

    public function tipusluge(): BelongsTo
    {
        return $this->belongsTo(TipUsluge::class, 'klijent_id', 'id');
    }
}
