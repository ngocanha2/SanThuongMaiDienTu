<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Jenssegers\Mongodb\Eloquent\Model;

class don_hang extends Model
{
    use HasFactory;
    protected $collection = 'don_hang';
}
