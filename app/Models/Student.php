<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Student extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'phone',
        'school',
        'level',
        'year',
        'skills',
        'experience',
        'duree',
        'experience_description',
        'cv',
        'description',
    ];

    protected $casts = [
        'skills' => 'array', 
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function applications()
    {
        return $this->hasMany(Application::class);
    }
}
