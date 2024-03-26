<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class OrderPersonalController extends Controller
{
    public function index()
    {
        return view("personal.order.index");
    }
    public function details(string $id)
    {
        return view("personal.order.details");
    }
}
