<?php

namespace App\Models;

use App\Models\User;
use App\Models\Termin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Klijent extends Model
{

    protected $guarded = [];
    
    use HasFactory;
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function termins(): HasMany
    {
        return $this->hasMany(Termin::class);
    }

}
