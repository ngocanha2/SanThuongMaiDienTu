<?php

namespace App\Models;

use App\Services\Convert;
use Carbon\Carbon;
use Exception;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use MongoDB\BSON\ObjectId;

class san_pham extends Model
{
    use HasFactory;
    protected $collection = 'san_pham';
    public $timestamps = false;
    protected $primaryKey = '_id';
    // protected $casts = [ 
    //     '_id'=>"objectid"       
    // ];
    public static function createElemenMath($san_pham)
    {
        $elemMatch = [
            'san_pham.san_pham_id' => $san_pham['san_pham']['san_pham_id'],
        ];        
        if(isset($san_pham['san_pham']['ten_phan_loai']))
        {
            $elemMatch['san_pham.ten_phan_loai'] = $san_pham['san_pham']['ten_phan_loai'];
            if(isset($san_pham['san_pham']['ten_kich_co']))                    
                $elemMatch['san_pham.ten_kich_co'] = $san_pham['san_pham']['ten_kich_co'];                    
        } 
        return $elemMatch;
    }
    public static function getProductWithClassify($san_pham, $chk = null)
    {    
        if($chk)  
            $san_pham_id = $san_pham['san_pham_id'];   
        else        
            $san_pham_id = $san_pham['san_pham_id']['$oid'];                                  
        $and[] = ['_id' => new ObjectId($san_pham_id)];        
        if(isset($san_pham['ten_phan_loai']))
        {            
            $and[] = ['phan_loais.ten_phan_loai'=> $san_pham['ten_phan_loai']];
            if(isset($san_pham['ten_kich_co']))
                $and[] = ['phan_loais.kich_co_phan_loais.ten_kich_co'=> $san_pham['ten_kich_co']];
        }
        else if(isset($san_pham["phan_loai"]))
        {            
            $and[] = ['phan_loais.ten_phan_loai' => $san_pham['phan_loai']['ten_phan_loai']];            
            if(isset($san_pham['phan_loai']['kich_co_phan_loais']))
                $and[] = ['phan_loais.kich_co_phan_loais.ten_kich_co' => $san_pham['phan_loai']['kich_co_phan_loais']['ten_kich_co']];                
        }
        return san_pham::raw(function ($collection) use ($and) {
            return $collection->aggregate([
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
                    '$match' => [                        
                        '$and' => $and                        
                    ],
                ],
                [
                    '$project' => [                        
                        '_id' => 1,
                        'giam_gia'=>1,
                        'ngay_bat_dau'=>1,
                        'ngay_ket_thuc'=>1,
                        'phan_loais'=>1,
                        'so_luong_gioi_han'=>1,
                        'so_luong_ton'=>1,
                        'gia_hien_tai'=>1,                       
                    ],
                ],
            ]);
        })[0];        
    }

    public static function checkProductAction($san_pham,$so_luong_moi)
    {        
        if(!$san_pham || (isset($san_pham['bi_xoa']) && $san_pham['bi_xoa']==true))
            return -2;// không còn tồn tại        
        else if(isset($san_pham['bi_an'])&&$san_pham['bi_an']==true)        
            return -3; // bị ẩn       
        else
        {                  
            if(isset($san_pham['phan_loais']))
            {                                
                if(isset($san_pham['phan_loais']['kich_co_phan_loais'] ))                    
                    return $san_pham['phan_loais']['kich_co_phan_loais']['so_luong_ton'] >= $so_luong_moi ? -1 : $san_pham['phan_loais']['kich_co_phan_loais']['so_luong_ton'];                                
                return $san_pham['phan_loais']['so_luong_ton'] >= $so_luong_moi ? -1 : $san_pham['phan_loais']['so_luong_ton'];
                //-1:sản phẩm còn hàng
            }
            return $san_pham['so_luong_ton'] >= $so_luong_moi ? -1 : $san_pham['so_luong_ton'];
            //còn lại: vượt quá số lượng hiện tại và trả về số lượng hiện tái
        }        
    }
    public function isSale()
    {
        if(isset($this->giam_gia) && $this->giam_gia > 0)
        {            
            $ngay_bat_dau = Convert::toCarbonFromTimestampMs($this->ngay_bat_dau);            
            $ngay_ket_thuc = Convert::toCarbonFromTimestampMs($this->ngay_ket_thuc);
            $today = Carbon::now();
            if($ngay_bat_dau <= $today && $ngay_ket_thuc >= $today)                    
                return true;
        }
        return false;
    }
}
