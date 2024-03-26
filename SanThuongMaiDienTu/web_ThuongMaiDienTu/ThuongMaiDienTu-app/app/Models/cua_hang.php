<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;
use Jenssegers\Mongodb\Auth\User as Authenticatable;
use MongoDB\BSON\ObjectId;

class cua_hang extends Authenticatable
{
    use HasFactory;
    protected $collection = 'cua_hang';
    protected $fillable = [
        "_id",            
        "nguoi_dung_id",
        "ten_cua_hang",
        "dia_chi",
        "ngay_dang_ky",
        "luot_truy_cap",
        "trang_thai_hoat_dong", 
    ];
    public static function getVoucherAll($ma_cua_hang)
    {
        return cua_hang::project([
                            "khuyen_mais"=>1
                        ])->where("_id",new ObjectId($ma_cua_hang))
                        ->first()["khuyen_mais"];
    }
}
