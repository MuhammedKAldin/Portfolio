<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\JobOffer;
use App\Models\JobOfferUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EmployerController extends Controller
{
    
   
    public function addJob()
    {
        if(Auth::user() != null) {
            $userType = Auth::user()->role;
            return view('portal.newjob', compact('userType'));
        }
        else{
            $userType = "guest";
            return view('portal.newjob', compact('userType'));
        }
    }

    public function showProfileJobs($id)
    {
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
            $jobs = JobOffer::where('employer_id', $id)->get();
            
            // Check if id found
            if($user) 
            {
                return view('portal.profile-jobs', compact('userType', 'user', 'jobs'));
            }
            else 
            {
                // Error 404
                echo 'Error 404 profile Not found';
            }
        }
        else 
        {
            echo 'no User id is passed';
        }
    }

    // Define a constant for hiring stages
    const STAGE_ARR = ["screening", "declined", "shortlisted", "interview", "accepted"];

    public function showCandidates($id, $stage = "screening")
    {
        // Check if the ID is valid
        $job_offer_id = $id;

        if ($job_offer_id) 
        {
            // Set default stage if not provided
            if (empty($stage)) {
                $stage = "screening";
            }

            // echo 'Display Jobs';

            // Determine user type and fetch jobs
            $userType = "employer";
            $jobs = JobOfferUser::where('job_offer_id', $job_offer_id)
                ->where('stage', $stage)
                ->get();

            $stageArr = self::STAGE_ARR;

            // Pass variables to the view
            return view('portal.candidates', compact('userType', 'job_offer_id', 'jobs', 'stageArr', 'stage'));
        } 
        else 
        {
            echo 'No User ID is passed';
        }
    }

    public function updateCandidates(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'id' => 'required|integer', // Assuming you are sending the Job ID
            'stage' => 'required|string',
        ]);
    
        // Get the validated data
        $jobId = $request->input('id');
        $stage = $request->input('stage');

        // Update the Job Offer's Candidate stage (According to required model that needs Chaning to take effect)
        $job = JobOfferUser::find($jobId); 
        if ($job) 
        {
            $job->stage = $stage; 
            $job->save();
            
            // Return a success response
            return response()->json(['message' => 'Stage updated successfully.']);
        }
    
        // Return an error response if the candidate is not found
        return response()->json(['message' => 'Candidate not found.'], 404);
    }
    
}
