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

    public function applyToJob(Request $request)
    {
        $jobId = $request->input('jid');
        $userId = $request->input('uid');

        if(Auth::user() != null) 
        {
            if($jobId != null && $userId != null)
            {
                // Find the job offer by ID
                $jobOffer = JobOffer::find($jobId);

                if ($jobOffer) 
                {
                    $appliedBefore = JobOfferUser::where('job_offer_id', $jobId)
                    ->where('user_id', $userId)
                    ->exists();

                    // Check if user Applied to this Job offer before
                    if(!$appliedBefore) {
                        // Attach the user to the job offer
                        JobOfferUser::create([
                            'job_offer_id' => $jobId,
                            'user_id' => $userId,
                        ]);

                        return redirect()->route('showJobs')->with('success', 'Applied to job successfully');
                    }

                    // echo 'found';
        
                    return redirect()->route('showJobs')->with('warning', 'This Job is Already applied to!');
                } 
                else 
                {
                    echo 'not found';
                    // return redirect()->route('showJobs')->with('error', 'Job offer not found');
                }
            }
            else 
            {
                echo 'not passed required parameters';
            }
        }
        else
        {
            echo 'not logged in';

            // $userType = "guest";
            // return view('portal.index', compact('userType'));
            // return redirect()->route('index');
        }
    }

    public function showApplications()
    {
        $id = Auth::user()->id;

        if($id) 
        {
            // echo 'Display Jobs';

            // Id has some value
            $userType = "employee";
            $jobs = JobOfferUser::where('user_id', $id)->get();
            // $jobs = JobOffer::where('id', $id)->get();
            
            // Check if id found
            return view('portal.applications', compact('userType', 'jobs'));
        }
        else 
        {
            echo 'no User id is passed';
        }
    }

}
