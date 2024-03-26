<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\phuong_thuc_van_chuyen;
use Carbon\Carbon;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;

class ShippingMethodService 
{    
    public static function GetAllShippingMethod()
    {
        $data = phuong_thuc_van_chuyen::all();
        return ResponseJson::success($data);
    }
    public static function get($phuong_thuc_van_chuyen_id)
    {        
        return phuong_thuc_van_chuyen::where("_id",Convert::ObjectId($phuong_thuc_van_chuyen_id))->first();
    }
}