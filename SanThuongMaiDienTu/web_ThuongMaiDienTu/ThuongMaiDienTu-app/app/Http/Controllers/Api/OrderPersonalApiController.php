<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Illuminate\Http\Request;

class OrderPersonalApiController extends Controller
{
    public function Gets(?int $status = null)
    {
        return OrderService::getOrdersPersonal($status);
    }
    public static function Deiails(string $don_hang_id)
    {
        return OrderService::getOrderDetails($don_hang_id);
    }
    public static function Cancel(string $don_hang_id, Request $request)
    {        
        return OrderService::cancelOrder($don_hang_id,$request->ly_do);
    }
}
