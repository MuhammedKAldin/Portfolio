<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Helpers\SoapHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Artisaninweb\SoapWrapper\Facade\SoapWrapper;
use App\Http\Controllers\RequestLogController;

class WebController extends Controller
{
    protected $requestLogController;

    public function __construct(RequestLogController $requestLogController)
    {
        $this->requestLogController = $requestLogController;
    }

    public function index()
    {
        $countries = Country::all();
        return view('index', compact('countries'));
    }

    public function edit($id)
    {
        $country = Country::where('id', $id)->first();
        return view('edit', compact('country'));
    }

    public function update(Request $request, $id)
    {
        // Validate the incoming request data
        $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ar' => 'nullable|string',
        ]);

        // Find the country by ID
        $country = Country::find($id);

        if ($country) 
        {
            // Keep a copy of old data
            $oldData = [
                'name' => $country->name,
                'description' => $country->description,
            ];

            // Update the country's fields
            $country->name = [
                'en' => $request->input('name_en'),
                'ar' => $request->input('name_ar'),
            ];

            $country->description = [
                'en' => $request->input('description_en'),
                'ar' => $request->input('description_ar'),
            ];

            // Save the changes to the database
            $country->save();
            
            // Call the log update method from RequestLogController
            $this->requestLogController->logUpdate((object) $oldData, $country);

            // Set a success message
            session()->flash('msg-success', 'Country updated successfully.');

            return redirect()->route('index');
        }

        // Not Found
        session()->flash('msg-error', 'Country not found');
        return redirect()->route('edit', ['id' => $id]);
    }

    public function create()
    {
        return view('create');
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'description_en' => 'required|string',
            'description_ar' => 'nullable|string',
        ]);
    
        // Create a new country using the validated data
        $country = Country::create([
            'name' => [
                'en' => $request->input('name_en'),
                'ar' => $request->input('name_ar'),
            ],
            'description' => [
                'en' => $request->input('description_en'),
                'ar' => $request->input('description_ar'),
            ],
        ]);
    
        // Set a success message
        session()->flash('msg-success', 'Country created successfully.');

        // Call the log creation 
        $this->requestLogController->logCreation($country);

        // Redirect or return view
        return redirect()->route('index');
    }

    public function destroy($id)
    {
        $country = Country::find($id);
    
        if ($country) 
        {
             // Call the log deletion method from RequestLogController
             $this->requestLogController->logDeletion($country);

            // Remove the country instance from the database
            $country->delete();
    
            // Set a success message
            session()->flash('msg-success', 'Country deleted successfully!');

            // Redirect or return a response
            return redirect()->route('index');
        } 
    
        // Set an error message if the country is not found
        session()->flash('msg-error', 'Country not found');

        // Redirect or return a response
        return redirect()->route('index');
    }
}
