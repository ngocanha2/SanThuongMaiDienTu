<?php

namespace App\Services;

use App\Helpers\Call;
use App\Helpers\ResponseJson;
use App\Models\nguoi_dung;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Throwable;

class AddressService  
{    
    public static function setDefault($id)
    {               
        try
        {
            $nguoi_dung_id = Auth::guard("web")->user()->_id;                     
            $dia_chi = AddressService::getAddress($id,$nguoi_dung_id);                        
            if($dia_chi != null)
            {
                AddressService::updateDefault('mac_dinh', true,$nguoi_dung_id,false);
                AddressService::updateDefault('id', Convert::ObjectId($id),$nguoi_dung_id,true);                   
                return ResponseJson::success();
            }   
            else
                return ResponseJson::error("Địa chỉ không tồn tại"); 
        }   
        catch(Exception $e)
        {
            return ResponseJson::error($e->getMessage()); 
        }                                                   
    }
    public static function getAddress(string $dia_chi_id, mixed $nguoi_dung_id = null)
    {
        $nguoi_dung_id = $nguoi_dung_id ?? Auth::guard("web")->user()->_id;     
        
        return nguoi_dung::raw(function ($collection) use($dia_chi_id, $nguoi_dung_id) {
            return $collection->aggregate([
                [
                    '$unwind' => '$so_dia_chi'
                ],
                [
                    '$match' => [
                        '_id' =>  Convert::ObjectId($nguoi_dung_id),
                        'so_dia_chi.id' => Convert::ObjectId($dia_chi_id)
                    ]
                ],
                [
                    '$project' => [
                        'so_dia_chi' => 1
                    ]
                ]
            ]);
        })->first()["so_dia_chi"];
    }
    public static function updateDefault($whereKey,$whereValue, ?string $nguoi_dung_id,?bool $default = true)
    {
        $nguoi_dung_id = $nguoi_dung_id ?? Auth::guard("web")->user()->_id;      
        nguoi_dung::where('_id', Convert::ObjectId($nguoi_dung_id))
                        ->where("so_dia_chi.$whereKey", $whereValue)
                        ->update([
                            'so_dia_chi.$.mac_dinh' => $default
                        ]);
    }
    public static function delete(string $id)
    {
        try {
            // $user = nguoi_dung::where("_id",Auth::guard("web")->user()->_id)->first();                     
            // foreach($user['so_dia_chi'] as $dia_chi) {                                                                                
            //     if($dia_chi['id'] == Convert::ObjectId($id))
            //     {                                       
            //         $user['so_dia_chi']->dele ($dia_chi);                    
            //         return ResponseJson::success($user); 
            //         if(count($user['so_dia_chi'])>0)
            //         {
            //             $user['so_dia_chi'][0]["mac_dinh"]=true;
            //         }
            //         $user->save();
            //         return ResponseJson::success();
            //     }
            // }

            $nguoi_dung_id = Auth::guard("web")->user()->_id;
            $dia_chi = AddressService::getAddress($id,$nguoi_dung_id);            
            if($dia_chi)
            {
                nguoi_dung::where('_id', Convert::ObjectId($nguoi_dung_id))
                    ->pull('so_dia_chi', ['id' => Convert::ObjectId($id)]); 
                $data = null;                   
                if($dia_chi['mac_dinh'] == true)     
                {
                    $query = nguoi_dung::where('_id', Convert::ObjectId($nguoi_dung_id))
                        ->whereNotNull('so_dia_chi');                    
                    if($query->count()>0 && count($query->first()['so_dia_chi'])>0)
                    {
                        $query->update([
                                'so_dia_chi.0.mac_dinh' => true
                            ]);
                        $data = $query->first()['so_dia_chi'][0]['id'];
                    }
                }           
                return ResponseJson::success($data);
            }
            else
                ResponseJson::error("Địa chỉ này không tồn tại hoạc bạn không có quyền truy cập",403);
        } catch (Exception $th) {
            return ResponseJson::error($th->getMessage());
        }
    }
    public static function insert(Request $request)
    {
        try
        {            
            $nguoi_dung_id = Auth::guard("web")->user()->_id;  
            $thuoc_tinh_dia_chi = $request->input("dia_chi");
            if(!isset($thuoc_tinh_dia_chi))          
                return ResponseJson::error("Địa chỉ không được để trống");
            $dia_chi = AddressService::buildAddress($request);  
            $so_dia_chi = nguoi_dung::where("_id",$nguoi_dung_id)->first()["so_dia_chi"]; 
            $single = false; 
            if(!isset($so_dia_chi)||count($so_dia_chi)==0)
            {
                $dia_chi['mac_dinh'] = true;            
                $single = true;
            }
            if(!$single && $dia_chi['mac_dinh'] == true)  
                AddressService::updateDefault('mac_dinh', true,$nguoi_dung_id,false);
            nguoi_dung::where('_id', Convert::ObjectId($nguoi_dung_id))                    
                    ->push([
                        'so_dia_chi' => $dia_chi
                    ]);                                                                              
            return ResponseJson::success($dia_chi);
        }
        catch(Exception $e)
        {
            return ResponseJson::error($dia_chi);
        }
    }
    public static function update(string $id,Request $request)
    {
        try
        {
            $nguoi_dung_id = Auth::guard("web")->user()->_id;
            $dia_chi = AddressService::getAddress($id,$nguoi_dung_id);            
            if($dia_chi)
            {
                
                $dia_chi = AddressService::buildAddress($request,$id);
                if($dia_chi['mac_dinh'] == true)  
                    AddressService::updateDefault('mac_dinh', true,$nguoi_dung_id,false);
                nguoi_dung::where('_id', Convert::ObjectId($nguoi_dung_id))
                        ->where("so_dia_chi.id", Convert::ObjectId($id))
                        ->update([
                            'so_dia_chi.$' => $dia_chi
                        ]);                                                                              
                return ResponseJson::success();
            }
            else
                ResponseJson::error("Địa chỉ này không tồn tại hoạc bạn không có quyền truy cập",403);
        }
        catch(Exception $e)
        {
            return ResponseJson::error($e->getMessage());
        }
    }
    public static function buildAddress(Request $request, mixed $id =null)
    {
        return [
            "id"=>Convert::ObjectId($id),
            "ten_nguoi_nhan"=>$request->input("ten_nguoi_nhan"),
            "dia_chi"=>$request->input("dia_chi"),
            "dia_chi_cu_the"=>$request->input("dia_chi_cu_the"),
            "so_dien_thoai"=>$request->input("so_dien_thoai"),
            "loai_dia_chi"=>$request->input("loai_dia_chi"),
            "ghi_chu"=>$request->input("ghi_chu"),
            "mac_dinh"=>$request->input("mac_dinh") == "on" ? true:false,
        ];
    }
}