<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobOffer;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class JobOfferController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
    
        $request->validate([
            'name' => 'required',
            'description' => 'required',
            'responsibility' => 'required',
            'qualifications' => 'required',
            'benifits' => 'required',
        ]);
    
        $input = $request->all();
        $input['employer_id'] = Auth::user()->id;
    
        JobOffer::create($input);

        return redirect()->route('addJob')->with('success','Job added successfully');
    }
    
}


