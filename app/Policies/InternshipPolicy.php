<?php

namespace App\Policies;

use App\Models\Internship;
use App\Models\User;

class InternshipPolicy
{
    /**
     * Détermine si l'utilisateur peut mettre à jour l'offre.
     */
    public function update(User $user, Internship $internship)
    {
        // Autoriser si l'utilisateur est une entreprise ET
        // si l'offre appartient à cette entreprise
        return $user->company && $internship->company_id === $user->company->id;
    }

    /**
     * Détermine si l'utilisateur peut supprimer l'offre.
     */
    public function delete(User $user, Internship $internship)
    {
        // Même règle que pour update
        return $user->company && $internship->company_id === $user->company->id;
    }
}
