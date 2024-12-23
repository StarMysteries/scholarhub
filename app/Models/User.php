<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $primaryKey = 'user_id';

    protected $fillable = [
        'user_email',
        'user_password',
        'user_role',
    ];

    protected $hidden = [
        'user_password',
    ];



    public function setPasswordAttribute($password)
    {
        $this->attributes['user_password'] = bcrypt($password);
    }

    public function student()
    {
        return $this->hasOne(Student::class, 'user_id', 'user_id');
    }
}