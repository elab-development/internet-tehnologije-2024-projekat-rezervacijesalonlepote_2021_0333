<?php

namespace App\Policies;

use App\Models\Termin;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class TerminPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role==='radica';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Termin $termin): bool
    {
        return $user->role==='radica' || $user->id==$termin->klijent_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role==='radica' || $user->role==='klijent';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Termin $termin): bool
    {
        return $user->role==='radica';
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Termin $termin): bool
    {
        return $user->role==='radica';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Termin $termin): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Termin $termin): bool
    {
        return false;
    }
}
