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
    protected $primaryKey = "redniBroj";

    public function termin(): BelongsTo
    {
        return $this->belongsTo(Termin::class, 'termin_id', 'id');
    }

    public function tipusluge(): BelongsTo
    {
        return $this->belongsTo(TipUsluge::class, 'tip_usluge_id', 'id');
    }
}
