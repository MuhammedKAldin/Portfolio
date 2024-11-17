<?php

use App\Http\Controllers\WebController;
use Illuminate\Support\Facades\Route;

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

// Route::get('/', function () {
//     return response()->json([
//         "Online" => "true"
//     ]);
// });

Route::get('/', [WebController::class, 'index'])->name('index');

Route::get('/create', [WebController::class, 'create'])->name('create');

Route::post('/store', [WebController::class, 'store'])->name('store');

Route::get('/edit/{id}', [WebController::class, 'edit'])->name('edit');

Route::put('/edit/update/{id}', [WebController::class, 'update'])->name('update');;

Route::delete('/destroy/{id}', [WebController::class, 'destroy'])->name('delete');

