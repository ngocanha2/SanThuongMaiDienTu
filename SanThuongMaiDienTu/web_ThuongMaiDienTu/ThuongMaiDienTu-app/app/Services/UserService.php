<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Models\nguoi_dung;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\File;

class UserService 
{    
    public static function getUserPersonal()
    {
        return Call::TryCatchResponseJson(function(){
            return ResponseJson::success(data:Auth::guard('web')->user());
        });
    }
    public static function updateInfoPersonal($request)
    {
        return Call::TryCatchResponseJson(function() use($request){
            $user = Auth::guard("web")->user();
            $dataInfo = json_decode($request->info,true);            
            if($request->hasFile("avatar"))
            {
                $fileAvatar = $request->file("avatar");
                $fileName = $user->_id.".".'png';//$fileAvatar->getClientOriginalName();
                $type = File::extension($fileName);
                $dataInfo["anh_dai_dien"] = $fileName;
                $fileAvatar->move(public_path("uploads/avatar"),$fileName);
            }
            $dataInfo["ngay_sinh"] = Convert::toUTCDateTime($dataInfo["ngay_sinh"]);
            nguoi_dung::where("_id",$user->_id)
                        ->update($dataInfo);
            //Auth::guard("web")->login(nguoi_dung::where("_id",$user->_id));
            return ResponseJson::success(data:$dataInfo);
        });
    }
    public static function getFieldName($value)
    {
        return filter_var($value, FILTER_VALIDATE_EMAIL) ? "email" : ((ctype_digit($value) && strlen($value) == 10) ? "so_dien_thoai" : "ten_dang_nhap");
    }
}