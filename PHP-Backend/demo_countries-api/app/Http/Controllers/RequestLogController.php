<?php

namespace App\Http\Controllers;

use App\Models\RequestLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;

class RequestLogController extends Controller
{   
    // Log the creation
    public function logCreation($country)
    {
        $this->sendWebhookNotification('create', [
            'name' => $country->name,
            'description' => $country->description,
        ]);

        RequestLog::create([
            'type' => 'create',
            'fields_changed' => json_encode([
                'name' => $country->name,
                'description' => $country->description,
            ]),
        ]);
    }

    // Log the update
    public function logUpdate($oldData, $country)
    {
        $this->sendWebhookNotification('edit', [
            'name' => [
                'old' => $oldData->name,
                'new' => $country->name,
            ],
            'description' => [
                'old' => $oldData->description,
                'new' => $country->description,
            ],
        ]);

        RequestLog::create([
            'type' => 'edit',
            'fields_changed' => json_encode([
                'name' => [
                    'old' => $oldData->name,
                    'new' => $country->name,
                ],
                'description' => [
                    'old' => $oldData->description,
                    'new' => $country->description,
                ],
            ]),
        ]);
    }

    // Log the deletion
    public function logDeletion($country)
    {
        $this->sendWebhookNotification('delete', [
            'name' => $country->name,
            'description' => $country->description,
        ]);

        RequestLog::create([
            'type' => 'delete',
            'fields_changed' => json_encode([
                'name' => $country->name,
                'description' => $country->description,
            ]),
        ]);
    }

    // Send webhook notification
    protected function sendWebhookNotification($type, $fieldsChanged)
    {
        $callbackUrl = env('CALLBACK_API_URL');

        $payload = [
            'type' => $type,
            'fields_changed' => $fieldsChanged,
        ];

        // Make a POST request to the callback URL
        Http::post($callbackUrl, $payload);
    }

}
