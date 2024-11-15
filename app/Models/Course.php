<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $primaryKey = 'course_id';
    public $incrementing = false;
    protected $keyType = 'string';

    public function scholarships()
    {
        return $this->belongsToMany(Scholarship::class, 'scholarship_courses', 'course_id', 'scholarship_id');
    }
}
