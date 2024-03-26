<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Models\cua_hang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class VoucherStoreService 
{    
    public static function updateQuantityVoucher($cua_hang_id,$ma_khuyen_mai,$newQuantity)
    {
        cua_hang::where('_id', $cua_hang_id)
            ->where('khuyen_mais.ma_khuyen_mai', $ma_khuyen_mai)
            ->update([
                'khuyen_mais.$.so_luong' => $newQuantity,
            ]);
    }
    public static function updateVoucher($ma_khuyen_mai,$voucherUpdate)
    {
        $cua_hang_id = Auth::guard("store")->user()->_id;
        cua_hang::where('_id', $cua_hang_id)
            ->where('khuyen_mais.ma_khuyen_mai', $ma_khuyen_mai)
            ->update([
                'khuyen_mais.$' => $voucherUpdate,
            ]);
        return ResponseJson::success($voucherUpdate["ma_khuyen_mai"],"Cập nhật khuyến mãi thành công!!!");
    }
    public static function deleteVoucher($ma_khuyen_mai)
    {
        $cua_hang_id = Auth::guard("store")->user()->_id;
        cua_hang::where('_id', $cua_hang_id)
            ->pull('khuyen_mais', ['ma_khuyen_mai' => $ma_khuyen_mai]);
        return ResponseJson::success();
    }
    public static function buildVoucherFromRequest(Request $request)
    {
        return [
            "ten_khuyen_mai"=>$request->ten_khuyen_mai,
            "ma_khuyen_mai"=>$request->ma_khuyen_mai,
            "ty_le_giam_gia"=> intval($request->ty_le_giam_gia)/100,
            "don_hang_toi_thieu"=>intval($request->don_hang_toi_thieu),
            "so_luong"=>intval($request->so_luong),
            "muc_giam_toi_da"=>intval($request->muc_giam_toi_da),                    
            "ngay_bat_dau" => Convert::toUTCDateTime($request->ngay_bat_dau),
            "ngay_ket_thuc"=> Convert::toUTCDateTime($request->ngay_ket_thuc),
        ];       
    }
    public static function getVoucherStoreWithStatus($cua_hang_id,$status)
    {
        $result = cua_hang::raw(function($collection) use($cua_hang_id,$status){
            $today = Convert::toUTCDateTime();
            $aggregate = [
                [
                    '$match' => [
                        '_id' => Convert::ObjectId($cua_hang_id)
                    ]
                ],
                [
                    '$unwind' => '$khuyen_mais'
                ],                            
            ];
            switch ($status) {
                case 1:
                    array_push($aggregate,[
                                    '$match' => [
                                        '$and' => [
                                            [
                                                'khuyen_mais.ngay_bat_dau' => ['$lte' => $today]
                                            ],
                                            [
                                                'khuyen_mais.ngay_ket_thuc' => ['$gte' => $today]
                                            ]
                                        ]
                                    ]
                                ]);
                    break;
                case 2:
                    array_push($aggregate,[
                                    '$match' => [                                            
                                        'khuyen_mais.ngay_bat_dau' => ['$gt' => $today]                                                                                          
                                    ]
                                ]);
                    break;
                case 3:
                    array_push($aggregate,[
                                    '$match' => [                                            
                                        'khuyen_mais.ngay_ket_thuc' => ['$lt' => $today]                                                                                          
                                    ]
                                ]);
                    break;                
                default:
                    break;
            }
            array_push($aggregate, [
                '$project' => [
                    'ma_khuyen_mai' => '$khuyen_mais.ma_khuyen_mai',
                    'ty_le_giam_gia' => '$khuyen_mais.ty_le_giam_gia',
                    'don_hang_toi_thieu' => '$khuyen_mais.don_hang_toi_thieu',
                    'so_luong' => '$khuyen_mais.so_luong',
                    'muc_giam_toi_da' => '$khuyen_mais.muc_giam_toi_da',
                    'ngay_bat_dau' => '$khuyen_mais.ngay_bat_dau',
                    'ngay_ket_thuc' => '$khuyen_mais.ngay_ket_thuc',
                ]
                ]);                
            return $collection->aggregate($aggregate);
        });                
        return ResponseJson::success($result);
    }
    public static function updateQuantityVoucherMinus($cua_hang_id,$ma_khuyen_mai,$quantity)    
    {
        cua_hang::where('_id', $cua_hang_id)
            ->where('khuyen_mais.ma_khuyen_mai', $ma_khuyen_mai)
            ->decrement('khuyen_mais.$.so_luong', $quantity);
    }
}