<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobOffer;
use App\Models\JobOfferUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PortalController extends Controller
{
    public function index()
    {
        if(Auth::user() != null) {
            $userType = Auth::user()->role;
            return view('portal.index', compact('userType'));
        }
        else{
            $userType = "guest";
            return view('portal.index', compact('userType'));
        }
    }

    public function showProfile($id)
    {
        // Id isn't passed as Paramter
        if(Auth::user() != null) 
        {
            $userType = Auth::user()->role;
        }
        else
        {
            $userType = "guest";
        }

        if($id) 
        {
            // Id has some value
            $user = User::find($id);
            
            if($user) 
            { 
                // Check if user found
                return view('portal.profile', compact('userType', 'user'));
            }
            else {
                // User isn't Found
                return view('/', compact('userType'));
            }
        }
        else 
        {
            // Id isn't Passed
            return view('/', compact('userType'));
        }

        return view('portal.profile', compact('userType','user'));
    }

    public function showJobs()
    {
        $jobs = JobOffer::all();

        if(Auth::user() != null) 
        {
            $userType = Auth::user()->role;
        } 
        else 
        {
            $userType = "guest";
        } 

        return view('portal.jobs', compact('userType', 'jobs'));
    }

    

}
