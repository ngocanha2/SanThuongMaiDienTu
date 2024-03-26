<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Http\Controllers\Controller;
use App\Models\nguoi_dung;
use App\Models\san_pham;
use App\Services\CartService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;
use MongoDB\BSON\ObjectId;

class CartApiController extends Controller
{
    public function AddProductToCart(Request $request) {                       
        try
        {                       
            $productAdd = [
                'san_pham'=>[
                    'san_pham_id' => new ObjectId($request->input('san_pham_id')),
                    // 'gia_hien_tai' => intval($request->gia_hien_tai),
                    'ten_san_pham' => $request->input('ten_san_pham'),
                    // 'danh_muc_id' => $request->input('danh_muc_id')
                ],
                'so_luong'=> intval($request->input('so_luong_mua'))
            ];
            // if(isset($request->giam_gia))
            // {
            //     $productAdd['san_pham']['giam_gia'] = floatval($request->giam_gia);
            //     $productAdd['san_pham']['ngay_bat_dau'] = intval($request->input('ngay_bat_dau'));
            //     $productAdd['san_pham']['ngay_ket_thuc'] = intval($request->input('ngay_ket_thuc'));                
            //     $productAdd['san_pham']['so_luong_gioi_han'] = intval($request->so_luong_gioi_han);
            // }
            if($request->ten_phan_loai)
            {
                $productAdd['san_pham']['ten_phan_loai'] = $request->ten_phan_loai;
                if($request->ten_kich_co)        
                    $productAdd['san_pham']['ten_kich_co'] = $request->ten_kich_co;            
            } 
            $san_pham_chk = san_pham::getProductWithClassify($productAdd['san_pham'],true);                                                               
            $user = Auth::user();                        
            if($user)                                        
                $status = nguoi_dung::addProductToCart($user->_id,$productAdd,$san_pham_chk);                                                                      
            else
            {                                              
                $carts = Session::get(config('app.CART_NAME'));     
                if(isset($carts)) 
                {                                                        
                    foreach ($carts as &$item)                     
                        if($item['cua_hang_id'] == $request->input('cua_hang_id'))
                        {
                            foreach ($item['san_phams'] as &$san_pham)
                                if($san_pham['san_pham']['san_pham_id'] == new ObjectId($request->san_pham_id) &&
                                (!isset($san_pham['san_pham']['ten_phan_loai']) || ($san_pham['san_pham']['ten_phan_loai'] == $request->ten_phan_loai &&
                                                                                    (!isset($san_pham['san_pham']['ten_kich_co']) ||$san_pham['san_pham']['ten_kich_co']==$request->ten_kich_co))))
                                {
                                    $status = san_pham::checkProductAction($san_pham_chk,$san_pham['so_luong'] + $request->so_luong_mua);
                                    if($status == -1)
                                    {
                                        $san_pham['so_luong'] += $request->so_luong_mua;
                                        Session::put(config('app.CART_NAME'), $carts);
                                    }                                                                                                        
                                    return response()->json([
                                        "status" => $status,
                                        "message" => $this->ParstStatusMsgActionProduct($status)          
                                    ]);
                                }
                            $status = san_pham::checkProductAction($san_pham_chk,$request->so_luong_mua);                                  
                            if($status == -1)                            
                            {
                                array_push($item['san_phams'],$productAdd);                                                                                                                                           
                                Session::put(config('app.CART_NAME'), $carts);
                            }
                            return response()->json([
                                "status" => $status,
                                "message" => $this->ParstStatusMsgActionProduct($status)          
                            ]);                          
                        }  
                }
                else
                    $carts = array();
                        $status = san_pham::checkProductAction($san_pham_chk,$request->so_luong_mua);        
                        if($status == -1)
                        {
                            $shop = [
                                'cua_hang_id'=>new ObjectId($request->cua_hang_id),
                                // 'ten_cua_hang'=>$request->ten_cua_hang,
                                // 'anh_dai_dien'=>$request->anh_dai_dien,
                                'san_phams'=>[$productAdd]                    
                            ];
                            array_push($carts,$shop);   
                        }                                                                                      
                    Session::put(config('app.CART_NAME'), $carts);                                   
            }    
            return response()->json([
                "status"=>$status,
                "message"=> $this->ParstStatusMsgActionProduct($status)          
            ]);                       
        }catch(Exception $e)
        {            
            return response()->json([
                "status"=>-4,
                "message"=>"Đã xảy ra lỗi!!!"        
            ]);
        }              
    }            
    public function GetCarts()
    {
        try
        {
            $data = [];
            $user = Auth::user();
            if($user)
            {            
                $data = $user->getCarts();
            }
            else
            {                
                $carts = Session::get(config('app.CART_NAME'));
                if(isset($carts))
                    $data = CartService::getCarts($carts);
            }
            return response()->json([
                "success"=>true,
                "data"=>$data
            ]);
        }
        catch(Exception $e)
        {
            return response()->json([
                "success"=>true,
                "message"=>"Đã xảy ra lỗi!!!".$e->getMessage()
            ]);
        }
    }    
    public function UpdateQuantity(Request $request)
    {                  
        try
        {                              
            $user = Auth::user();
            $san_pham_chk = san_pham::getProductWithClassify($request->san_pham); 
            $status = san_pham::checkProductAction($san_pham_chk,$request->so_luong_moi); 
            if($user)
            {                                                      
                if($status == -1)
                {
                    nguoi_dung::updateQuantityProductCart($user->_id,$request->san_pham,$request->so_luong_moi);                    
                }                   
            }   
            else
            {                
                if($status == -1)
                {
                    $carts = Session::get(config('app.CART_NAME'));                    
                    if(!isset($carts))
                        $status = - 5;
                    else
                    {                                                                                     
                        foreach ($carts as &$item) {                           
                            foreach ($item['san_phams'] as &$san_pham) {                                                                                         
                                if($san_pham['san_pham']['san_pham_id'] == new ObjectId($request->san_pham['san_pham_id']['$oid']) &&
                                (!isset($san_pham['san_pham']['ten_phan_loai']) || ($san_pham['san_pham']['ten_phan_loai'] == $request->san_pham['ten_phan_loai'] &&
                                                                                    (!isset($san_pham['san_pham']['ten_kich_co']) ||$san_pham['san_pham']['ten_kich_co']==$request->san_pham['ten_kich_co']))))
                                {                                                                                                   
                                    $san_pham['so_luong'] = intval($request->so_luong_moi);
                                    Session::put(config('app.CART_NAME'), $carts);                                                                                                                                           
                                    return response()->json([
                                        "status" => $status,
                                        "message" => $this->ParstStatusMsgActionProduct($status) 
                                    ]);                                             
                                }
                            }                               
                        }                          
                    }                                      
                }   
            } 
        }catch(Exception $e)
        {
            return response()->json([
                "status"=>-4,
                "message"=>"Đã xảy ra lỗi!!!"
            ]);
        }   
        return response()->json([
            "status"=>$status,
            "message"=> $status != -5 ? $this->ParstStatusMsgActionProduct($status) : "Phiên làm việc đã hết hạn",            
        ]); 
    }

    public function DeleteProduct(Request $request)
    {
        return Call::TryCatchResponseJson(function() use($request){
            return CartService::deleteProductFromCart($request);
        });
    }

    public function DeleteProductWithShop(Request $request)
    {
        return Call::TryCatchResponseJson(function() use($request){
            return CartService::deleteProductFromCartWithShop($request->cua_hang_id);
        });
    }
    private function ParstStatusMsgActionProduct($status)
    {
        return $status == -1 ? "Cập nhật giỏ hàng thành công": ($status == -2 ? "Sản phẩm không còn tồn tại" : ($status == -3 ? "Sản phẩm bị ẩn" : "Sản phẩm vượt quá số lượng tồn"));
    }
}
