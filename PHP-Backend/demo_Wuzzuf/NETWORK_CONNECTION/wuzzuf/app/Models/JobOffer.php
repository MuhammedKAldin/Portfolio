<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class JobOffer extends Model
{
    use HasFactory;

    protected $fillable = [
        'employer_id',
        'name',
        'description',
        'responsibility',
        'level',
        'qualifications',
        'benifits',
        'location',
        'availability',
    ];

    // Database Relationship
    public function employer()
    {
        return $this->belongsTo(User::class, 'employer_id');
    }
}
