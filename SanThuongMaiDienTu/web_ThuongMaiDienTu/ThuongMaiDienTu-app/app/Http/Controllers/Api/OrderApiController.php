<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Http\Controllers\Controller;
use App\Services\OrderService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Session;

class OrderApiController extends Controller
{
    public function PostDataOrder(Request $request)
    {
        try{
            $status = 1;
            Session::put(config("app.DATA_ORDER"),$request->all());
            if(!Auth::check())            
            {
                $status = 0;
                Session::put(config("app.PREVIOUS_URL"),route('checkout'));           
            }
            return response()->json([
                "status"=>$status,                          
            ]);
        }
        catch(Exception $e)
        {
            return response()->json([
                "status"=>-1
            ]);
        }
    }
    public function GetDataOrder()
    {        
        try{                        
            if(Session::has(config("app.DATA_ORDER")))
            {                                
                return response()->json([
                    "status"=>1,
                    "data"=>Session::get(config("app.DATA_ORDER"))
                ]);           
            }
            return response()->json([
                "status"=>0                
            ]);
        }
        catch(Exception $e)
        {
            return response()->json([
                "status"=>-1
            ]);
        }
    }
    public function Create(Request $request)
    {
        return Call::TryCatchResponseJson(function() use($request)
        {
            return OrderService::createOrder($request);
        });
    }
}
