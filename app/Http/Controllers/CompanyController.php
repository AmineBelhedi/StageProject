<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Company;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class CompanyController extends Controller
{
    /**
     * Afficher la page de profil entreprise
     */
    public function edit()
    {
        $company = Company::firstOrCreate(
            ['user_id' => Auth::id()],
            ['logo' => null, 'website' => null]
        );

        return Inertia::render('CompanyProfile', [
            'company' => $company,
        ]);
    }

    /**
     * Mettre à jour les infos de l'entreprise
     */
    public function update(Request $request)
    {
        $data = $request->validate([
            'website' => 'nullable|url',
            'logo' => 'nullable|image|max:2048',
        ]);

        
        Log::info('Données reçues pour mise à jour entreprise :', $data);

        $company = Company::firstOrCreate(
            ['user_id' => Auth::id()],
            ['logo' => null, 'website' => null]
        );

        if ($request->hasFile('logo')) {
            
            if ($company->logo && Storage::disk('public')->exists($company->logo)) {
                Storage::disk('public')->delete($company->logo);
            }

            $data['logo'] = $request->file('logo')->store('logos', 'public');
        }

        $company->update($data);

        return redirect()->route('company.edit')->with('success', 'Profil entreprise mis à jour.');
    }
}
