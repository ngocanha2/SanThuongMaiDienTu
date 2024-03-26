<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\danh_muc;
use App\Services\Convert;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CategoryApiController extends Controller
{
    public function GetCategory(?string $danh_muc_id = null)
    {
        try{            
            $data = ($danh_muc_id ? danh_muc::where("danh_muc_cha_id",Convert::ObjectId($danh_muc_id)) : danh_muc::whereNull("danh_muc_cha_id"))->get();                    
            return response()->json([
                "success"=>true,
                "data"=>$data
            ]);
        }   
        catch(Exception $e)
        {
            return response()->json([
                "success"=>false,
                "message"=>"Đã xảy ra lỗi!!!"
            ]);
        } 
    }
}
