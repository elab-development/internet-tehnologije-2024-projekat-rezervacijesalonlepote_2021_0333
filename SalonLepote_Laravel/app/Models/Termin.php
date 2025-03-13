<?php

namespace App\Models;

use App\Models\Klijent;
use App\Models\Radnica;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Termin extends Model
{
    /** @use HasFactory<\Database\Factories\TerminFactory> */
    use HasFactory;
    protected $guarded=[];

    public function klijent():BelongsTo
    {
        return $this->belongsTo(Klijent::class, 'klijent_id', 'id');
    }

    public function radnica():BelongsTo
    {
        return $this->belongsTo(Radnica::class, 'radnica_id', 'id');
    }


}
