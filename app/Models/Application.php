<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $primaryKey = 'application_id';   

    protected $fillable = [
        'student_id',
        'scholarship_id',
        'application_status',
        'rejection_details',
        'application_date',
    ];


    // Relationship with the Scholarship table
    public function scholarship()
    {
        return $this->belongsTo(Scholarship::class, 'scholarship_id', 'scholarship_id');
    }

    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id', 'student_id');
    }

}
