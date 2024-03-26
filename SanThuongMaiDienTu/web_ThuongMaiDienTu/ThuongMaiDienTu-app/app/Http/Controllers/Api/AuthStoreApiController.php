<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Models\cua_hang;
use App\Services\Convert;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthStoreApiController extends Controller
{
    public function Register(Request $request)
    {
        return Call::TryCatchResponseJson(function() use($request){
            $user = Auth::user();
            $cua_hang_id = Convert::ObjectId();
            $cua_hang = [    
                "_id"=>$cua_hang_id,                            
                "nguoi_dung_id"=>Convert::ObjectId($user->_id),
                "ten_cua_hang"=>$request->ten_cua_hang,
                "dia_chi"=>$request->dia_chi,
                "ngay_dang_ky"=>Convert::toUTCDateTime(),
                "luot_truy_cap"=>0,
                "trang_thai_hoat_dong"=>true,                
            ];            
            if(isset($user->email))
                $cua_hang["email"] = $user->email;
            if(isset($user->so_dien_thoai))
                $cua_hang["so_dien_thoai"] = $user->so_dien_thoai;
            $cua_hang = cua_hang::create($cua_hang); 
            return ResponseJson::success();           
        });
    }
}
