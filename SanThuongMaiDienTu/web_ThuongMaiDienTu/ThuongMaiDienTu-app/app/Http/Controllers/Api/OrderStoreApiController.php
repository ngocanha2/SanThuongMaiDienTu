<?php

namespace App\Http\Controllers\Api;

use App\Helpers\Call;
use App\Http\Controllers\Controller;
use App\Services\OrderStoreService;
use Illuminate\Http\Request;

class OrderStoreApiController extends Controller
{
    public function Gets(?int $status = null)
    {        
        return Call::TryCatchResponseJson(function() use($status){
            return OrderStoreService::gets($status);
        });        
    }
    public function Deiails(string $don_hang_id)
    {
        return Call::TryCatchResponseJson(function() use($don_hang_id){
            return OrderStoreService::details($don_hang_id);
        });  
    }
    public function UpdateStatus(string $don_hang_id)
    {
        return Call::TryCatchResponseJson(function() use($don_hang_id){
            return OrderStoreService::updateStatus($don_hang_id);
        }); 
    }
    public function Refuse(string $don_hang_id, Request $request)
    {
        return Call::TryCatchResponseJson(function() use($don_hang_id,$request){
            return OrderStoreService::refuse($don_hang_id,$request->ly_do);
        }); 
    }
}
