<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Termin;
use App\Models\Usluga;
use App\Models\Klijent;
use Illuminate\Auth\Access\Response;

class UslugaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role === 'radnik';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Usluga $usluga): bool
    {
        $termin = Termin::where('id', $usluga->termin_id)->first();
        $klijent = Klijent::where('id',$termin->klijent_id)->first();
        return $user->role === 'radnik' || ($klijent && $user->id === $klijent->user_id);
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role === 'radnik' || $user->role === 'klijent';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Usluga $usluga): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Usluga $usluga): bool
    {
        return $user->role === 'radnik';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Usluga $usluga): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Usluga $usluga): bool
    {
        return false;
    }
}
