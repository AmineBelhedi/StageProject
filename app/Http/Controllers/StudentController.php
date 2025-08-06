<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Student;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    public function edit()
    {
        $student = Student::firstOrCreate(
            ['user_id' => Auth::id()],
            ['phone' => '', 'school' => '', 'level' => '', 'year' => '']
        );

        return Inertia::render('StudentProfile', [
            'student' => $student
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'phone' => 'nullable|string',
            'school' => 'nullable|string',
            'level' => 'nullable|string',
            'year' => 'nullable|string',
            'skills' => 'nullable|array',
            'experience' => 'nullable|string',
            'duree' => 'nullable|string',
            'experience_description' => 'nullable|string',
            'description' => 'nullable|string',
            'cv' => 'nullable|file|mimes:pdf',
        ]);

        
        $student = Student::firstOrCreate(
            ['user_id' => Auth::id()]
        );

        
        if ($request->hasFile('cv')) {
            $data['cv'] = $request->file('cv')->store('cv', 'public');
        } else {
            
            $data['cv'] = $student->cv;
        }

        $student->update($data);

        return redirect()->route('student.edit')->with('success', 'Profil mis à jour');
    }


    public function view($id)
    {
        $student = Student::with('user')->findOrFail($id);

        
        if ($student->cv) {
            $student->cv_url = asset('storage/' . $student->cv);
        } else {
            $student->cv_url = null;
        }

        return Inertia::render('StudentProfileView', [
            'student' => $student
        ]);
    }


}
