<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Http\Controllers\Controller;
use App\Services\ShippingMethodService;
use Illuminate\Http\Request;

class ShippingMethodApiController extends Controller
{
    public function Gets()
    {
        return Call::TryCatchResponseJson(function(){
            return ShippingMethodService::GetAllShippingMethod();
        });
    }
    public function Get($phuong_thuc_van_chuyen_id)
    {
        
    }
}
