<?php

namespace App\Services;

use App\Helpers\ResponseJson;
use App\Models\cua_hang;
use App\Models\nguoi_dung;
use App\Models\san_pham;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;
use PHPUnit\Framework\Constraint\IsInstanceOf;

class CartService 
{    
    public static function deleteProductFromCart(Request $request)
    {
        $user = Auth::user();        
        if($user)
        {                                                      
            nguoi_dung::where('_id', Convert::ObjectId($user->_id))
                    ->pull('gio_hang', [
                        'san_pham.san_pham_id' => Convert::ObjectId($request->san_pham['san_pham_id']),
                        "san_pham.ten_phan_loai" =>$request->san_pham['ten_phan_loai'] ?? null,
                        "san_pham.ten_kich_co" => $request->san_pham['ten_kich_co'] ?? null,
                    ]);  
            return ResponseJson::success($request->san_pham);                              
        }   
        else
        {                            
            $carts = Session::get(config('app.CART_NAME'));                    
            if(!isset($carts))
                return ResponseJson::failed("Giỏ hàng không tồn tại");
            else
            {    
                for($i = 0; $i< count($carts);$i++)                                                                                 
                {  
                    $item = &$carts[$i];
                    for($j = 0; $j< count($item['san_phams']);$j++)                         
                    {  
                        $san_pham = &$item['san_phams'][$j];                                                                                      
                        if($san_pham['san_pham']['san_pham_id'] == new ObjectId($request->san_pham['san_pham_id']['$oid']) &&
                        (!isset($san_pham['san_pham']['ten_phan_loai']) || ($san_pham['san_pham']['ten_phan_loai'] == $request->san_pham['ten_phan_loai'] &&
                                                                            (!isset($san_pham['san_pham']['ten_kich_co']) ||$san_pham['san_pham']['ten_kich_co']==$request->san_pham['ten_kich_co']))))
                        {                                                                                                                               
                            array_splice($item['san_phams'], $j, 1);                            
                            if(count($item['san_phams']) == 0)
                            {
                                array_splice($carts, $i, 1);
                                if(count($carts)==0)
                                    Session::forget(config('app.CART_NAME'));
                                else
                                    Session::put(config('app.CART_NAME'), $carts);                                   
                            }                                                
                            else
                                Session::put(config('app.CART_NAME'), $carts);    
                            return ResponseJson::success();                                                                                                                                                             
                        }
                    }                                                   
                }                
            }                                                     
        } 
        return ResponseJson::failed("Không tìm thấy sản phẩm");
    }

    public static function deleteProductFromCartWithShop($cua_hang_id)
    {        
        $user = Auth::user();
        $san_phams = CartService::getIdProductsFromCartWithShop($user->_id,$cua_hang_id);
        foreach ($san_phams as $san_phams_id) {
            nguoi_dung::where('_id', Convert::ObjectId($user->_id))
            ->pull('gio_hang', [
                'san_pham.san_pham_id' => Convert::ObjectId($san_phams_id),
            ]); 
        }
        return ResponseJson::success();
    }
    public static function getIdProductsFromCartWithShop($nguoi_dung_id,$cua_hang_id)
    {        
        return nguoi_dung::raw(function ($collection) use ($nguoi_dung_id, $cua_hang_id) {
            return $collection->aggregate([
                [
                    '$match' => [
                        '_id' => Convert::ObjectId($nguoi_dung_id),
                    ],
                ],
                [
                    '$unwind' => '$gio_hang',
                ],
                [
                    '$lookup' => [
                        'from' => 'san_pham',
                        'localField' => 'gio_hang.san_pham.san_pham_id',
                        'foreignField' => '_id',
                        'as' => 'san_pham_info',
                    ],
                ],
                [
                    '$unwind' => '$san_pham_info',
                ],
                [
                    '$match' => [
                        'san_pham_info.cua_hang_id' => Convert::ObjectId($cua_hang_id),
                    ],
                ],
                [
                    '$group' => [
                        '_id' => '$san_pham_info.cua_hang_id',
                        'san_phams' => [
                            '$addToSet' => '$san_pham_info._id',
                        ],
                    ],
                ],
            ]);
        })->first()["san_phams"];
    }

    public static function buildAggregate($item)
    {        
        $aggregate = [];
        $match = [
            '_id' => Convert::ObjectId($item['san_pham']["san_pham_id"]),
        ];
        if (isset($item['san_pham']["ten_phan_loai"]))
        {
            $match['phan_loais.ten_phan_loai'] = $item['san_pham']["ten_phan_loai"];
            if (isset($item['san_pham']["ten_kich_co"]))
                $match['phan_loais.kich_co_phan_loais.ten_kich_co']=$item['san_pham']["ten_kich_co"];
        }
        
        $aggregate =[
            [
                '$unwind' => [
                    'path' => '$phan_loais',
                    'preserveNullAndEmptyArrays' => true,

                ],
            ],
            [
                '$unwind' => [
                    'path' => '$phan_loais.kich_co_phan_loais',
                    'preserveNullAndEmptyArrays' => true,

                ],
            ],
            [
                '$match' => $match
            ],
            [
                '$project' => [
                    '_id'=>0,
                    'san_pham' => [
                        'san_pham_id' => '$_id',
                        'ten_san_pham' => '$ten_san_pham',
                        'danh_muc_id' => '$danh_muc_id',
                        'anh_bia' => '$anh_bia',
                        'so_luong_ton' => '$so_luong_ton',                                                               
                        'ten_phan_loai' => '$phan_loais.ten_phan_loai',
                        'ten_kich_co' => '$phan_loais.kich_co_phan_loais.ten_kich_co',
                        'gia_hien_tai' => [
                            '$cond' => [
                                'if' => '$phan_loais.kich_co_phan_loais.gia_hien_tai',
                                'then' => '$phan_loais.kich_co_phan_loais.gia_hien_tai',
                                'else' => [
                                    '$cond' => [
                                        'if' => '$phan_loais.gia_hien_tai',
                                        'then' => '$phan_loais.gia_hien_tai',
                                        'else' => '$gia_hien_tai',
                                    ],
                                ],
                            ],
                        ],
                        'giam_gia'=>'$giam_gia',
                        'ngay_bat_dau'=>'$ngay_bat_dau',
                        'ngay_ket_thuc'=>'$ngay_ket_thuc', 
                        'so_luong_gioi_han'=> '$so_luong_gioi_han',
                    ],                    
                ],
            ]
        ];
        return $aggregate;            
        }
    public static function getCarts(array $carts) {                  
        $cartsDetails = [];
        foreach ($carts as $shop) {            
            $cua_hang = cua_hang::where("_id",$shop["cua_hang_id"])->first();            
            $item = [
                "_id"=>$cua_hang->_id,
                "ten_cua_hang"=>$cua_hang->ten_cua_hang,
                "anh_dai_dien"=>$cua_hang->anh_dai_dien,
            ];
            $item["san_phams"] = [];
            foreach ($shop['san_phams'] as $product ){
                $san_pham_gio_hang = san_pham::raw(function ($collection) use ($product) {
                    return $collection->aggregate(CartService::buildAggregate($product));
                })->first();
                $san_pham_gio_hang["so_luong"] = $product["so_luong"];
                array_push($item["san_phams"],$san_pham_gio_hang);
            }            
            array_push($cartsDetails,$item);
        }
        return $cartsDetails;            
    }
}