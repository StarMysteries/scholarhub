<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory;

    protected $primaryKey = 'user_id';

    // Specify guarded fields if needed
    protected $fillable = [
        'user_email',
        'user_password',
        'user_role'
    ];

    // Hide sensitive fields
    protected $hidden = [
        'user_password',
    ];
    
    public function setPasswordAttribute($password)
    {
        $this->attributes['user_password'] = bcrypt($password);
    }
}