<?php

namespace App\Http\Controllers;

use App\Models\Country;
use App\Models\RequestLog;
use App\Helpers\SoapHelper;
use Illuminate\Http\Request;
use App\Http\Controllers\RequestLogController;

class APIController extends Controller
{
    protected $requestLogController;

    public function __construct(RequestLogController $requestLogController)
    {
        $this->requestLogController = $requestLogController;
    }

    public function index()
    {
        $countries = Country::all();

        $data = [
            'status' => 'success',
            'data' => []
        ];

        if (count($countries) > 0) {
            foreach ($countries as $country) {
                $data['data'][] = [
                    'id' => $country->id,
                    'name' => [
                        'en' => $country->name['en'] ?? '',
                        'ar' => $country->name['ar'] ?? ''
                    ],
                    'description' => [
                        'en' => $country->description['en'] ?? '',
                        'ar' => $country->description['ar'] ?? ''
                    ],
                ];
            }
        }

        // Format XML response
        $soapResponse = SoapHelper::CountriesFormat($data);

        // Return SOAP XML response
        return response($soapResponse, 200)
            ->header('Content-Type', 'text/xml');
    }
    
    public function show($id)
    {
        $country = Country::find($id);

        if($country)
        {
            $data = [
                'status' => 'success',
                'data' => [
                    [
                        'id' => $country->id,
                        'name' => [
                            'en' => $country->name['en'] ?? '',
                            'ar' => $country->name['ar'] ?? ''
                        ],
                        'description' => [
                            'en' => $country->description['en'] ?? '',
                            'ar' => $country->description['ar'] ?? ''
                        ],
                    ]
                ]
            ];

            $soapResponse = SoapHelper::CountriesFormat($data);

            return response($soapResponse, 200)
                ->header('Content-Type', 'text/xml');
        }

        // Country Instance Not Found in Database to Show
        $data = [
            'status' => 'error',
            'data' => [
                [
                    'message' => 'Country not found'
                ]
            ]
        ];
    
        $soapResponse = SoapHelper::CountriesFormat($data);
    
        return response($soapResponse, 404)
            ->header('Content-Type', 'text/xml');
    }


    public function store(Request $request)
    {
        $request->validate([
            'name.ar' => 'required|string',
            'name.en' => 'required|string',
            'description.ar' => 'required|string',
            'description.en' => 'required|string',
        ]);

        $country = Country::create([
            'name' => $request->input('name'),
            'description' => $request->input('description')
        ]);

        $data = [
            'status' => 'success',
            'data' => [
                [
                    'id' => $country->id,
                    'name' => $country->name,
                    'description' => $country->description,
                ]
            ]
        ];

        // Call the log creation 
        $this->requestLogController->logCreation($country);

        $soapResponse = SoapHelper::CountriesFormat($data);

        return response($soapResponse, 201)
            ->header('Content-Type', 'text/xml');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name.ar' => 'required|string',
            'name.en' => 'required|string',
            'description.ar' => 'required|string',
            'description.en' => 'required|string',
        ]);

        $country = Country::find($id);

        if ($country) {
            // Keep a copy of old data
            $oldData = [
                'name' => $country->name,
                'description' => $country->description,
            ];

            $country->update([
                'name' => $request->input('name'),
                'description' => $request->input('description')
            ]);

            $data = [
                'status' => 'success',
                'data' => [
                    [
                        'id' => $country->id,
                        'name' => $country->name,
                        'description' => $country->description,
                    ]
                ]
            ];

            // Call the log update method from RequestLogController
            $this->requestLogController->logUpdate((object) $oldData, $country);

            $soapResponse = SoapHelper::CountriesFormat($data);

            return response($soapResponse, 200)
                ->header('Content-Type', 'text/xml');
        }

        // Country Instance Not Found in Database to Update
        $data = [
            'status' => 'error',
            'data' => [
                [
                    'message' => 'Country not found'
                ]
            ]
        ];

        $soapResponse = SoapHelper::CountriesFormat($data);

        return response($soapResponse, 200)
            ->header('Content-Type', 'text/xml');
    }

    public function destroy($id)
    {
        $country = Country::find($id);

        if ($country) 
        {
            // Call the log deletion method from RequestLogController
            $this->requestLogController->logDeletion($country);
            
            $country->delete();

            $data = [
                'status' => 'success',
                'data' => [
                    [
                        'id' => $country->id,
                        'name' => [
                            'en' => $country->name['en'] ?? '',
                            'ar' => $country->name['ar'] ?? ''
                        ],
                        'description' => [
                            'en' => $country->description['en'] ?? '',
                            'ar' => $country->description['ar'] ?? ''
                        ],
                    ]
                ]
            ];

    
            $soapResponse = SoapHelper::CountriesFormat($data);
    
            return response($soapResponse, 200)
                ->header('Content-Type', 'text/xml');
        } 

        // Country Instance Not Found in Database to Destroy
        $data = [
            'status' => 'error',
            'data' => [
                [
                    'message' => 'Country not found'
                ]
            ]
        ];
    
        $soapResponse = SoapHelper::CountriesFormat($data);
    
        return response($soapResponse, 404)
            ->header('Content-Type', 'text/xml');
    }
}
