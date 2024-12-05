<?php

    //------------------------------------
    // = Helper Tools / Resuable Components
    //---------------------------------------
    //---------------------------------------

    function capitalizeFirstLetter($string) 
    {
        return ucfirst(strtolower($string));
    }

    function resourceful($path)
    {
        $manifestPath = public_path('build/manifest.json');
        if (!File::exists($manifestPath)) {
            return '';
        }

        $manifest = json_decode(File::get($manifestPath), true);

        return isset($manifest[$path]) ? asset('build/' . $manifest[$path]['file']) : '';
    }

?>