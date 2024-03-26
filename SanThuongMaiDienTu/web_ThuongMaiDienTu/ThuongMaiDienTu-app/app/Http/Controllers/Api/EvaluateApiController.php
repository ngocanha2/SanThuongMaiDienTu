<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Models\danh_gia;
use App\Models\don_hang;
use App\Services\Convert;
use App\Services\EvaluateService;
use Exception;
use Illuminate\Http\Request;

class EvaluateApiController extends Controller
{


    public function Gets($san_pham_id) {        
        try
        {   
            $danh_gias = don_hang::raw(function($collection) use ($san_pham_id) {
                return $collection->aggregate([    
                    [
                        '$unwind' => '$chi_tiet_don_hangs'
                    ],                                                                       
                    [
                        '$match' => [
                            '$and'=>[
                                ["chi_tiet_don_hangs.san_pham.san_pham_id"=>Convert::ObjectId($san_pham_id)],
                                ["chi_tiet_don_hangs.danh_gia"=>[
                                    '$ne'=>null
                                ]
                                ]
                            ]
                        ]
                    ],
                    [
                        '$lookup'=> [
                          'from'=> "nguoi_dung",
                          'localField'=> "nguoi_dung_id",
                          'foreignField'=> "_id",
                          'as'=> "nguoi_danh_gia"
                        ]
                    ],
                    [
                        '$unwind' => '$nguoi_danh_gia'
                    ],
                    [
                        '$project'=>[
                            "nguoi_dung_id"=>'$nguoi_danh_gia._id',
                            "ten_dang_nhap"=>'$nguoi_danh_gia.ten_dang_nhap',
                            "ho_ten"=>'$nguoi_danh_gia.ho_ten',
                            "anh_dai_dien"=>'$nguoi_danh_gia.anh_dai_dien',
                            "danh_gia"=>'$chi_tiet_don_hangs.danh_gia'
                        ]
                    ]
                ]);
            });        
        return Response()->json([
            "success"=>true,
            "data" => $danh_gias
        ]);
        }
        catch(Exception $e)
        {
            return Response()->json([
                "success"=>false,
                "message"=>"Đã xảy ra lỗi".$e->getMessage()
            ]);
        }        
    }

    // public function Gets($san_pham_id) {        
    //     try
    //     {   
    //     // $danh_gia = DB::collection("danh_gia")                    
    //     //             ->where('san_pham_id',$ma_san_pham)
    //     //             ->first();  
    //     $danh_gia = danh_gia::raw(function($collection) use ($ma_san_pham) {
    //             return $collection->aggregate([    
    //                 [
    //                     '$unwind' => '$danh_gias'
    //                 ],              
    //                 [
    //                     '$lookup' => [
    //                         'from' => 'nguoi_dung',
    //                         'localField' => 'danh_gias.nguoi_dung_id',
    //                         'foreignField' => '_id',
    //                         'as' => 'nguoi_dung_info'
    //                     ]
    //                 ], 
    //                 [
    //                     '$unwind' => '$nguoi_dung_info'
    //                 ],                  
    //                 [
    //                     '$match' => [
    //                         "san_pham_id"=>$ma_san_pham
    //                     ]
    //                 ],
    //                 [
    //                     '$project'=>[
    //                         "nguoi_dung_id"=>'$danh_gias.nguoi_dung_id',
    //                         "ngay_danh_gia"=>'$danh_gias.ngay_danh_gia',
    //                         "muc_do_hai_long"=>'$danh_gias.muc_do_hai_long',
    //                         "noi_dung"=>'$danh_gias.noi_dung',
    //                         "an_danh"=>'$danh_gias.an_danh',
    //                         "ten_dang_nhap"=>'$nguoi_dung_info.ten_dang_nhap',
    //                         "ho_ten"=>'$nguoi_dung_info.ho_ten',
    //                         "anh_dai_dien"=>'$nguoi_dung_info.anh_dai_dien',                        
    //                     ]
    //                 ]
    //             ]);
    //         });        
    //     return Response()->json([
    //         "success"=>true,
    //         "data" => $danh_gia
    //     ]);
    //     }
    //     catch(Exception $e)
    //     {
    //         return Response()->json([
    //             "success"=>false,
    //             "message"=>"Đã xảy ra lỗi".$e->getMessage()
    //         ]);
    //     }        
    // }

    
    public function Insert($don_hang_id,$san_pham_id,Request $request){             
        return Call::TryCatchResponseJson(function() use($san_pham_id,$don_hang_id,$request){
            return EvaluateService::insert($san_pham_id,$don_hang_id,$request);
        });
    }
}
