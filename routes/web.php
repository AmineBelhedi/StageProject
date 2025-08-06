<?php

use App\Http\Controllers\StudentController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\CompanyController;
use App\Http\Controllers\InternshipController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\HomeController; // <-- ajouté
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Auth\AuthenticatedSessionController;

// Route page d'accueil dynamique
Route::get('/', [HomeController::class, 'index']);

// Page de connexion
Route::get('/login', fn () => Inertia::render('Auth/Login'))->name('login');

// Page d'inscription
Route::get('/register', fn () => Inertia::render('Auth/Register'))->name('register');

// Tableau de bord principal
Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Déconnexion
Route::post('/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

// Routes pour le profil utilisateur
Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

// 👩‍🎓 Tableau de bord étudiant
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/student', [InternshipController::class, 'index'])->name('student.dashboard');

    Route::get('/student/profile', [StudentController::class, 'edit'])->name('student.edit');
    Route::post('/student/profile', [StudentController::class, 'update'])->name('student.update');

    Route::post('/applications', [ApplicationController::class, 'store'])->name('applications.store');

    // Afficher profil étudiant par id
    Route::get('/student-profile/{id}', [StudentController::class, 'view'])->name('student.profile.view');
});

// 🏢 Tableau de bord entreprise
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard/company', [InternshipController::class, 'companyIndex'])->name('company.dashboard');

    Route::get('/entreprise/profile', [CompanyController::class, 'edit'])->name('company.edit');
    Route::post('/entreprise/profile', [CompanyController::class, 'update'])->name('company.update');

    Route::get('/entreprise/ajouter-offre', [InternshipController::class, 'create'])->name('internships.create');
    Route::post('/entreprise/ajouter-offre', [InternshipController::class, 'store'])->name('internships.store');

    // Modifier et supprimer une offre
    Route::get('/entreprise/offres/{id}/edit', [InternshipController::class, 'edit'])->name('internships.edit');
    Route::put('/entreprise/offres/{id}', [InternshipController::class, 'update'])->name('internships.update');
    Route::delete('/entreprise/offres/{id}', [InternshipController::class, 'destroy'])->name('internships.destroy');

    // Voir candidats d’une offre
    Route::get('/entreprise/offre/{id}/candidats', [InternshipController::class, 'candidates'])->name('internships.candidates');
});

// Auth Laravel Breeze
require __DIR__.'/auth.php';
