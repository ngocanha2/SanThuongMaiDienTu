<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Models\cua_hang;
use App\Models\don_hang;
use App\Models\nguoi_dung;
use App\Models\phuong_thuc_thanh_toan;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Session;

class  OrderService 
{    
    public static function getOrdersPersonal($status = 0)
    {        
        $nguoi_dung_id = Auth::guard("web")->user()->_id;           
        $result = don_hang::raw(function ($collection) use($nguoi_dung_id,$status) {
            $aggregate = [                
                ['$match' => [
                    'nguoi_dung_id' => Convert::ObjectId($nguoi_dung_id)
                    ]
                ],               
                ['$unwind' => '$chi_tiet_don_hangs'],
                [
                    '$lookup' => [
                        'from' => 'san_pham',
                        'localField' => 'chi_tiet_don_hangs.san_pham.san_pham_id',
                        'foreignField' => '_id',
                        'as' => 'san_pham_info',
                    ],
                ],
                ['$unwind' => '$san_pham_info'],
                [
                    '$lookup' => [
                        'from' => 'cua_hang',
                        'localField' => 'cua_hang_id',
                        'foreignField' => '_id',
                        'as' => 'cua_hang_info',
                    ],
                ],
                ['$unwind' => '$cua_hang_info'],
                [
                    '$group' => [
                        '_id' => '$_id',
                        'cua_hang_id' => ['$first' => '$cua_hang_id'],
                        'ten_cua_hang' => ['$first' => '$cua_hang_info.ten_cua_hang'],
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
                            ],
                        ],
                    ],
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
    
    public static function getOrderDetails($id)
    {
        try {
            $nguoi_dung_id = Auth::guard("web")->user()->_id;
            $result = OrderService::selectOrder($nguoi_dung_id,$id);
            if( $result)
                return ResponseJson::success($result);
            return ResponseJson::error("Đơn hàng không tồn tại hoặc bạn không có quyền truy cập đơn hàng này");            
        } catch (Exception $e) {
            return ResponseJson::error($e->getMessage());
        }
    }

    public static function selectOrder($nguoi_dung_id,$id)
    {
        return don_hang::raw(function($collection) use($nguoi_dung_id,$id) {
            return $collection->aggregate([
                [
                    '$match' => [
                        '_id' => Convert::ObjectID($id),
                        'nguoi_dung_id' =>Convert::ObjectID($nguoi_dung_id),
                    ]
                ],
                [
                    '$unwind' => '$chi_tiet_don_hangs',
                ],
                [
                    '$lookup' => [
                        'from' => 'san_pham',
                        'localField' => 'chi_tiet_don_hangs.san_pham.san_pham_id',
                        'foreignField' => '_id',
                        'as' => 'san_pham_info',
                    ],
                ],
                [
                    '$unwind' => '$san_pham_info',
                ],
                [
                    '$lookup' => [
                        'from' => 'cua_hang',
                        'localField' => 'cua_hang_id',
                        'foreignField' => '_id',
                        'as' => 'cua_hang_info',
                    ],
                ],
                [
                    '$unwind' => '$cua_hang_info',
                ],
                [
                    '$group' => [
                        '_id' => '$_id',
                        'cua_hang_id' => ['$first' => '$cua_hang_id'],
                        'ten_cua_hang' => ['$first' => '$cua_hang_info.ten_cua_hang'],
                        'ngay_dat_hang' => ['$first' => '$ngay_dat_hang'],
                        'chi_tiet_don_hangs' => ['$push' => [
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
                        ]],
                        'ma_voucher_cua_hang' => ['$first' => '$ma_voucher_cua_hang'],
                        'vouchers' => ['$first' => '$vouchers'],
                        'phuong_thuc_van_chuyen' => ['$first' => '$phuong_thuc_van_chuyen'],
                        'phuong_thuc_thanh_toan' => ['$first' => '$phuong_thuc_thanh_toan'],
                        'dia_chi_giao_hang' => ['$first' => '$dia_chi_giao_hang'],
                        'trang_thai' => ['$first' => '$trang_thai'],
                        'thanh_tien' => ['$first' => '$thanh_tien'],
                    ],
                ],
            ]);            
        })->first();
    }
    public static function cancelOrder($id, $ly_do)
    {
        return Call::TryCatchResponseJson(function() use ($ly_do, $id){
            $nguoi_dung_id = Auth::guard("web")->user()->_id;
            $don_hang = don_hang::where("_id",$id)->first();
            if(isset($don_hang))
            {                        
                if($don_hang->nguoi_dung_id != $nguoi_dung_id)
                    return ResponseJson::error("Bạn không có quyền truy cập đơn hàng này");
                if(isset($don_hang->trang_thai["Đang giao"]))
                    return ResponseJson::error("Bạn không thể hủy đơn hàng này được nữa");
                $status = isset($don_hang->trang_thai["Đang xử lý"]);
                don_hang::where('_id', Convert::ObjectId($id))
                        ->update([
                            'trang_thai' => [
                                "Đã hủy" =>$ly_do
                            ]
                        ]);                        
                if($status)
                    ProductStoreService::updateQuantityWithOrder($don_hang,true);
                return ResponseJson::success();
            }
            return ResponseJson::error("Đơn hàng không tồn tại");
        });
    }
    public static function getStatusOrder($status)
    {
        switch ($status) {
            case 1:
                return "Chờ xác nhận";
            case 2:
                return "Đang xử lý";
            case 3:
                return "Đang giao";
            case 4:
                return "Đã giao"; 
            // case 5:
            //     return "Đã nhận";   
            case 5:
                return "Đã hủy";
            case 6:
                return "Bị từ chối";                   
            default:
                return null;
        }
    }
    public static function createOrder(Request $request)
    {
        $dataOrder = $request->all();        
        $don_hangs = [];    
        $user = Auth::guard("web")->user(); 
        $so_dia_chi =  nguoi_dung::project([
                            "so_dia_chi"=>1
                        ])->where("_id",$user->_id)        
                        ->first()["so_dia_chi"];  
        $dataVoucherShopbees = [];
        foreach ($dataOrder as $item) {
            $chi_phi["don_hang"] = 0;
            $giam_gia["phuong_thuc_van_chuyen"] = $giam_gia["don_hang"] = 0;
            $don_hang["cua_hang_id"] = Convert::ObjectId($item["_id"]);
            $don_hang["nguoi_dung_id"] = Convert::ObjectId($user->_id);
            $dia_chi_giao_hang = array_filter($so_dia_chi, function ($data) use ($item) {
                return $data['id'] == Convert::ObjectId($item["dia_chi_giao_hang_id"]);
            });
            $dia_chi_giao_hang =  reset($dia_chi_giao_hang);
            // return $dia_chi_giao_hang;
            // $so_dia_chi->contains("id",Convert::ObjectId($item["dia_chi_giao_hang_id"]));
            $don_hang["dia_chi_giao_hang"] = [
                "ten_nguoi_nhan"=>$dia_chi_giao_hang["ten_nguoi_nhan"],
                "dia_chi"=>$dia_chi_giao_hang["dia_chi"],
                "dia_chi_cu_the"=>$dia_chi_giao_hang["dia_chi_cu_the"],
                "so_dien_thoai"=>$dia_chi_giao_hang["so_dien_thoai"],
                "loai_dia_chi"=>$dia_chi_giao_hang["loai_dia_chi"],                
            ];
            $don_hang["ngay_dat_hang"] = Convert::toUTCDateTime();
            $chi_tiet_don_hangs = [];            
            foreach ($item["san_phams"] as $san_pham) {
                $chi_tiet_don_hang["san_pham"]["san_pham_id"] = Convert::ObjectId($san_pham["san_pham"]["san_pham_id"]);
                $chi_tiet_don_hang["don_gia"] = 0;
                if(isset($san_pham["san_pham"]["ten_phan_loai"]))
                {
                    $chi_tiet_don_hang["san_pham"]["ten_phan_loai"] = $san_pham["san_pham"]["ten_phan_loai"];
                    if(isset($san_pham["san_pham"]["ten_kich_co"]))
                    {
                        $chi_tiet_don_hang["san_pham"]["ten_kich_co"] = $san_pham["san_pham"]["ten_kich_co"];
                    }
                }
                $chi_tiet_don_hang["don_gia"] = $san_pham["san_pham"]["gia_hien_tai"];
                $chi_tiet_don_hang["so_luong"] = $san_pham["so_luong"];
                $chi_phi_don_hang = ($chi_tiet_don_hang["don_gia"] * $chi_tiet_don_hang["so_luong"]);
                if(isset($san_pham["san_pham"]["giam_gia"]) && $san_pham["san_pham"]["giam_gia"]>0)
                {
                    $ngay_bat_dau = Convert::toCarbonFromTimestampMs($san_pham["san_pham"]["ngay_bat_dau"]);
                    $ngay_ket_thuc = Convert::toCarbonFromTimestampMs($san_pham["san_pham"]["ngay_ket_thuc"]);
                    $today = Carbon::now();
                    if($ngay_bat_dau <= $today && $ngay_ket_thuc >= $today)                    
                    {
                        $chi_tiet_don_hang["don_gia"] = intval((1 - $san_pham["san_pham"]["giam_gia"]) * $san_pham["san_pham"]["gia_hien_tai"]);
                        if( $san_pham["so_luong"] >  $san_pham["san_pham"]["so_luong_gioi_han"])
                        {
                            $chi_tiet_don_hang["so_luong"] = $san_pham["san_pham"]["so_luong_gioi_han"];
                            $chi_tiet_don_hang["don_gia_phu"] = $san_pham["san_pham"]["gia_hien_tai"];
                            $chi_tiet_don_hang["so_luong_phu"] = $san_pham["so_luong"] - $san_pham["san_pham"]["so_luong_gioi_han"];
                            $chi_phi_don_hang = ($chi_tiet_don_hang["don_gia"] * $chi_tiet_don_hang["so_luong"]) + ($chi_tiet_don_hang["don_gia_phu"] * $chi_tiet_don_hang["so_luong_phu"]);
                        }                                                                                
                        else
                            $chi_phi_don_hang = ($chi_tiet_don_hang["don_gia"] * $chi_tiet_don_hang["so_luong"]);
                    }
                    // else
                    //     $chi_tiet_don_hang["don_gia"] = $san_pham["san_pham"]["gia_hien_tai"];
                }
                // else
                //     $chi_tiet_don_hang["don_gia"] = $san_pham["san_pham"]["gia_hien_tai"];                                                                


                $chi_phi["don_hang"] += $chi_phi_don_hang;
                array_push($chi_tiet_don_hangs, $chi_tiet_don_hang);
            }
            $don_hang["chi_tiet_don_hangs"] = $chi_tiet_don_hangs;                             
            $don_hang["trang_thai"]["Chờ xác nhận"] = Convert::toUTCDateTime();
            if(isset($item["loi_nhan"]))
                $don_hang["loi_nhan"] = $item["loi_nhan"];
            if(isset($item["ma_voucher_cua_hang"]))
            {
                $don_hang["ma_voucher_cua_hang"] = $item["ma_voucher_cua_hang"];
                $voucherShop = cua_hang::raw(function ($collection) use ($don_hang){
                    return $collection->aggregate([
                        ['$match' => [
                            '_id' => $don_hang["cua_hang_id"]
                        ]],
                        ['$unwind' => '$khuyen_mais'],
                        ['$match' => [
                            'khuyen_mais.ma_khuyen_mai' => $don_hang["ma_voucher_cua_hang"]
                        ]],
                        ['$project'=>[
                            "khuyen_mais"=>1
                        ]]
                        ]);
                    })->first()["khuyen_mais"];                
                if($voucherShop["so_luong"]-1 < 1)
                    return ResponseJson::failed("Mã voucher của cửa hàng ".$item["ten_cua_hang"]." không còn lượt sử dụng!!!");
                VoucherStoreService::updateQuantityVoucher($don_hang["cua_hang_id"],$don_hang["ma_voucher_cua_hang"],$voucherShop["so_luong"]-1);
                $giam_gia["don_hang"] = intval($chi_phi["don_hang"]*$voucherShop["ty_le_giam_gia"]);
                $giam_gia["don_hang"] = (($giam_gia["don_hang"] > $voucherShop["muc_giam_toi_da"]) ? $voucherShop["muc_giam_toi_da"] : $giam_gia["don_hang"]);
                
            }         
            $phuong_thuc_thanh_toan = phuong_thuc_thanh_toan::where("_id",Convert::ObjectId($item["phuong_thuc_thanh_toan_id"]))->first();
            $don_hang["phuong_thuc_thanh_toan"] = $phuong_thuc_thanh_toan["ten_phuong_thuc_thanh_toan"];
            $phuong_thuc_van_chuyen = ShippingMethodService::get(Convert::ObjectId($item["phuong_thuc_van_chuyen_id"]));
            $don_hang["phuong_thuc_van_chuyen"] = [
                "ten_phuong_thuc_van_chuyen" => $phuong_thuc_van_chuyen["ten_phuong_thuc_van_chuyen"],
                "thoi_gian_uoc_tinh" => $phuong_thuc_van_chuyen["thoi_gian_uoc_tinh"],
                "chi_phi" => $phuong_thuc_van_chuyen["chi_phi"],
                "dong_kiem" => $phuong_thuc_van_chuyen["dong_kiem"],
            ];
            $don_hang["phi_van_chuyen"] =  $phuong_thuc_van_chuyen["chi_phi"];
            $chi_phi["phuong_thuc_van_chuyen"] = $phuong_thuc_van_chuyen["chi_phi"];            
            if(isset($item["vouchers"]))    
            {
                $don_hang["vouchers"] = $item["vouchers"];                
                foreach ($don_hang["vouchers"] as $shopbeeVoucherCode) {
                    $shopbeeVoucher = VoucherShopbeeService::getShopbeeVoucherType($shopbeeVoucherCode); 
                    array_push($dataVoucherShopbees,$shopbeeVoucher);                   
                    if($shopbeeVoucher["vouchers"]["so_luong"]-1 < 1)
                        return ResponseJson::failed("Mã voucher của shopbee không còn lượt sử dụng!!!");                    
                    $discount = intval($chi_phi[$shopbeeVoucher["loai_chi_phi_ap_dung"]] * $shopbeeVoucher["vouchers"]["ty_le_giam_gia"]);                    
                    $giam_gia[$shopbeeVoucher["loai_chi_phi_ap_dung"]] += ($discount > $shopbeeVoucher["vouchers"]["muc_giam_toi_da"]) ? $shopbeeVoucher["vouchers"]["muc_giam_toi_da"] : $discount;                                        
                }
            }                                
            $don_hang["giam_gia"] = $giam_gia; 
            $thanh_tien = 0;                                                        
            foreach ($giam_gia as $key => $value) {
                $thanh_tien+=($chi_phi[$key] - $value); 
            }
            $don_hang["thanh_tien"] = $thanh_tien;
            array_push($don_hangs,$don_hang);
        }        
        // return ResponseJson::failed(data:$don_hangs,statusCode:400); 
        don_hang::insert($don_hangs);
        foreach ($don_hangs as $don_hang) {
            if(isset($don_hang["ma_voucher_cua_hang"]))
                VoucherStoreService::updateQuantityVoucherMinus($don_hang["cua_hang_id"],$don_hang["ma_voucher_cua_hang"],1);            
        }
        foreach ($dataVoucherShopbees as $voucher) {
            VoucherShopbeeService::updateQuantityShopbeeVoucherMinus($voucher->_id,$voucher["vouchers"]["ma_voucher"],1);
        }        
        Session::forget(config("app.DATA_ORDER"));
        Session::put("orderSuccess",true);
        return ResponseJson::success();       
    }
}
