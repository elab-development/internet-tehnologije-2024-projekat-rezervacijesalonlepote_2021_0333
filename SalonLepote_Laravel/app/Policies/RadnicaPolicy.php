<?php

namespace App\Policies;

use App\Models\Radnica;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class RadnicaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->role==='admin' || $user->role==='radnik';
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Radnica $radnica): bool
    {
        return $user->role==='admin' || $user->role==='radnik';
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->role==='admin';
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Radnica $radnica): bool
    {
        return $radnica->user_id==$user->id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Radnica $radnica): bool
    {
        return $radnica->user_id==$user->id || $user->role==='admin';
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Radnica $radnica): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Radnica $radnica): bool
    {
        return false;
    }
}
