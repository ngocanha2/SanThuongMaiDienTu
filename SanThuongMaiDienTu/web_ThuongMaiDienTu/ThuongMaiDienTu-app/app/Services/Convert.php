<?php

namespace App\Services;

use Carbon\Carbon;
use Exception;
use MongoDB\BSON\ObjectId;
use MongoDB\BSON\UTCDateTime;
use PHPUnit\Framework\Constraint\IsInstanceOf;

class Convert 
{    
    public static function ObjectId($id=null)
    {
        return new ObjectId(gettype($id) == "array" ? $id['$oid'] : $id);
    }

    public static function toUTCDateTime(int|string $s = null)
    {
        return new UTCDateTime( ($s ? (is_int($s) ? $s : strtotime($s))*1000 : null));
    }
    public static function toCarbonFromTimestampMs($dateObj)
    {
        // dd(Carbon::parse($dateObj->toDateTime()));   
        if($dateObj instanceof  UTCDateTime)
            return Carbon::parse($dateObj->toDateTime());
        $date = intval($dateObj['$date']['$numberLong']);        
        return Carbon::createFromTimestampMs($date);        
    }

}