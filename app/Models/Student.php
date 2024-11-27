<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Student extends Model
{
    use HasFactory;

    // Table name (optional if it matches the pluralized class name)
    protected $table = 'students';

    // Primary key (optional if it matches the default 'id')
    protected $primaryKey = 'student_id';

    // Allow mass assignment for these fields
    protected $fillable = [
        'user_id',
        'course_id',
        'student_fname',
        'student_lname',
        'student_address',
        'student_contact',
        'student_picPath'
    ];

    // Timestamps (default is true; set false if not using them)
    public $timestamps = true;

    /**
     * Relationship to the User model.
     * Each student belongs to one user.
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    /**
     * Optional: Relationship to the Course model.
     * Each student belongs to one course.
     */
    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
}