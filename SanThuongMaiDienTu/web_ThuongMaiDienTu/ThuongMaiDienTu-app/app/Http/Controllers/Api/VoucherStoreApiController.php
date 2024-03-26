<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Models\cua_hang;
use App\Services\Convert;
use App\Services\VoucherStoreService;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use MongoDB\BSON\UTCDateTime;
use Ramsey\Uuid\Type\Integer;
use App\Helpers\Call;

class VoucherStoreApiController extends Controller
{
    public function GetVoucherAll(Request $request,string $cua_hang_id = null)
    {
                
        try{
            if(!isset($cua_hang_id))
            {
                if (($store = Auth::guard("store")->user()))
                {
                    $cua_hang_id = $store->_id;
                }
                else
                    return response()->json([
                        "success"=>false,
                        "message"=>"Dữ liệu đầu vào không hợp lệ!!!"
                    ]);   
            }              
            if(isset($request->status))
                return VoucherStoreService::getVoucherStoreWithStatus($cua_hang_id,$request->status);                          
            return ResponseJson::success(cua_hang::getVoucherAll($cua_hang_id));            
        }   
        catch(Exception $e)
        {
            return response()->json([
                "success"=>false,
                "message"=>"Đã xảy ra lỗi!!!".$e->getMessage()
            ]);
        }     
    }
    public function GetVoucher($ma_khuyen_mai)
    {        
        try{
            $status = 0;
            $khuyen_mai = cua_hang::raw(function ($collection) use ($ma_khuyen_mai) {
                return $collection->aggregate([
                    [
                        '$unwind' => '$khuyen_mais',
                    ],
                    [
                        '$match' => [
                            'khuyen_mais.ma_khuyen_mai' => $ma_khuyen_mai,
                        ],
                    ],
                    [
                        '$project' => [
                            'khuyen_mai' => '$khuyen_mais',
                        ],
                    ],
                ]);
            })->first();            
            if($khuyen_mai)
                $status = 1;            
            return response()->json([
                "status"=>$status,
                "data"=>$khuyen_mai
            ]);
        }   
        catch(Exception $e)
        {
            return response()->json([
                "status"=>-1,                
            ]);
        }  
    }
    public function CreateVoucher(Request $request)
    {
        try{
            $cua_hang = Auth::guard('store')->user();
            if($cua_hang)
            {

                $khuyen_mai = VoucherStoreService::buildVoucherFromRequest($request);
                // $khuyen_mai = [
                //     "ten_khuyen_mai"=>$request->ten_khuyen_mai,
                //     "ma_khuyen_mai"=>$request->ma_khuyen_mai,
                //     "ty_le_giam_gia"=> intval($request->ty_le_giam_gia)/100,
                //     "don_hang_toi_thieu"=>intval($request->don_hang_toi_thieu),
                //     "so_luong"=>intval($request->so_luong),
                //     "muc_giam_toi_da"=>intval($request->muc_giam_toi_da),                    
                //     "ngay_bat_dau" => Convert::toUTCDateTime($request->ngay_bat_dau),
                //     "ngay_ket_thuc"=> Convert::toUTCDateTime($request->ngay_ket_thuc),
                // ];                                
                // return response()->json([
                //     "success"=>true,
                //     "data"=>$khuyen_mai
                // ]);
                cua_hang::where("_id",$cua_hang->_id)
                    ->push("khuyen_mais",[$khuyen_mai]);
                return response()->json([
                    "success"=>true,
                    "data"=>$khuyen_mai
                ]);
            }
            return response()->json([
                "success"=>true,
            ]);
        }   
        catch(Exception $e)
        {
            return response()->json([
                "success"=>false,
                "message"=>"Đã xảy ra lỗi!!!".$e->getMessage()
            ]);
        }     
    }
    public function UpdateVoucher(string $ma_khuyen_mai, Request $request)
    {
        return Call::TryCatchResponseJson(function() use ($ma_khuyen_mai,$request){
            return VoucherStoreService::updateVoucher($ma_khuyen_mai,VoucherStoreService::buildVoucherFromRequest($request));
        });
    }
    public function DeteleVoucher(string $ma_khuyen_mai)
    {
        return Call::TryCatchResponseJson(function() use ($ma_khuyen_mai){
            return VoucherStoreService::deleteVoucher($ma_khuyen_mai);
        });
    }
}
