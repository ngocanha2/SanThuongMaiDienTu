<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class  CalculateHelper 
{    
    // public static function FindPriceRange($sanPham)
    // {
    //     $max = $sanPham->gia_hien_tai ?? -1;        
    //     $min = null;
    //     if(isset($sanPham['phan_loais']))
    //     {
    //         $items = $sanPham['phan_loais'];
    //         do {
    //             $item = array_shift($items);
    //             if($item->gia_hien_tai)
    //             {
    //                 $max = $item->gia_hien_tai > $max ? $item->gia_hien_tai: $max;
    //                 $min = isset($min) ? ($item->gia_hien_tai < $min ? $item->gia_hien_tai : $min) :$item->gia_hien_tai;
    //             }
    //             else if($item['kich_co_phan_loais'])
    //                 foreach ($item['kich_co_phan_loais'] as $item2)       
    //                     array_push($items,$item2);
    //         }while(count($items)>0);
    //     }
    //     return [
    //         "max"=>$max,
    //         "min"=>$min
    //     ];
    // }    
}