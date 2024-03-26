<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Models\don_hang;
use Illuminate\Support\Facades\Auth;

class  OrderStoreService 
{    
    public static function gets(?int $status = null)
    {
        $cua_hang_id = Auth::guard("store")->user()->_id;        
        $result = don_hang::raw(function ($collection) use($status,$cua_hang_id) {
            $aggregate = [
                [
                    '$match' => [
                        'cua_hang_id' => Convert::ObjectId($cua_hang_id)
                    ]
                ],
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
                    '$unwind' => '$san_pham_info'
                ],
                [
                    '$group' => [
                        '_id' => '$_id',
                        'cua_hang_id' => ['$first' => '$cua_hang_id'],
                        'ngay_dat_hang' => ['$first' => '$ngay_dat_hang'],
                        'thanh_tien' => ['$first' => '$thanh_tien'],
                        'trang_thai' => ['$first' => '$trang_thai'],
                        'chi_tiet_don_hangs' => [
                            '$push' => [
                                'san_pham' => [
                                    'san_pham_id' => '$chi_tiet_don_hangs.san_pham.san_pham_id',
                                    'ten_san_pham' => '$san_pham_info.ten_san_pham',
                                    'anh_bia' => '$san_pham_info.anh_bia',
                                    'ten_phan_loai' => '$chi_tiet_don_hangs.san_pham.ten_phan_loai',
                                    'ten_kich_co' => '$chi_tiet_don_hangs.san_pham.ten_kich_co',
                                ],
                                'don_gia' => '$chi_tiet_don_hangs.don_gia',
                                'so_luong' => '$chi_tiet_don_hangs.so_luong',
                                'don_gia_phu' => '$chi_tiet_don_hangs.don_gia_phu',
                                'so_luong_phu' => '$chi_tiet_don_hangs.so_luong_phu',
                            ]
                        ],
                    ]
                ],                
            ];
            if($status != null)
            {
                $status1 = OrderService::getStatusOrder($status);
                if($status<6)
                {
                    $status2 = OrderService::getStatusOrder($status+1);
                    array_push($aggregate,[
                        '$match'=>[
                            '$and'=>[
                                [
                                    "trang_thai.$status1"=>[
                                        '$ne'=>null
                                    ]
                                ],
                                [
                                    "trang_thai.$status2"=>[
                                        '$eq'=>null
                                    ]
                                ]
                            ]                        
                        ]
                    ]);
                }    
                else
                    array_push($aggregate,[
                        '$match'=>[                            
                            "trang_thai.$status1"=>[
                                '$ne'=>null
                            ]                                                 
                        ]
                    ]);                           
            }
            return $collection->aggregate($aggregate);            
        });
        return ResponseJson::success($result);        
    } 
    public static function details($don_hang_id)
    {
        
        $cua_hang_id = Auth::guard("store")->user()->_id; 
        $results = don_hang::raw(function ($collection) use ($don_hang_id, $cua_hang_id) {
            return $collection->aggregate([
                [
                    '$match' => [
                        '$and' => [
                            ['_id' => Convert::ObjectId($don_hang_id)],
                            ['cua_hang_id' => Convert::ObjectId($cua_hang_id)],
                        ]
                    ]
                ],            
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
                    '$unwind' => '$san_pham_info'
                ],                              
                [
                    '$group' => [
                        '_id' => '$_id',
                        'ngay_dat_hang' => ['$first' => '$ngay_dat_hang'],
                        'chi_tiet_don_hangs' => [
                            '$push' => [
                                'san_pham' => [
                                    'san_pham_id' => '$chi_tiet_don_hangs.san_pham.san_pham_id',
                                    'ten_san_pham' => '$san_pham_info.ten_san_pham',
                                    'anh_bia' => '$san_pham_info.anh_bia',
                                    'ten_phan_loai' => '$chi_tiet_don_hangs.san_pham.ten_phan_loai',
                                    'ten_kich_co' => '$chi_tiet_don_hangs.san_pham.ten_kich_co',
                                ],
                                'don_gia' => '$chi_tiet_don_hangs.don_gia',
                                'so_luong' => '$chi_tiet_don_hangs.so_luong',
                                'don_gia_phu' => '$chi_tiet_don_hangs.don_gia_phu',
                                'so_luong_phu' => '$chi_tiet_don_hangs.so_luong_phu',
                                'danh_gia' => '$chi_tiet_don_hangs.danh_gia',
                            ]
                        ],
                        'ma_voucher_cua_hang' => ['$first' => '$ma_voucher_cua_hang'],
                        'cua_hang_id' => ['$first' => '$cua_hang_id'],
                        'vouchers' => ['$first' => '$vouchers'],
                        'phuong_thuc_van_chuyen' => ['$first' => '$phuong_thuc_van_chuyen'],
                        'phuong_thuc_thanh_toan' => ['$first' => '$phuong_thuc_thanh_toan'],
                        'dia_chi_giao_hang' => ['$first' => '$dia_chi_giao_hang'],
                        'trang_thai' => ['$first' => '$trang_thai'],
                        'thanh_tien' => ['$first' => '$thanh_tien'],
                    ]
                ],
            ]);
        })->first();        
        return ResponseJson::success($results);
    }  
    public static function updateStatus(string $don_hang_id)
    {
        return Call::TryCatchResponseJson(function()use($don_hang_id){
            $don_hang = OrderStoreService::selectOrder($don_hang_id);
            if(isset($don_hang))
            {
                $trang_thai = $don_hang["trang_thai"];
                if(!isset($trang_thai["Đã giao"]))
                {    
                    $trang_thai_moi = "Đã giao"; 
                    if(!isset($trang_thai["Đang giao"]))
                    {
                        if(!isset($trang_thai["Đang xử lý"]))
                        {     
                            if(!isset($trang_thai["Chờ xác nhận"]))
                                return ResponseJson::failed("Không thể cập nhật cho đơn hàng ở trạng thái này");
                            else
                                $trang_thai_moi = "Đang xử lý";
                        }
                        else
                            $trang_thai_moi = "Đang giao";               
                    }
                    don_hang::where("_id",Convert::ObjectId($don_hang_id))
                    ->update([
                        "trang_thai.$trang_thai_moi" => Convert::toUTCDateTime()
                    ]);    
                    
                    if($trang_thai_moi == "Đang xử lý")
                    {
                        ProductStoreService::updateQuantityWithOrder($don_hang);
                    }
                    return ResponseJson::success($trang_thai_moi);                         
                }            
                return ResponseJson::failed("Không thể cập nhật đơn hàng ở trạng thái đã giao");
            }        
            return ResponseJson::error("Đơn hàng không tồn tại hoặc bạn không có quyền truy cập");
        },function($e){            
            return ResponseJson::error("Số lượng sản phẩm trong kho không còn đủ");
        });
    } 
    public static function refuse(string $don_hang_id, $ly_do){        
            $result = OrderStoreService::selectOrder($don_hang_id);            
            if( $result)
            {
                don_hang::where('_id', Convert::ObjectId($don_hang_id))
                        ->update([
                            'trang_thai' => [
                                "Bị từ chối" =>$ly_do
                            ]
                        ]);
                return ResponseJson::success();
            }
            return ResponseJson::error("Đơn hàng không tồn tại hoặc bạn không có quyền truy cập đơn hàng này");
    }
    public static function selectOrder($don_hang_id)
    {
        $cua_hang_id = Auth::guard("store")->user()->_id; 
        return don_hang::where("cua_hang_id",Convert::ObjectId($cua_hang_id))
                ->where("_id",Convert::ObjectId($don_hang_id))->first();
    }
}