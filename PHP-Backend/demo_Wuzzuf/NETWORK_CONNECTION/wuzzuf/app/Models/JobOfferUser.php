<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/// IMPORTANT! : Acting as Pivot-Table to Linkup JobOffers/Users tables
//------------------------------------------------------------------------

class JobOfferUser extends Model
{
    use HasFactory;
    
    // The table associated with the model.
    protected $table = 'job_offer_user';

    // The primary key associated with the table.
    protected $primaryKey = 'id';

    // If you do not want timestamps, set this to false.
    public $timestamps = true;

    // The attributes that are mass assignable.
    protected $fillable = [
        'job_offer_id',
        'user_id',
        'stage',
    ];

    // Optionally, you can define relationships if needed.
    public function jobOffer()
    {
        return $this->belongsTo(JobOffer::class, 'job_offer_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
