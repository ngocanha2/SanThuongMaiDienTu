<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Models\cua_hang;
use App\Models\don_hang;
use App\Models\nguoi_dung;
use App\Models\san_pham;
use App\Services\ApiService;
use App\Services\Convert;
use App\Services\ProductService;
use App\Services\SelectHelper;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

//use Jenssegers\Mongodb\Eloquent\Builder;

class ProductApiController extends Controller
{
    public function suggest()
    {
        return Call::TryCatchResponseJson(function(){
            if(Auth::check())
            {                
                $user = Auth::guard("web")->user();
                $api = new ApiService("https://localhost:44397");
                $sanPhamIds = $api->get("product",[
                    "userId"=>strval($user->_id)
                ]); 
                if(isset($sanPhamIds))
                    $sanPhams = san_pham::whereIn("_id",$sanPhamIds)->get();  
                else
                    $sanPhams = san_pham::paginate(10); 
            }
            else
            {
                $sanPhams = san_pham::paginate(10); 
            }    
            return ResponseJson::success($sanPhams);
        });
    }
    public function ShowAll(Request $request)
    {             
        try
        {   
            // if(Auth::check())
            // {                
            //     $user = Auth::guard("web")->user();
            //     $api = new ApiService("https://localhost:44397");
            //     $sanPhamIds = $api->get("product",[
            //         "userId"=>strval($user->_id)
            //     ]); 
            //     $sanPhams = san_pham::whereIn("_id",$sanPhamIds)->get();               
            // }
            // else
            // {
                $sanPhams = SelectHelper::Pagination("san_pham",$request,null,[            
                    "anh_san_phams"=>0,
                    "thong_tin_chi_tiet"=>0,
                    "bi_an"=>0
                ]);
            // }                    
            return Response()->json([
                "success"=>true,
                "data" => $sanPhams['data'] ?? $sanPhams,
                "numpages"=> $sanPhams['numpages'] ?? 0,
                "page"=>$sanPhams['page'] ?? 0,
            ]);
        }
        catch(Exception $e)
        {
            return Response()->json([
                "success"=>false,
                "message"=>"Đã xảy ra lỗi".$e
            ]);
        }
    }
    public function Details($ma_san_pham)
    {             
        return Call::TryCatchResponseJson(function()use($ma_san_pham){
            $sanPham = san_pham::where("_id",$ma_san_pham)
                                ->first();
            $cuaHang = cua_hang::project([
                                    "so_dien_thoai"=>0,
                                    "khuyen_mais"=>0
                                ])
                                ->where("_id",$sanPham->cua_hang_id)
                                ->first();         
            if(!isset($sanPham))                                      
                return Response()->json([
                    "success"=>false,
                    "message" => "Sản phẩm này không tồn tại"            
                ],404);                                
            $data = ProductService::getAveragePrice($sanPham);            
            if(Auth::check())
            {
                $user = auth("web")->user();
                if(!$user->checkInteraction($sanPham->_id))
                {
                    $tuong_tac=[
                        "thoi_gian"=>Convert::toUTCDateTime(),
                        "san_pham_id"=>$sanPham->_id,
                        "gia_thap_nhat"=>$data["min"],
                        "gia_cao_nhat"=>$data["max"],
                        "gia_trung_binh"=>$data["average"],
                        "danh_gia_hien_tai"=>$sanPham->danh_gia,
                        "so_luong_danh_gia_hien_tai"=>$sanPham->so_luong_danh_gia,                    
                        "luot_truy_cap_cua_hang_hien_tai"=>$cuaHang->luot_truy_cap
                    ];                
                    if($sanPham->isSale())
                        $tuong_tac["giam_gia_hien_tai"] = $sanPham->giam_gia;                    
                    nguoi_dung::where("_id",$user->_id)
                        ->push("tuong_tacs",$tuong_tac);
                }
            }            
            return Response()->json([
                "success"=>true,
                "data" => [
                    "sanpham"=>$sanPham,
                    "cuahang"=>$cuaHang
                ]            
            ]);
        });                   
    }
    public function ShowProductSales(Request $request)
    {
        try
        {                  
            $idList = [];             
            $sanPhams = $this->GetProductSaleSameQuantitySold();
           
            foreach ($sanPhams as $item) {
                array_push($idList,$item->_id);
            }                    
            $sanPhams = $sanPhams->concat(san_pham::whereNotIn('_id', $idList)
            ->where('ngay_bat_dau', '<=', Carbon::now())
            ->where('ngay_ket_thuc', '>=', Carbon::now())
            ->get());            
            // $sanPhams2 = san_pham::raw(function($collection) use ($idList){
            //     return $collection->aggregate([                    
            //         [
            //             '$lookup' => [
            //                 'from' => 'cua_hang',
            //                 'localField' => 'cua_hang_id',
            //                 'foreignField' => '_id',
            //                 'as' => 'cua_hang_info'
            //             ]
            //         ],    
            //         [
            //             '$match' => [
            //                 '$expr' => [
            //                     '$and' => [
            //                         ['$lte' => ['$ngay_bat_dau', Carbon::now()]],
            //                         ['$gte' => ['$ngay_ket_thuc', Carbon::now()]],                                     
            //                     ]
            //                 ]
            //             ]
            //         ],                
            //         [
            //             '$project' => [
            //                 '_id' => 1,
            //                 'ten_cua_hang'=> 1,
            //                 'cua_hang_id'=>1,
            //                 'ten_san_pham' => 1,
            //                 'anh_bia' => 1,
            //                 'danh_gia' => 1,
            //                 'phan_loais' => 1,
            //                 'giam_gia' => 1,
            //                 'ngay_bat_dau' => 1,
            //                 'ngay_ket_thuc' => 1,
            //                 'so_luong_gioi_han' =>1,                            
            //             ]
            //         ]                        
            //     ]);
            // });
            return  Response()->json($sanPhams->shuffle());
        }
        catch(Exception $e)
        {
            return  Response()->json([
                "success"=>false,
                "massage"=>"Đã xảy ra lỗi".$e->getMessage()
            ],400);
        }
    }
    public function GetProductSaleSameQuantitySold() {
        try
        {
            $currentDate = Carbon::now();        
            $result = don_hang::query()
                ->raw(function ( $collection) use ($currentDate) {
                    return $collection->aggregate([
                        [
                            '$unwind' => '$chi_tiet_don_hangs'
                        ],
                        [
                            '$lookup' => [
                                'from' => 'san_pham',
                                'localField' => 'chi_tiet_don_hangs.san_pham.san_pham_id',
                                'foreignField' => '_id',
                                'as' => 'san_pham_info'
                            ]
                        ],
                        [
                            '$unwind' => [
                                'path' => '$san_pham_info',
                                'preserveNullAndEmptyArrays' => true
                            ]
                        ],
                        [
                            '$lookup'=> [
                              'from'=> "cua_hang",
                              'localField'=> "cua_hang_id",
                              'foreignField'=> "_id",
                              'as'=> "cua_hang_info"
                            ]
                        ],
                        [
                            '$unwind' => [
                                'path' => '$cua_hang_info',
                                'preserveNullAndEmptyArrays' => true
                            ]
                        ],  
                        [
                            '$match' => [
                                '$expr' => [
                                    '$and' => [
                                        ['$gte' => ['$ngay_dat_hang', '$san_pham_info.ngay_bat_dau']],
                                        ['$lte' => ['$ngay_dat_hang', '$san_pham_info.ngay_ket_thuc']],
                                        ['$gte' => ['$san_pham_info.ngay_ket_thuc', Carbon::now()]],
                                    ]
                                ]
                            ]
                        ],
                        [
                            '$group' => [
                                '_id' => '$san_pham_info._id',
                                'ten_cua_hang'=> ['$first'=> '$cua_hang_info.ten_cua_hang'],
                                'cua_hang_id'=> ['$first'=> '$cua_hang_id'],
                                'ten_san_pham' => ['$first' => '$san_pham_info.ten_san_pham'],
                                'anh_bia' => ['$first' => '$san_pham_info.anh_bia'],
                                'danh_gia' => ['$first' => '$san_pham_info.danh_gia'],
                                'so_luong_danh_gia' => ['$first' => '$san_pham_info.so_luong_danh_gia'],
                                'phan_loais' => ['$first' => '$san_pham_info.phan_loais'],
                                'giam_gia' => ['$first' => '$san_pham_info.giam_gia'],
                                'ngay_bat_dau' => ['$first' => '$san_pham_info.ngay_bat_dau'],
                                'ngay_ket_thuc' => ['$first' => '$san_pham_info.ngay_ket_thuc'],
                                'so_luong_gioi_han' => ['$first' => '$san_pham_info.so_luong_gioi_han'],
                                'so_luong_da_mua_khi_khuyen_mai' => ['$sum' => '$chi_tiet_don_hangs.so_luong']
                            ]
                        ]                        
                    ]);
                });        
            return $result;
        }
        catch(Exception $e)
        {
            return null;
        }
    }

}
