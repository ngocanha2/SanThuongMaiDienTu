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
use Illuminate\Support\Facades\Session;

class  AuthService 
{    
    public static function register(RegisterRequest $request)
    {
        return Call::TryCatchResponseJson(function()use($request){
            $fieldname = UserService::getFieldName($request->dang_nhap);
            if($fieldname == "ten_dang_nhap")
                return ResponseJson::errors([
                    "dang_nhap"=>["Trường đăng nhập không đúng định dạng"]
            ]);
            $nguoi_dung = nguoi_dung::where($fieldname,$request->dang_nhap)->first();
            if(isset($nguoi_dung))
                return ResponseJson::errors([
                    "dang_nhap"=>[($fieldname == "email" ? "Email":"Số điện thoại")." đã tồn tại"]
                ]);
            if($request->mat_khau != $request->nhap_lai_mat_khau)
                return ResponseJson::errors([
                    "nhap_lai_mat_khau"=>["Mật khẩu nhập lại không chính xác"]
            ]);
            $ten_dang_nhap = "";
            $count = nguoi_dung::count();
            do
            {
                $ten_dang_nhap = "user00".strval(++$count);
            }while(nguoi_dung::where("ten_dang_nhap",$ten_dang_nhap)->first()!=null);
            $nguoi_dung = nguoi_dung::create([                
                "ten_dang_nhap"=>$ten_dang_nhap,
                "ho_ten"=>$request->ho_ten,
                $fieldname=>$request->dang_nhap,                                                
                'mat_khau'=>$request->mat_khau,
                'ngay_tao'=>Convert::toUTCDateTime(),
            ]);
            Auth::guard('web')->login($nguoi_dung);                    
            if(Session::has(config('app.CART_NAME')))
                nguoi_dung::addCartTemporaryToMain($nguoi_dung,Session::pull(config('app.CART_NAME')));
            $url = Session::pull(config("app.PREVIOUS_URL"));
            $url = $url == route("login") ? "/":$url;
            return ResponseJson::success(data:[
                "url"=>$url,
                "nguoidung"=>$nguoi_dung
            ],msg:"Đăng ký thành công");
        });
    }
}


