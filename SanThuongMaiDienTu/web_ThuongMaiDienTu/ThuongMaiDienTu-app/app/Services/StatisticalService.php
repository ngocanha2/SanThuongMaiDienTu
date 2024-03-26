<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Requests\RegisterRequest;
use App\Models\cua_hang;
use App\Models\don_hang;
use App\Models\nguoi_dung;
use App\Models\san_pham;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Session;

class StatisticalService 
{    
    var $batDau;
    var $ketThuc;
    var $loaiMoc;
    var $datas;

    //hàm này hiện ko coàn dùng
    public function getOrderDetailsWithProductId($storeId,$productId,$startTime,$endTime)
    {
        return don_hang::where('cua_hang_id', Convert::ObjectId($storeId))
                        ->aggregate([
                            [
                                '$unwind' => '$chi_tiet_don_hangs',
                            ],
                            [
                                '$match' => [
                                    'chi_tiet_don_hangs.san_pham.san_pham_id' => Convert::ObjectId($productId),
                                    '$and' => [
                                        [
                                            'ngay_dat_hang' => [
                                                '$gte' => Convert::toUTCDateTime($startTime),
                                            ],
                                        ],
                                        [
                                            'ngay_dat_hang' => [
                                                '$lte' => Convert::toUTCDateTime($endTime),
                                            ],
                                        ],
                                    ],
                                ],
                            ],
                        ])->get();
    }
    public function getTotalMoneyOrders($storeId,$startTime,$endTime)
    {        
        // return Convert::toCarbonFromTimestampMs(Convert::toUTCDateTime($startTime));
        return don_hang::raw(function ($collection) use ($storeId,$startTime,$endTime) {
            return $collection->aggregate([
                [
                    '$match' => [
                        '$and' => [
                            [
                                'cua_hang_id'=>Convert::ObjectId($storeId)
                            ],
                            [
                                'ngay_dat_hang' => [
                                    '$gte' => Convert::toUTCDateTime($startTime),
                                ],
                            ],
                            [
                                'ngay_dat_hang' => [
                                    '$lte' => Convert::toUTCDateTime($endTime),
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    '$group' => [
                        '_id' => '$cua_hang_id',
                        'tong_thanh_tien' => [
                            '$sum' => '$thanh_tien',
                        ],
                    ],
                ],
            ]);
        })->first();            
    }
    public function getTotalMoneyOrdersWithProductId($storeId,$productId,$startTime,$endTime)
    {
        return don_hang::raw(function ($collection) use ($storeId,$productId,$startTime,$endTime) {
            return $collection->aggregate([
                [
                    '$unwind' => '$chi_tiet_don_hangs',
                ],
                [
                    '$match' => [
                        '$and' => [
                            [
                                'cua_hang_id'=>Convert::ObjectId($storeId)
                            ],
                            [
                                'chi_tiet_don_hangs.san_pham.san_pham_id' => Convert::ObjectId($productId),
                            ],
                            [
                                'ngay_dat_hang' => [
                                    '$gte' => Convert::toUTCDateTime($startTime),
                                ],
                            ],
                            [
                                'ngay_dat_hang' => [
                                    '$lte' => Convert::toUTCDateTime($endTime),
                                ],
                            ],                           
                        ],
                    ],
                ],
                [
                    '$group' => [
                            '_id'=>'$cua_hang_id',                                    
                            'tong_thanh_tien' => [
                                '$sum' => ['$multiply' => ['$chi_tiet_don_hangs.don_gia', '$chi_tiet_don_hangs.so_luong']],
                        ],
                    ],
                ],
            ]);
        })->first();                    
    }

    public function handle($store,$batDau, $ketThuc,$productId = null)
    {                
        // $batDau = Carbon::parse($batDau);
        // $ketThuc = Carbon::parse($ketThuc); 
        // return        
        $soNgay = $ketThuc->diffInDays($batDau);
        // $orders = don_hang::where("cua_hang_id",$store->_id)->get();        
        // $ctdhs = null;
        // if ($productId != null)
        //     $ctdhs = $this->getOrderDetailsWithProductId($store->_id,$productId,$batDau, $ketThuc);
        $datas = [];
        $buocnhay = null;
        $loaiMoc = null;
        if ($soNgay < 31)
        {
            $buocnhay = 1;
            $loaiMoc = "Ngay";
        }
        else if ($soNgay < 100)
        {
            $buocnhay = 10;
            $loaiMoc = "Ngays";
        }
        else if ($soNgay < 366)
        {
            $buocnhay = 30;
            $loaiMoc = "Thang";
        }
        else if ($soNgay < 1096)
        {
            $buocnhay = 100;
            $loaiMoc = "Ngayss";
        }
        else
        {
            $buocnhay = 365;
            $loaiMoc = "Nam";
        }
        $batDau->addDays(-$buocnhay);
        $moc = Carbon::parse($batDau);  
        for ($i = 0; $i < $soNgay && $batDau->addDays($buocnhay)->lte($ketThuc); $i += $buocnhay)
        {                       
            // $batDau = $batDau->addDays($i);
            // return Carbon::parse($batDau->toDateString());
            $cotmoc = $batDau->toDateString();            
            $cuahang = $this->getTotalMoneyOrders($store->_id,Carbon::parse($moc->toDateString()),Carbon::parse($batDau->toDateString())); 
            // if(isset($cuahang))
            $cuahang  = $cuahang["tong_thanh_tien"] ?? 0; 
            $sanpham = null;
            if ($productId != null)
            {
                $sanpham = $this->getTotalMoneyOrdersWithProductId($store->_id,$productId,Carbon::parse($moc->toDateString()),Carbon::parse($batDau->toDateString()));            
                // if(isset($sanpham))
                $sanpham  = $sanpham["tong_thanh_tien"] ?? 0;
            }
            array_push($datas,[
                $loaiMoc=>$cotmoc,
                "Lượt truy cập"=>null,
                "Sản phẩm"=>$sanpham,
                "Cửa hàng"=>$cuahang
            ]);                  
            $moc = Carbon::parse($batDau);
        }        
        $cuahang = $this->getTotalMoneyOrders($store->_id,Carbon::parse($batDau->toDateString()),Carbon::parse($ketThuc->toDateString()));
        // if(isset($cuahang))
        $cuahang  = $cuahang["tong_thanh_tien"] ?? 0; 
        $sanpham = null;
        if ($productId != null)
            {
                $sanpham = $this->getTotalMoneyOrdersWithProductId($store->_id,$productId,Carbon::parse($batDau->toDateString()),Carbon::parse($ketThuc->toDateString()));
                // if(isset($sanpham))
                $sanpham  = $sanpham["tong_thanh_tien"] ?? 0;
            }
        array_push($datas,[
            $loaiMoc=>$ketThuc->toDateString(),
            "Lượt truy cập"=>null,
            "Sản phẩm"=>$sanpham,
            "Cửa hàng"=>$cuahang
        ]);                
        return [
            "data"=>$datas,
            "loaimoc"=>$loaiMoc,
            "store"=>$store,
        ];
    }
}


