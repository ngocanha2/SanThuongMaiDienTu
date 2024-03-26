<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class OrderController extends Controller
{
    public function Checkout()
    {
        return view("order.checkout");
    }

    public function Success()
    {
        if(Session::has("orderSuccess"))
        {
            Session::forget("orderSuccess");
            return view("order.success");
        }
        return view("order.success");
        return view("errors.404");
        
    }
}
