<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Provider extends Model
{
    protected $primaryKey = 'provider_id';

    protected $fillable = [
        'user_id',
        'provider_id',
        'provider_name',
        'provider_contact',
    ];
    public $timestamps = true;

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
