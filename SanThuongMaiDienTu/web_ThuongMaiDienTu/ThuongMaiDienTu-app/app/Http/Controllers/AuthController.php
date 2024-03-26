<?php

namespace App\Http\Controllers;

use App\Models\nguoi_dung;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class AuthController extends Controller
{    
    public function Logout()
    {
        if(Auth::guard('store')->check())
            Auth::guard('store')->logout();
        Auth::guard('web')->logout();
        Session::flush();
        return redirect(url()->previous() ?? "/");
    }
    public function Login()
    {                     
        if(Auth::guard('web')->check())
            return redirect(url()->previous() ?? "/");
        if(!Session::has(config("app.PREVIOUS_URL")))  
            Session::put(config("app.PREVIOUS_URL"),route("login"));
        return view("home.login");        
    }
}
