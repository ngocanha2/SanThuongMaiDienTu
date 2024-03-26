<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Services\Convert;
use App\Services\StatisticalService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StatisticalStoreApiController extends Controller
{
    public function index(Request $request)
    {
        return Call::TryCatchResponseJson(function()use($request){
            $store = Auth::guard("store")->user();
            $productId = isset($request->san_pham_id) ? $request->san_pham_id : null;
            $startTime = isset($request->ngay_bat_dau) ? Carbon::parse($request->ngay_bat_dau) : Convert::toCarbonFromTimestampMs($store->ngay_dang_ky);
            $endTime = isset($request->ngay_ket_thuc) ? Carbon::parse($request->ngay_ket_thuc) : Carbon::now();
            $statisticalService = new StatisticalService();
            $data = $statisticalService->handle($store,$startTime,$endTime,$productId);
            return ResponseJson::success($data);
        });

    }
}
