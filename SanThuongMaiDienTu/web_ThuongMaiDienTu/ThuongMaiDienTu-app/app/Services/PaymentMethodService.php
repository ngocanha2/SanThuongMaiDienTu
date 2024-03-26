<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\phuong_thuc_thanh_toan;
use Carbon\Carbon;

class PaymentMethodService
{    
    public static function getAllPaymentMethods()
    {        
        return ResponseJson::success(phuong_thuc_thanh_toan::all());
    }

}