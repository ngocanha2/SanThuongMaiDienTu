<?php

namespace App\Http\Controllers\View;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class HomeController extends Controller
{
    public function HomeMain()
    {
        // echo phpinfo();
        return view("home.home");
    }
    public function ShowProductAll()
    {        
        return view("home.product_all");
    }   
}
