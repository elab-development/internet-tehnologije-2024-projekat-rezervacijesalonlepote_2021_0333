<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Radnica extends Model
{
    /** @use HasFactory<\Database\Factories\RadnicaFactory> */
    use HasFactory;
    protected $guarded=[];

    public function termins():HasMany{
        return $this->hasMany(Termin::class, 'termin_id', 'id');
    }

    public function user():BelongsTo{
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
