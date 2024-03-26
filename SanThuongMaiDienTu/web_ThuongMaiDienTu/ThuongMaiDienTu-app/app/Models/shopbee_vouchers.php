<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class shopbee_vouchers extends Model
{
    use HasFactory;
    protected $collection = 'shopbee_vouchers';
}
