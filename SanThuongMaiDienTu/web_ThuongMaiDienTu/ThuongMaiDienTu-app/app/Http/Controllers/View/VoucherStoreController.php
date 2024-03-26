<?php

namespace App\Http\Controllers\View;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class VoucherStoreController extends Controller
{
    public function index()
    {
        return view("store.voucher.index");
    }
    public function create()
    {
        return view("store.voucher.create");
    }
    public function details(string $ma_khuyen_mai)
    {
        return view("store.voucher.details")->with("ma_khuyen_mai",$ma_khuyen_mai);
    }
}
