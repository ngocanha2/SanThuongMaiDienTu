<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\don_hang;
use App\Models\san_pham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductStoreService 
{    
    
    public static function buildProductByRequest(Request $request, $san_pham_id, ?string $cua_hang_id = null)
    {        
        $cua_hang_id = isset($cua_hang_id) ? Convert::ObjectId($cua_hang_id) : Auth::guard("store")->user()->_id;                
        $san_pham = json_decode($request->san_pham,true);                
        $san_pham["cua_hang_id"] = Convert::ObjectId($cua_hang_id);  
        $san_pham["danh_muc_id"] = Convert::ObjectId($san_pham["danh_muc_id"]); 
        $san_pham["mo_ta"] = "sdfsdfsdf";             
        $san_pham["danh_gia"] = 0; 
        $san_pham["so_luong_danh_gia"] = 0; 
        if(isset($san_pham["giam_gia"]))
        {
            $san_pham['ngay_ket_thuc'] = Convert::toUTCDateTime($san_pham['ngay_ket_thuc']);
            $san_pham['ngay_bat_dau'] = Convert::toUTCDateTime($san_pham['ngay_bat_dau'] ?? null);

        }          
        if ($request->hasFile('images')){
            $files = $request->file("images");            
            foreach($files as $file) {
                $fileName = $file->getClientOriginalName();
                $file->move(public_path("uploads/$cua_hang_id/".strval($san_pham_id)), $fileName);                    
            }
        }
        if ($request->hasFile('video')){
            $video = $request->file("video");                
            $videoName = $video->getClientOriginalName();
            $san_pham["video"] = $videoName;
            $video->move(public_path("uploads/$cua_hang_id/".strval($san_pham_id)), $videoName);                                    
        }    
        return $san_pham; 
    }
    public static function update($san_pham_id, Request $request)
    {                
        // return ResponseJson::success(data:ProductStoreService::buildProductByRequest($request,$san_pham_id));
        $query = san_pham::where("_id",Convert::ObjectId($san_pham_id));
        $san_pham = $query->first();
        $san_pham_cap_nhap = ProductStoreService::buildProductByRequest($request,$san_pham_id);
        $query->update($san_pham_cap_nhap);
        if(isset($san_pham->phan_loais) && !isset($san_pham_cap_nhap["phan_loais"]))
            $query->unset("phan_loais");
        else if(!isset($san_pham->phan_loais) && isset($san_pham_cap_nhap["phan_loais"]))
            $query->unset("so_luong_ton");
        if(isset($san_pham->giam_gia) && !isset($san_pham_cap_nhap["giam_gia"]))
        {
            $query->unset(["giam_gia", "ngay_bat_dau", "ngay_ket_thuc"]);
        }        
        return ResponseJson::success();
    }
    public static function updateQuantityWithOrder(don_hang $don_hang,$add = false)
    { 
        $value = $add ? 1:-1;
        $chi_tiet_don_hangs = $don_hang->chi_tiet_don_hangs;
        foreach ($chi_tiet_don_hangs as $chi_tiet_don_hang) {            
            ProductStoreService::updateQuantityProduct($chi_tiet_don_hang["san_pham"],(($chi_tiet_don_hang["so_luong"]+($chi_tiet_don_hang["so_luong_phu"] ?? 0))*$value));
        }
    }
    public static function updateQuantityProduct($product,$minusValue)
    {        
        $query = san_pham::where('_id', $product["san_pham_id"]);
        $san_pham = $query->first();
        if(!isset($san_pham))
            return false;

        if(isset($product["ten_phan_loai"]))
        {
            $arrayFilters = [
                ['outer.ten_phan_loai' => $product["ten_phan_loai"]]
            ];
            $query = $query->where('phan_loais.ten_phan_loai', $product["ten_phan_loai"]);
            $filter = 'phan_loais.$[outer]';
            if(isset($product["ten_kich_co"]))
            {
                $query = $query->where('phan_loais.kich_co_phan_loais.ten_kich_co', $product["ten_kich_co"]);
                array_push($arrayFilters,['inner.ten_kich_co' => $product["ten_kich_co"]]);
                $filter .='.kich_co_phan_loais.$[inner].so_luong_ton';                
            } 
            else
                $filter .='.so_luong_ton';                
            $query->update(
                [
                    '$inc' => [
                        $filter => $minusValue,
                    ],
                ],
                [
                    'arrayFilters' => $arrayFilters,
                ]
            );            
        }
        else
        {
            if(isset($san_pham->so_luong_ton))
            {                
                $query->update([
                    "so_luong_ton" => $san_pham->so_luong_ton + $minusValue
                ]);                
            }
        }              
        // return ResponseJson::success($product);
        return true;
    }
}