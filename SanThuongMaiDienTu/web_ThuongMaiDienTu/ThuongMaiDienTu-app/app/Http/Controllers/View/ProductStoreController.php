<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProductStoreController extends Controller
{
    public function index()
    {
        return view("store.product.index");
    }
    public function create()
    {
        return view("store.product.create");
    }
    public function details(string $san_pham_id)
    {
        return view("store.product.details")->with("san_pham_id",$san_pham_id);
    }
}
