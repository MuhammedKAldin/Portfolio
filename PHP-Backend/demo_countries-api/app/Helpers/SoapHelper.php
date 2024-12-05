<?php

namespace App\Helpers;

class SoapHelper
{
    public static function CountriesFormat($data)
    {
        header('Content-Type: text/xml; charset=utf-8');
    
        $xml = '<?xml version="1.0" encoding="UTF-8"?>';
        $xml .= '<xs:Envelope xmlns:xs="http://schemas.xmlsoap.org/soap/envelope/">';
        
        $xml .= '<xs:Body>';
        $xml .= '<xs:Response>';
        $xml .= '<xs:status>' . htmlspecialchars($data['status']) . '</xs:status>';
        
        $xml .= '<xs:data>';

        if (!empty($data['data'])) 
        {
            foreach ($data['data'] as $item) 
            {
                $xml .= '<xs:country>';
                
                if (isset($item['id'])) {
                    $xml .= '<xs:id>' . htmlspecialchars($item['id']) . '</xs:id>';
                }
                if (isset($item['name'])) {
                    $xml .= '<xs:name>';
                    $xml .= '<xs:en>' . htmlspecialchars($item['name']['en'] ?? '') . '</xs:en>';
                    $xml .= '<xs:ar>' . htmlspecialchars($item['name']['ar'] ?? '') . '</xs:ar>';
                    $xml .= '</xs:name>';
                }
                if (isset($item['description'])) {
                    $xml .= '<xs:description>';
                    $xml .= '<xs:en>' . htmlspecialchars($item['description']['en'] ?? '') . '</xs:en>';
                    $xml .= '<xs:ar>' . htmlspecialchars($item['description']['ar'] ?? '') . '</xs:ar>';
                    $xml .= '</xs:description>';
                }
                if (isset($item['message'])) {
                    $xml .= '<xs:message>' . htmlspecialchars($item['message']) . '</xs:message>';
                }
                
                $xml .= '</xs:country>';
            }
        }

        $xml .= '</xs:data>';
        $xml .= '</xs:Response>';
        $xml .= '</xs:Body>';
        $xml .= '</xs:Envelope>';

        return $xml;
    }
}
