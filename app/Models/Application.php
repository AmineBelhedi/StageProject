<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Application extends Model
{
    use HasFactory;

    protected $fillable = ['student_id', 'internship_id', 'motivation_letter'];

    public function internship()
    {
        return $this->belongsTo(Internship::class);
    }

    public function student()
    {
        return $this->belongsTo(Student::class);
    }
}

