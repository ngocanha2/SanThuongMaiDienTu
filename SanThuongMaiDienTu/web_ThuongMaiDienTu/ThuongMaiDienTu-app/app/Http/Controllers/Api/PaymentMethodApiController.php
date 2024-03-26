<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Http\Controllers\Controller;
use App\Services\PaymentMethodService;
use Illuminate\Http\Request;

class PaymentMethodApiController extends Controller
{
    public function Gets()
    {
        return Call::TryCatchResponseJson(function(){
            return PaymentMethodService::getAllPaymentMethods();            
        });
    }
}
