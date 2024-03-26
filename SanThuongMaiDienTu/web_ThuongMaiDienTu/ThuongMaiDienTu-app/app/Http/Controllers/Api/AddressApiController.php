<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Models\nguoi_dung;
use App\Services\AddressService;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AddressApiController extends Controller
{
    public function GetAddressAll()
    {        
        try
        {
            $user = Auth::user();
            if($user)
            {
                $data = nguoi_dung::project([
                    "so_dia_chi"=>1
                ])->where("_id",$user->_id)->first()["so_dia_chi"];
                $status = 1;
                if(!isset($data))
                    $data = [];
                return response()->json([
                    "status"=>$status, 
                    "data"=>$data                   
                ]);        

            }   
        } 
        catch(Exception $e)
        {
            return response()->json([
                "status"=>-1,                    
            ]);
        } 
    }
    public function SetDefault(string $id)
    {          
        return Call::TryCatchResponseJson(function() use ($id){
            return AddressService::setDefault($id);
        });
    }
    public function Delete(string $id)
    {
        return AddressService::delete($id);
    }
    public function Insert(Request $request)
    {        
        return AddressService::insert($request);
    }
    public function Update(string $id, Request $request)
    {
        return AddressService::update($id,$request);
    }
}
