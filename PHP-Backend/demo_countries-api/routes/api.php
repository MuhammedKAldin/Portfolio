<?php

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIController;
use App\Http\Controllers\CallbackController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\ProductController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

//------------------------------------------------

// Register route
Route::post('register', [UserController::class, 'register']);

// Login route => This name is used from Middleware/Authenticate.php, To Handle redirection of wrong auth users to this
Route::get('login', function () {
    return json_encode([
        "error" => "Unauthorized access. Please provide valid authentication credentials."
    ]);
})->name("login");

Route::post('login', [UserController::class, 'login']);

// Middleware for authenticated routes
Route::middleware('auth:api')->group(function () 
{
    Route::get('/countries', function () 
    {
        // Check if the request is for the WSDL
        if (request()->has('wsdl')) {
            return response()->file(storage_path('app/countries.wsdl'));
        }
    
        // Default behavior for the countries API
        return app(APIController::class)->index();
    });

    // Store a new country
    Route::post('/countries', [APIController::class, 'store']);

    // Update an existing country
    Route::put('/countries/{id}', [APIController::class, 'update']);

    // Show a specific country by ID
    Route::get('/countries/{id}', [APIController::class, 'show']);

    // Delete a specific country by ID
    Route::delete('/countries/{id}', [APIController::class, 'destroy']);
});

