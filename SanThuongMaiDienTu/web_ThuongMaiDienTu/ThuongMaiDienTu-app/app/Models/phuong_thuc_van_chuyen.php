<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class phuong_thuc_van_chuyen extends Model
{
    use HasFactory;
    protected $collection = 'phuong_thuc_van_chuyen';
}
