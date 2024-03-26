<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Models\cua_hang;
use App\Models\san_pham;
use App\Services\Convert;
use App\Services\ProductStoreService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProductStoreApiController extends Controller
{
    public function getProductForStore(?string $cua_hang_id = null)
    {
        try
        {        
            if(!$cua_hang_id)
            {
                $user = Auth::guard("store")->user();
                $cua_hang_id = $user->_id;                
            }
                $data = san_pham::where("cua_hang_id",Convert::ObjectId($cua_hang_id));
                $data = ($cua_hang_id ? $data->where(function($query){
                                                        return $query->whereNull("bi_xoa")->orWhere("bi_xoa",false);
                                                    })
                                            ->where(function($query){
                                                        return $query->whereNull("bi_an")->orWhere("bi_an",false);
                                                    }) : $data)
                                            ->get();            
                return response()->json([
                    "success"=>true,
                    "data"=>$data
                ]);            
        }
        catch(Exception $e)
        {}
        return response()->json([
            "success"=>false            
        ]);
    }
    public function create(Request $request)
    {
        try
        {               
            $_id =  Convert::ObjectId();
            $san_pham = ProductStoreService::buildProductByRequest($request,$_id);
            $san_pham["_id"] = $_id;                                          
            san_pham::insert($san_pham);     
            return response()->json([
                "success"=>true
            ]);                             
        }
        catch(Exception $e)
        {
            return response()->json([
                $e->getMessage()     
            ]);
        }        
    }
    public function update( Request $request,$san_pham_id)
    {                
        return Call::TryCatchResponseJson(function()use($san_pham_id,$request){
            return ProductStoreService::update($san_pham_id,$request);
        });
    }
}
