<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Requests\RegisterRequest;
use App\Models\nguoi_dung;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class ApiService 
{    
    var $url;
    public function __construct($url)
    {
        $this->url = $url."/"."api/";
    }
    public function get($prefix,$data)
    {
        $url = $this->url.$prefix."?";
        foreach ($data as $key => $value) {
            $url.=$key."=".$value."&";
        }        
        $url = substr($url,0,strlen($url)-1);        
        $response = Http::withoutVerifying()->get($url);        
        return $response->json();
    }
}


