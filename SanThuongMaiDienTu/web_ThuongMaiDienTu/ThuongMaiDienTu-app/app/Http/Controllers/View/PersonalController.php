<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class PersonalController extends Controller
{
    public function index()
    {
        return view("personal.index");
    }
    public function information()
    {
        return view("personal.information");
    }
    public function address()
    {
        return view("personal.address.index");
    }
}
