<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Internship;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $companiesCount = Company::count();
        $offersCount = Internship::count();  
        $uniqueTitlesCount = Internship::distinct('title')->count('title'); 

        
        $latestOffers = Internship::with('company.user')
            ->orderBy('created_at', 'desc')
            ->take(4)
            ->get();

        return Inertia::render('Home', [
            'stats' => [
                'companies' => $companiesCount,
                'offers' => $offersCount,
                'sectors' => $uniqueTitlesCount,
            ],
            'latestOffers' => $latestOffers,
            'scrollToAbout' => session('scrollToAbout', false),
        ]);
    }
}
