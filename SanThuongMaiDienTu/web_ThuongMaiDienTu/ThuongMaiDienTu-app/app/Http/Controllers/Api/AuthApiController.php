<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\nguoi_dung;
use App\Services\AuthService;
use App\Services\UserService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthApiController extends Controller
{
    public function Login(Request $request)
    {
        $success = false;
        $message ="";        
        try
        {
            $fieldname = UserService::getFieldName($request->dang_nhap); //filter_var($request->dang_nhap, FILTER_VALIDATE_EMAIL) ? "email" : ((ctype_digit($request->dang_nhap) && strlen($request->dang_nhap) == 10) ? "so_dien_thoai" : "ten_dang_nhap");
            $nguoi_dung = nguoi_dung::where($fieldname,$request->dang_nhap)->first();        
            if(!$nguoi_dung)
            {
                $message = ($fieldname == "email" ? "Email" : ($fieldname == "so_dien_thoai" ? "Số điện thoại" : "Tên đăng nhập"))." không tồn tại!!!";                                
            }
            else
            {
                if(strcmp($nguoi_dung->mat_khau,$request->mat_khau)==0)
                {
                    Auth::guard('web')->login($nguoi_dung);                    
                    if(Session::has(config('app.CART_NAME')))
                        nguoi_dung::addCartTemporaryToMain($nguoi_dung,Session::pull(config('app.CART_NAME')));
                    $success = true;
                    $message = "Đăng nhập thành công";                    
                }
                else
                {
                    $message = "Mật khẩu không chính xác";                    
                }
            }            
            
        }catch(Exception $e)
        {            
            $message = $e->getMessage();            
            
        } 
        $url = Session::pull(config("app.PREVIOUS_URL"));
            $url = $url == route("login") ? "/":$url;        
        return response()->json([
            "success"=>$success,
            "message"=>$message, 
            "nguoidung"=>$success ? $nguoi_dung : null,
            "url"=>$success ? $url : null
        ]);
    }    
    public function Logout()
    {
        if(Auth::guard('store')->check())
            Auth::guard('store')->logout();
        Auth::guard('web')->logout();
        Session::flush();        
        redirect(url()->previous() ?? "/");
    }
    public function CheckLogin()
    {
        try{
            $status = 0;
            if(Auth::user())
                $status = 1;
            return response()->json([
                "status"=>$status
            ]);
        }
        catch(Exception $e)
        {
            return response()->json([
                "status"=>-1
            ]);
        }
    }
    public function Register(RegisterRequest $request)
    {
        return AuthService::register($request);
    }
}
