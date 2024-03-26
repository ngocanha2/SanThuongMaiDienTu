<?php

namespace App\Models;

use App\Services\Convert;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Support\Arr;

use Illuminate\Support\Facades\DB;

use Jenssegers\Mongodb\Auth\User as Authenticatable;
use MongoDB\BSON\ObjectId;


use function PHPUnit\Framework\isEmpty;

class nguoi_dung extends Authenticatable
{
    use HasFactory;
    protected $collection = 'nguoi_dung';
    protected $username = 'ten_dang_nhap'; 
    protected $password = 'mat_khau';
    protected $fillable = [
        "_id",            
        "ten_dang_nhap",
        "ho_ten",
        "so_dien_thoai",
        "email",
        "ngay_sinh",
        "gioi_tinh",
        'mat_khau',
        'ngay_tao',
    ];
    public function getCarts() {     
        $objectId = new ObjectId($this->id);
        $data = DB::collection('nguoi_dung');
        $data = nguoi_dung::raw(function ($collection) use ($objectId) {
            return $collection->aggregate([
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
                        '_id' => $objectId,
                    ],
                ],
                [
                    '$unwind' => [
                        'path' => '$san_pham_info.phan_loais',
                        'preserveNullAndEmptyArrays' => true,
                    ],
                ],
                [
                    '$match' => [
                        '$expr' => [
                            '$or' => [
                                [
                                    '$eq' => [
                                        '$san_pham_info.phan_loais.ten_phan_loai',
                                        null,
                                    ],
                                ],
                                [
                                    '$eq' => [
                                        '$san_pham_info.phan_loais.ten_phan_loai',
                                        '$gio_hang.san_pham.ten_phan_loai',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    '$unwind' => [
                        'path' => '$san_pham_info.phan_loais.kich_co_phan_loais',
                        'preserveNullAndEmptyArrays' => true,
                    ],
                ],
                [
                    '$match' => [
                        '$expr' => [
                            '$or' => [
                                [
                                    '$eq' => [
                                        '$san_pham_info.phan_loais.kich_co_phan_loais',
                                        null,
                                    ],
                                ],
                                [
                                    '$eq' => [
                                        '$san_pham_info.phan_loais.kich_co_phan_loais.ten_kich_co',
                                        '$gio_hang.san_pham.ten_kich_co',
                                    ],
                                ],
                            ],
                        ],
                    ],
                ],
                [
                    '$lookup' => [
                        'from' => 'cua_hang',
                        'localField' => 'san_pham_info.cua_hang_id',
                        'foreignField' => '_id',
                        'as' => 'cua_hang_info',
                    ],
                ],
                [
                    '$unwind' => '$cua_hang_info',
                ],
                [
                    '$group' => [
                        '_id' => '$san_pham_info.cua_hang_id',
                        'ten_cua_hang' => ['$first' => '$cua_hang_info.ten_cua_hang'],
                        'anh_dai_dien' => ['$first' => '$cua_hang_info.anh_dai_dien'],
                        'san_phams' => [
                            '$push' => [
                                'san_pham' => [
                                    'san_pham_id' => '$gio_hang.san_pham.san_pham_id',
                                    'ten_san_pham' => '$san_pham_info.ten_san_pham',
                                    'danh_muc_id' => '$san_pham_info.danh_muc_id',
                                    'anh_bia' => '$san_pham_info.anh_bia',
                                    'so_luong_ton' => '$san_pham_info.so_luong_ton',                                   
                                    //'phan_loai' => '$san_pham_info.phan_loais',
                                    'ten_phan_loai' => '$gio_hang.san_pham.ten_phan_loai',
                                    'ten_kich_co' => '$gio_hang.san_pham.ten_kich_co',
                                    'gia_hien_tai' => [
                                        '$cond' => [
                                            'if' => '$san_pham_info.phan_loais.kich_co_phan_loais.gia_hien_tai',
                                            'then' => '$san_pham_info.phan_loais.kich_co_phan_loais.gia_hien_tai',
                                            'else' => [
                                                '$cond' => [
                                                    'if' => '$san_pham_info.phan_loais.gia_hien_tai',
                                                    'then' => '$san_pham_info.phan_loais.gia_hien_tai',
                                                    'else' => '$san_pham_info.gia_hien_tai',
                                                ],
                                            ],
                                        ],
                                    ],
                                    'giam_gia'=>'$san_pham_info.giam_gia',
                                    'ngay_bat_dau'=>'$san_pham_info.ngay_bat_dau',
                                    'ngay_ket_thuc'=>'$san_pham_info.ngay_ket_thuc', 
                                    'so_luong_gioi_han'=> '$san_pham_info.so_luong_gioi_han',
                                ],
                                'so_luong' => '$gio_hang.so_luong',
                            ],
                        ],
                    ],
                ],
            ]);
        });        
        return $data;            
    }
    // public static function updatedInfo($dataInfo)
    // {
    //     $dataInfo = json_decode($dataInfo,true);
    //     return $dataInfo;
    // }
    public static function addCartTemporaryToMain($nguoi_dung,$carts)
    {        
        if(!$nguoi_dung)
            return false;
        $gio_hang_tam = [];               
        foreach ($carts as $item) 
            foreach ($item['san_phams'] as $san_pham)
                array_push($gio_hang_tam,$san_pham);               
        if(isset($nguoi_dung['gio_hang']))
        {      
            // for($i = 0 ;$i<count($nguoi_dung['gio_hang']);$i++)            
            //     if(($item = nguoi_dung::checkProductInTheCart($gio_hang_tam,$san_pham)))
            //     {                                      
            //         //nguoi_dung::updateQuantityProductCart($nguoi_dung->_id,$san_pham,$item['so_luong']+$san_pham['so_luong']);              
            //         $nguoi_dung['gio_hang'][$i]['so_luong']+=$item['so_luong'];                                                
            //     }  
            //     $nguoi_dung['gio_hang'] = array_merge($nguoi_dung['gio_hang'],$gio_hang_tam);            
            //     $nguoi_dung->save(); 
            
            
            foreach ($nguoi_dung['gio_hang'] as $san_pham) 
                if(($item = nguoi_dung::checkProductInTheCart($gio_hang_tam,$san_pham)))
                {        
                    $san_pham_chk = san_pham::getProductWithClassify($item['san_pham'],true);               
                    $status = san_pham::checkProductAction($san_pham_chk,$item['so_luong']+$san_pham['so_luong']);

                    if($status == -1 || $status > 0)
                        nguoi_dung::updateQuantityProductCart($nguoi_dung->_id,$san_pham,$status == -1 ?$item['so_luong']+$san_pham['so_luong']:$status);              
                    //$san_pham['so_luong']+=$item['so_luong'];                                                
                }                                                                         
            foreach ($gio_hang_tam as $item) { 
                if(isset($item))
                {
                    Arr::forget($item['san_pham'],"gia_hien_tai");
                    Arr::forget($item['san_pham'],"ten_san_pham");                    
                    Arr::forget($item['san_pham'],"giam_gia");
                    Arr::forget($item['san_pham'],"ngay_bat_dau");
                    Arr::forget($item['san_pham'],"ngay_ket_thuc");
                    Arr::forget($item['san_pham'],"so_luong_gioi_han");                    
                    //$san_pham['so_luong']+=1;
                    nguoi_dung::where("_id",$nguoi_dung->_id)
                    ->push('gio_hang',[
                        $item
                    ], true);
                    //nguoi_dung::updateQuantityProductCart($nguoi_dung->_id,$san_pham,$san_pham['so_luong']-1);
                }                
            }                                             
        }   
        else
        {
            $nguoi_dung['gio_hang'] = $gio_hang_tam;
            $nguoi_dung->save(); 
        }                     
    }
    public static function checkProductInTheCart(&$gio_hang_tam,$san_pham)
    {       
        $i=0;
        foreach ($gio_hang_tam as $item) {
            if($item['san_pham']['san_pham_id']==$san_pham['san_pham']['san_pham_id'] &&
                                ((!isset($san_pham['san_pham']['ten_phan_loai'])&&!isset($item['san_pham']['ten_phan_loai'])) 
                                    || (strcmp($san_pham['san_pham']['ten_phan_loai'],$item['san_pham']['ten_phan_loai'])==0 &&
                                                                                    ((!isset($san_pham['san_pham']['ten_kich_co'])&&!isset($item['san_pham']['ten_phan_loai']['ten_kich_co']))                 
                                                                                           || strcmp($san_pham['san_pham']['ten_kich_co'],$item['san_pham']['ten_kich_co'])==0))))                                                                    
                return   array_splice($gio_hang_tam,$i,1)[0];             
            $i++;                  
        }        
        return null;
    }
    public static function createElemenMathProductCart($san_pham)
    {
        $elemMatch = [
            'san_pham.san_pham_id' => isset($san_pham['san_pham_id']) ? new ObjectId($san_pham['san_pham_id']['$oid']) : $san_pham['san_pham']['san_pham_id'],
        ];
        if(isset($san_pham['san_pham']['ten_phan_loai']))
        {
            $elemMatch['san_pham.ten_phan_loai'] = $san_pham['san_pham']['ten_phan_loai'];
            if(isset($san_pham['san_pham']['ten_kich_co']))                    
                $elemMatch['san_pham.ten_kich_co'] = $san_pham['san_pham']['ten_kich_co'];                    
        }         
        else if(isset($san_pham["phan_loai"]))
        {            
            $elemMatch['san_pham.ten_phan_loai'] = $san_pham['phan_loai']['ten_phan_loai'];            
            if(isset($san_pham['phan_loai']['kich_co_phan_loais']))
                $elemMatch['san_pham.ten_kich_co'] = $san_pham['phan_loai']['kich_co_phan_loais']['ten_kich_co'];                
        }

        return $elemMatch;
    }
    public static function updateQuantityProductCart($id, $san_pham, $sl) {
        nguoi_dung::where('_id', $id)
                            ->where('gio_hang', 'elemMatch', nguoi_dung::createElemenMathProductCart($san_pham))
                            ->update([
                                'gio_hang.$.so_luong' => $sl
                            ]);        
    }
    public static function addProductToCart($id,$san_pham,$san_pham_chk)
    {        
        $select = nguoi_dung::where('_id', $id)
                            ->where('gio_hang', 'elemMatch', nguoi_dung::createElemenMathProductCart($san_pham));                                                                                           
        if ($select->exists()) {
            $san_pham_cu = $select->project([
                "gio_hang.$"=>1
            ])->first()['gio_hang'];  
            $status = san_pham::checkProductAction($san_pham_chk,$san_pham_cu[0]['so_luong'] + $san_pham['so_luong']);
            if($status == -1)
            {
                $select->update([
                    'gio_hang.$.so_luong' => $san_pham_cu[0]['so_luong'] + $san_pham['so_luong']
                ]);
            }                                
        }
        else
        {
            $status = san_pham::checkProductAction($san_pham_chk, $san_pham['so_luong']);
            if($status == -1)        
                nguoi_dung::where("_id",$id)
                ->push('gio_hang',[
                    $san_pham
                ], true);               
        }
        return $status;                                 
    }
    public function checkStoreExistence()
    {        
        return cua_hang::where("nguoi_dung_id", new ObjectId($this->_id))->first();        
    }

    public function checkInteraction($san_pham_id)
    {        
        if(!isset($this->tuong_tacs))
            return false;
        $today = Carbon::now();
        $data = array_filter($this->tuong_tacs,function($filter) use($san_pham_id,$today){
            return $filter["san_pham_id"] == $san_pham_id && Convert::toCarbonFromTimestampMs($filter["thoi_gian"])->addDays(1)->gte($today);
        });
        return count($data) >=3;
    }
}
