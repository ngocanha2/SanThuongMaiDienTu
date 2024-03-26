<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\don_hang;
use App\Models\san_pham;
use Illuminate\Http\Request;

class EvaluateService 
{    
    public static function insert($san_pham_id,$don_hang_id,Request $request)
    {
        $san_pham_id = Convert::ObjectId($san_pham_id);
        $query = don_hang::where('_id', Convert::ObjectId($don_hang_id))                    
                ->where('chi_tiet_don_hangs.san_pham.san_pham_id',$san_pham_id);                    
        if($request->ten_phan_loai)
        {
            $query = $query->where('chi_tiet_don_hangs.san_pham.ten_phan_loai',$request->ten_phan_loai);
            if($request->ten_kich_co)
                $query = $query->where('chi_tiet_don_hangs.san_pham.ten_kich_co',$request->ten_kich_co);                
        }
        $danh_gia = $request->danh_gia;
        $danh_gia["ngay_danh_gia"] = Convert::toUTCDateTime();
        if(isset($danh_gia["an_danh"]))        
            $danh_gia["an_danh"] = boolval($danh_gia["an_danh"]);
        $danh_gia["muc_do_hai_long"] = intval($danh_gia["muc_do_hai_long"]);        
        $query->update([
            "chi_tiet_don_hangs.$.danh_gia"=>$danh_gia            
        ]);
        $query = san_pham::where("_id",$san_pham_id);
        $san_pham  = $query->first();
        $muc_danh_gia = $san_pham->danh_gia;
        $so_luong_danh_gia = $san_pham->so_luong_danh_gia + 1;    
        $muc_danh_gia = (($san_pham->so_luong_danh_gia * $muc_danh_gia)+$danh_gia["muc_do_hai_long"])/$so_luong_danh_gia;
        $query->update([
            "danh_gia"=>$muc_danh_gia,
            "so_luong_danh_gia"=>$so_luong_danh_gia
        ]);
        return ResponseJson::success($san_pham_id);
    }


}