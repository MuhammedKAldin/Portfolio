<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobOffer;
use App\Models\JobOfferUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployeeController extends Controller
{
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
        // Get the currently authenticated user
        $user = Auth::user();
    
        // Check if the user is logged in and has a role of "employee"
        if ($user && $user->role === "employee") {
            // User is an employee, retrieve their job applications
            $jobs = JobOfferUser::where('user_id', $user->id)->get();
            $userType = "employee";
    
            // Render the applications view with the user type and jobs
            return view('portal.applications', compact('userType', 'jobs'));
        } 
        else {
            // User is either not logged in or is an employer, redirect to the index route
            return redirect()->route('index');
        }
    }

}
