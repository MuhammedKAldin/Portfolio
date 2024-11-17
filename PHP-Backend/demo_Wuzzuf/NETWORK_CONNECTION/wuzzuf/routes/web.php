<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PortalController;
use App\Http\Controllers\PusherController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployerController;
use App\Http\Controllers\JobOfferController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/welcome', function () {
    return view('welcome');
});

Auth::routes();

// Base Laravel/UI Home
Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

// Home Page
Route::get('/', [PortalController::class, 'index'])->name('index');

// User's Profile
Route::get('/profile/{id}', [PortalController::class, 'showProfile'])->name('showProfile');

// Display Posted Jobs
Route::get('/jobs', [PortalController::class, 'showJobs'])->name('showJobs');

// Apply to Posted Job (Employee)
Route::get('/jobs/apply', [EmployeeController::class, 'applyToJob'])->name('applyToJob');

// Current Applications (Employee)
Route::get('/applications', [EmployeeController::class, 'showApplications'])->name('showApplications');

// Create Job Offer (Employer)
Route::get('/jobs/new', [EmployerController::class, 'addJob'])->name('addJob');

// Process New Job Offer (Employer)
Route::post('/jobs/process', [JobOfferController::class, 'store'])->name('createOffer');

// Jobs Posted by a Company user (Employer)
Route::get('/profile/{id}/jobs', [EmployerController::class, 'showProfileJobs'])->name('showProfileJobs');

// Current Job Candidates (Employer)
Route::get('jobs/{id}/candidates/{stage}', [EmployerController::class, 'showCandidates'])->name('showCandidates');

// Update Candidate's Hiring Stage (Employer)
Route::post('jobs/candidates/update', [EmployerController::class, 'updateCandidates'])->name('updateCandidates');

// Chat with Candidate in later Hiring Stages
Route::get('jobs/{id}/candidates/{stage?}/chat/{user_id}', [PusherController::class, 'chat'])->name('chat'); 

// Processing chat
Route::post('jobs/chat/{user_id}/process', [PusherController::class, 'broadcast']); 