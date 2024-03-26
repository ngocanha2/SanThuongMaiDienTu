<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreController extends Controller
{
    public function Home()
    {
        return view("store.home");
    }

    public function Register()
    {
        $user = Auth::user();
        return view("store.register",[
            "email"=>$user->email,
            "so_dien_thoai"=>$user->so_dien_thoai
        ]);
    }
}
