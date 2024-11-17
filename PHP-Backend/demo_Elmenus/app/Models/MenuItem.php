<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MenuItem extends Model
{
    use HasFactory;

    protected $fillable = [
        'vendor_id',
        'meal_name',
        'meal_price',
        'meal_category',
        'meal_desc',
        'meal_image',
        'meal_availability',
    ];
}
