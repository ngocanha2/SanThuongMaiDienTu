<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Http\Controllers\Controller;
use App\Services\VoucherShopbeeService;
use Illuminate\Http\Request;

class VoucherShobeeApiController extends Controller
{
    public function Gets()
    {
        return Call::TryCatchResponseJson(function(){
            return VoucherShopbeeService::getAllVoucherShopbee();
        });
    }
    public function GetShopbeeVouchers(Request $request,string $ma_voucher = null)
    {
        return Call::TryCatchResponseJson(function() use ($ma_voucher,$request){
            if($ma_voucher)
                return VoucherShopbeeService::getShopbeeVoucher($ma_voucher);
            return VoucherShopbeeService::getShopbeeVouchers($request);
        });
    }
}
