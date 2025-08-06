<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\Internship;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ApplicationController extends Controller
{
    // Enregistrer une candidature
    public function store(Request $request)
    {
        
        $user = Auth::user();
        if (!$user->student) {
            return redirect()->back()->withErrors(['error' => 'Seuls les étudiants peuvent postuler à des stages.']);
        }

        
        $validated = $request->validate([
            'internship_id'     => 'required|exists:internships,id',
            'motivation_letter' => 'nullable|string|max:5000',
        ]);

        $existingApplication = Application::where('student_id', $user->student->id)
            ->where('internship_id', $validated['internship_id'])
            ->first();

        if ($existingApplication) {
            return redirect()->back()->withErrors(['error' => 'Vous avez déjà postulé à cette offre.']);
        }

        Application::create([
            'student_id'        => $user->student->id,
            'internship_id'     => $validated['internship_id'],
            'motivation_letter' => $validated['motivation_letter'],
        ]);

        return redirect()->back()->with('success', 'Votre candidature a été envoyée avec succès !');
    }
}
