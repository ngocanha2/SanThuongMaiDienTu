<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function Details($ma_san_pham)
    {
        return view("product.details")->with("ma_san_pham",$ma_san_pham);
    }
}
