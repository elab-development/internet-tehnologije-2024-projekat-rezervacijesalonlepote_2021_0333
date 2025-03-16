<?php

namespace App\Policies;

use App\Models\Klijent;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class KlijentPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role==='radnik';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Klijent $klijent): bool
    {
        return $user->role==='radnik' || $user->id==$klijent->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return true;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Klijent $klijent): bool
    {
        return $user->id==$klijent->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Klijent $klijent): bool
    {
        return $user->id==$klijent->user_id;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Klijent $klijent): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Klijent $klijent): bool
    {
        return false;
    }
}
