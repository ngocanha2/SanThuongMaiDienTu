<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\don_hang;
use App\Models\san_pham;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class ProductService 
{    
    public static function getAveragePrice(san_pham $sanPham)
        {
            $length = 0;
            $totalPrice = 0;
            $max = -1;
            $min = PHP_INT_MAX;            
            if (isset($sanPham["gia_hien_tai"]))
            {
                $totalPrice += $sanPham["gia_hien_tai"];
                $length++;
                $max = $max < $sanPham["gia_hien_tai"] ? $sanPham["gia_hien_tai"] : $max;
                $min = $min > $sanPham["gia_hien_tai"] ? $sanPham["gia_hien_tai"] : $min;
            }
            if (isset($sanPham->phan_loais))
                foreach($sanPham->phan_loais as $phanLoai)
                {
                    if (isset($phanLoai["gia_hien_tai"]))
                    {
                        $totalPrice += $phanLoai["gia_hien_tai"];
                        $length++;
                        $max = $max < $phanLoai["gia_hien_tai"] ? $phanLoai["gia_hien_tai"] : $max;
                        $min = $min > $phanLoai["gia_hien_tai"] ? $phanLoai["gia_hien_tai"] : $min;
                    }
                    if (isset($phanLoai["kich_co_phan_loais"]))
                        foreach ($phanLoai["kich_co_phan_loais"] as $kichCoPhanLoai)
                            if (isset($kichCoPhanLoai["gia_hien_tai"]))
                            {
                                $totalPrice += $kichCoPhanLoai["gia_hien_tai"];
                                $length++;
                                $max = $max < $kichCoPhanLoai["gia_hien_tai"] ? $kichCoPhanLoai["gia_hien_tai"] : $max;
                                $min = $min > $kichCoPhanLoai["gia_hien_tai"] ? $kichCoPhanLoai["gia_hien_tai"] : $min;
                            }
                }                
            return [
                "average"=>$totalPrice/$length,
                "max"=>$max,
                "min"=>$min,
            ];
        }   
}