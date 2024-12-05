<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CartController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\PaymobController;
use App\Http\Controllers\PortalController;
use App\Http\Controllers\VendorController;
use App\Http\Controllers\MobileWalletController;

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
//     return view('welcome');
// });

Auth::routes();

// Base Laravel/UI Home
Route::get('/home', [HomeController::class, 'index'])->name('home');

// Home Page
Route::get('/', [PortalController::class, 'index'])->name('index');

// Displaying All Restraunts Found (All Users) 
Route::get('/menus', [PortalController::class, 'menus'])->name('menus');

// Search Restaurants on Menu (All Users)
Route::get('/search', [PortalController::class, 'search'])->name('search');

// Cart (All Users)
Route::get('/cart', [CartController::class, 'cart'])->name('cart');

// Displaying Menu of a Selected Restarunt with Id (All Users)
Route::get('/menus/{id}', [PortalController::class, 'openMenu'])->name('openMenu');

// Restraunt General Data (Vendor)
Route::get('/vendor/general', [VendorController::class, 'vendorProfile'])->name('vendorProfile');

// Restraunt Meals Data (Vendor)
Route::get('/vendor/meals', [VendorController::class, 'vendorMeals'])->name('vendorMeals');

// Search Meals on Menu (Vendor)
Route::get('/vendor/search', [VendorController::class, 'vendorSearchMeals'])->name('vendorSearchMeals');

// Create New Meal (Vendor)
Route::get('/vendor/create', [VendorController::class, 'vendorCreate'])->name('vendorCreate');

// Process New Meal Created (Vendor)
Route::post('/vendor/create/process', [VendorController::class, 'vendorCreateProcess'])->name('vendorCreateProcess');

// Display Meal Id Data (Vendor)
Route::get('/vendor/meals/{id}', [VendorController::class, 'vendorShowMeal'])->name('vendorShowMeal');

// Update Data of Meal by Id (Vendor)
Route::put('/vendor/meals/{id}/process', [VendorController::class, 'editMealProcess'])->name('editMealProcess');

// Remove Meal Data (Vendor)
Route::get('/vendor/meals/{id}/remove', [VendorController::class, 'removeMeal'])->name('removeMeal');

// Paymob Payment Sending Data (Performing Credit Card Payment)
Route::post('/credit', [PaymobController::class, 'credit'])->name('checkout');

// Paymob Payment Sending Data (Performing Mobile Wallet Payment)
// Route::post('/wallet', [PaymobController::class, 'wallet'])->name('wallet');

// Paymob Response
Route::get('/callback', [PaymobController::class, 'callback'])->name('callback'); 
