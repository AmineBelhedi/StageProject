<?php

namespace App\Http\Controllers;

use App\Models\Internship;
use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests; 

use Inertia\Inertia;

class InternshipController extends Controller
{
    use AuthorizesRequests;
    
    public function create()
    {
        return Inertia::render('AddInternshipForm');
    }

  
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'lieu'     => 'required|string|max:255',
            'duration' => 'required|string|max:100',
            'type'     => 'required|string|max:100',
        ]);

        $user = auth()->user();
        $company = $user->company;

        if (!$company) {
            abort(403, 'Seuls les comptes entreprise peuvent publier des offres.');
        }

        Internship::create([
            'company_id' => $company->id,
            'title'      => $validated['title'],
            'lieu'       => $validated['lieu'],
            'duration'   => $validated['duration'],
            'type'       => $validated['type'],
        ]);

        return redirect()->route('company.dashboard')->with('success', 'Offre publiée avec succès.');
    }

 
    public function index()
    {
        $internships = Internship::with('company.user')->latest()->get();

        return Inertia::render('StudentDashboard', [
            'internships' => $internships
        ]);
    }


    public function companyIndex()
    {
        $user = auth()->user();
        $company = $user->company;

        if (!$company) {
            abort(403, 'Seuls les comptes entreprise ont accès à cette section.');
        }

        $internships = Internship::where('company_id', $company->id)
            ->withCount('applications as candidates_count') 
            ->latest()
            ->get();

        return Inertia::render('CompanyDashboard', [
            'offers' => $internships
        ]);
    }


    public function edit($id)
    {
        $internship = Internship::findOrFail($id);

        $this->authorize('update', $internship);

        return Inertia::render('EditInternshipForm', [
            'internship' => $internship
        ]);
    }

    
    public function update(Request $request, $id)
    {
        $internship = Internship::findOrFail($id);

        $this->authorize('update', $internship); 

        $validated = $request->validate([
            'title'    => 'required|string|max:255',
            'lieu'     => 'required|string|max:255',
            'duration' => 'required|string|max:100',
            'type'     => 'required|string|max:100',
        ]);

        $internship->update($validated);

        return redirect()->route('company.dashboard')->with('success', 'Offre mise à jour avec succès.');
    }

    
    public function destroy($id)
    {
        $internship = Internship::findOrFail($id);

        $this->authorize('delete', $internship);

        $internship->delete();

        return redirect()->route('company.dashboard')->with('success', 'Offre supprimée avec succès.');
    }
    public function candidates($id)
    {
        $internship = Internship::with(['applications.student.user'])->findOrFail($id);

        $applications = $internship->applications;

        return Inertia::render('CandidatesList', [
            'internship' => $internship,
            'applications' => $applications
        ]);
    }
}
