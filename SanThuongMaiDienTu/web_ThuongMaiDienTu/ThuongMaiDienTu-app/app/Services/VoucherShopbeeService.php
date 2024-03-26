<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\phuong_thuc_thanh_toan;
use App\Models\shopbee_vouchers;
use App\Models\vouchers;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class VoucherShopbeeService 
{    
    public static function getAllVoucherShopbee()
    {        
        return ResponseJson::success(vouchers::all());
    }
    public static function getShopbeeVoucher($ma_voucher)
    {        
        return shopbee_vouchers::raw(function ($collection) use ($ma_voucher){
            return $collection->aggregate([
                ['$unwind' => '$vouchers'],
                ['$match' => [
                    'vouchers.ma_voucher' => $ma_voucher
                ]],
                ['$project'=>[
                    "vouchers"=>1
                ]]
                ]);
            })->first()["vouchers"];
    }
    public static function getShopbeeVoucherType($ma_voucher)
    {
        return shopbee_vouchers::raw(function ($collection) use ($ma_voucher){
            return $collection->aggregate([
                ['$unwind' => '$vouchers'],
                ['$match' => [
                    'vouchers.ma_voucher' => $ma_voucher
                ]],                
                ]);
            })->first();
    }
    public static function getShopbeeVouchers(Request $request)
    {        
        $and=[
            ['vouchers.ngay_ket_thuc' => ['$gt' => Convert::toUTCDateTime()]],
        ];
        $dataOrder = Session::get(config("app.DATA_ORDER"));
        if($request->cua_hangs || $dataOrder)
        {    
            $in = [];     
            if($request->cua_hangs) 
            {
                foreach ($request->cua_hangs as $cua_hang_id) 
                    array_push($in,Convert::ObjectID($cua_hang_id));     
            }  
            else
            {                
                foreach ($dataOrder as $cua_hang) 
                    array_push($in,Convert::ObjectID($cua_hang["_id"]));                  
            }                      
            array_push($and,[
                '$or'=> [
                    ['vouchers.cua_hangs' => null],
                    ['vouchers.cua_hangs' => ['$size' => 0]],
                    ['vouchers.cua_hangs' => ['$in' => $in]],
                ]
            ]); 
        }
        $results = shopbee_vouchers::raw(function ($collection) use($and){
            return $collection->aggregate([
                ['$unwind' => '$vouchers'],
                ['$match' => [
                    '$and' => $and
                ]],
                ['$lookup' => [
                    'from' => 'danh_muc',
                    'localField' => 'vouchers.danh_mucs',
                    'foreignField' => '_id',
                    'as' => 'danh_mucs'
                ]],
                [
                    '$unwind' => [
                        'path' => '$danh_mucs',
                        'preserveNullAndEmptyArrays' => true,
                    ],
                ],                
                ['$graphLookup' => [
                    'from' => 'danh_muc',
                    'startWith' => '$danh_mucs._id',
                    'connectFromField' => '_id',
                    'connectToField' => 'danh_muc_cha_id',
                    'as' => 'danh_muc_cons',
                    'depthField' => 'depth',
                ]],
                ['$lookup' => [
                    'from' => 'phuong_thuc_van_chuyen',
                    'localField' => 'vouchers.phuong_thuc_van_chuyens',
                    'foreignField' => '_id',
                    'as' => 'phuong_thuc_van_chuyens'
                ]],
                ['$lookup' => [
                    'from' => 'phuong_thuc_thanh_toan',
                    'localField' => 'vouchers.phuong_thuc_thanh_toans',
                    'foreignField' => '_id',
                    'as' => 'phuong_thuc_thanh_toans'
                ]],                
                [
                    '$unwind' => [
                        'path' => '$phuong_thuc_van_chuyens',
                        'preserveNullAndEmptyArrays' => true,
                    ],
                ], 
                [
                    '$unwind' => [
                        'path' => '$phuong_thuc_thanh_toans',
                        'preserveNullAndEmptyArrays' => true,
                    ],
                ], 
                ['$group' => [
                    '_id' => '$vouchers.ma_voucher',
                    'loai_voucher_id' => ['$first' => '$_id'],
                    'loai_voucher' => ['$first' => '$loai_voucher'],
                    'loai_chi_phi_ap_dung' => ['$first' => '$loai_chi_phi_ap_dung'],
                    'vouchers' => ['$first' => '$vouchers'],
                    'danh_mucs' => ['$addToSet' => '$danh_mucs'],
                    'danh_muc_cons' => ['$addToSet' => '$danh_muc_cons'],
                    'phuong_thuc_van_chuyens' => ['$addToSet' => '$phuong_thuc_van_chuyens'],
                    'phuong_thuc_thanh_toans' => ['$addToSet' => '$phuong_thuc_thanh_toans'],
                ]],
                ['$project' => [
                    'loai_voucher_id' => 1,
                    'loai_voucher' => 1,
                    'loai_chi_phi_ap_dung' => 1,
                    'vouchers' => [
                        'ma_voucher' => '$vouchers.ma_voucher',
                        'ten_voucher' => '$vouchers.ten_voucher',
                        'ty_le_giam_gia' => '$vouchers.ty_le_giam_gia',
                        'don_hang_toi_thieu' => '$vouchers.don_hang_toi_thieu',
                        'so_luong' => '$vouchers.so_luong',
                        'muc_giam_toi_da' => '$vouchers.muc_giam_toi_da',
                        'ngay_bat_dau' => '$vouchers.ngay_bat_dau',
                        'ngay_ket_thuc' => '$vouchers.ngay_ket_thuc',
                        'doi_tuong_tham_chieu' => '$vouchers.doi_tuong_tham_chieu',
                        'cua_hangs' => '$vouchers.cua_hangs',
                        'danh_mucs' => '$danh_mucs',
                        'danh_muc_cons' => '$danh_muc_cons',
                        'phuong_thuc_van_chuyens' => '$phuong_thuc_van_chuyens',
                        'phuong_thuc_thanh_toans' => '$phuong_thuc_thanh_toans',
                    ]
                ]],
                ['$group' => [
                    '_id' => '$loai_voucher_id',
                    'loai_voucher' => ['$first' => '$loai_voucher'],
                    'loai_chi_phi_ap_dung' => ['$first' => '$loai_chi_phi_ap_dung'],
                    'vouchers' => ['$push' => '$vouchers'],
                ]]
            ]);
        });
    
        return ResponseJson::success($results);
    }
    public static function updateQuantityShopbeeVoucherMinus($id,$ma_voucher,$quantity)    
    {
        shopbee_vouchers::where('_id', $id)
            ->where('vouchers.ma_voucher', $ma_voucher)
            ->decrement('vouchers.$.so_luong', $quantity);
    }
}