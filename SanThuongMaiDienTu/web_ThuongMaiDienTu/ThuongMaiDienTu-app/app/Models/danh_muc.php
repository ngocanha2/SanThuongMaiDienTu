<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class danh_muc extends Model
{
    use HasFactory;
    protected $collection = 'danh_muc';
}
