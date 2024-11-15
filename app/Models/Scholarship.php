<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Scholarship extends Model
{
    protected $primaryKey = 'scholarship_id';

    public function courses()
    {
        return $this->belongsToMany(Course::class, 'scholarship_courses', 'scholarship_id', 'course_id');
    }
}

