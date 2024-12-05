<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Vendor;
use App\Models\MenuItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VendorController extends Controller
{
    public function vendorProfile()
    {
        $id = Auth::user()->id;
    
        $user = Vendor::where('verified_user_id', $id)->first();
    
        return view('vendor.profile', compact('user'));
    }
    
    public function vendorMeals()
    {
        $id = Auth::user()->id;
        $items = MenuItem::where('vendor_id', $id)->get();
        return view('vendor.meals', compact('items'));
    }

    public function vendorCreate()
    {
        return view('vendor.create-meal');
    }

    public function vendorCreateProcess(Request $request)
    {
        $request->validate([
            'meal_name' => 'required',
            'meal_price' => 'required',
            'meal_category' => 'required|in:grill,fried chicken,pizza,burger',
            'meal_desc' => 'required',
            'meal_image' => 'required|image', 
        ]);

        $data = $request->all();
        $data['vendor_id'] = Auth::user()->id;
        $data['meal_availability'] = "available";

        // Upload Image if it exists
        if ($request->hasFile('meal_image')) 
        {
            $image = $request->file('meal_image'); // Retrieve the uploaded file
            $destinationPath = 'storage/meals/';
            $imageName = date('YmdHis').".".$image->getClientOriginalExtension(); // Generate a unique name
            $image->move($destinationPath, $imageName); // Move the image to the storage directory
            $data['meal_image'] = $imageName; // Save the image name in the data array
        } 

        MenuItem::create($data);
        return redirect()->route('vendorCreate')->with('success','Meal added successfully');
    }

    // public function vendorNewMeal()
    // {
    //     return view('vendor.meals');
    // }
    
    // public function newMealProcess(Request $request)
    // {

    // }

    public function vendorShowMeal($id)
    {
        $item = MenuItem::where('id', $id)->first();
        return view('vendor.show-meal', compact('item'));
    }

    public function editMealProcess(Request $request, $id)
    {
        $input = $request->all();
        $item = Menuitem::findOrFail($id);

        $item->update($input);

        return redirect()->route('vendorShowMeal', ['id' => $id])
               ->with('success', 'Meal updated successfully!');
    }

    public function removeMeal($id)
    {
        $item = Menuitem::findOrFail($id);
        $item->delete();

        return redirect()->route('vendorMeals');
    }

    public function vendorSearchMeals(Request $request)
    {
        $searchTerm = $request->input('query');
    
        // Search the MenuItem model based on the search term
        $results = Menuitem::where('meal_name', 'LIKE', '%' . $searchTerm . '%')->get();
    
        // Return the search results as JSON for AJAX
        return response()->json($results);
    }
}
