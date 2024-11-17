<?php

namespace App\Http\Controllers;

use App\Models\Vendor;
use App\Models\MenuItem;
use Illuminate\Http\Request;

class PortalController extends Controller
{
    public function index()
    {
        return view('index');
    }

    public function menus()
    {
        $vendors = Vendor::all();
        return view('menus', compact('vendors'));
    }

    public function openMenu($id)
    {
        $items = MenuItem::where('vendor_id', $id)->get();
        return view('menu', compact('items'));
    }

    public function search(Request $request)
    {
        $searchTerm = $request->input('query');
    
        // Search the MenuItem model based on the search term
        $results = Vendor::where('name', 'LIKE', '%' . $searchTerm . '%')->get();
    
        // Return the search results as JSON for AJAX
        return response()->json($results);
    }
}
