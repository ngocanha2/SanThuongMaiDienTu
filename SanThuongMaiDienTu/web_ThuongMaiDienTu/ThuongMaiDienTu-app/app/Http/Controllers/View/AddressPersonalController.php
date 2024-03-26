<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AddressPersonalController extends Controller
{
    public function get(string $id)
    {
        return view("personal.address.update")->with("id",$id);
    }
}
