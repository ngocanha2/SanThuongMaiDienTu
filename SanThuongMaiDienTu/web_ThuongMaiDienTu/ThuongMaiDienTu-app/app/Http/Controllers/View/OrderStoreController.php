<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderStoreController extends Controller
{
    public function index()
    {
        return view("store.order.index");
    }
    public function details($don_hang_id)
    {
        return view("store.order.details");
    }
}
