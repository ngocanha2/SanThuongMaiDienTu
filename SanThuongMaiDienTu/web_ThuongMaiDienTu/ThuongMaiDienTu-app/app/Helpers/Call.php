<?php
namespace App\Helpers;

use Closure;
use Exception;

class Call
{
    public static function TryCatchResponseJson(Closure $callBack,?Closure $callBackException = null) 
    {
        try
        {
            return $callBack();
        }
        catch(Exception $e)
        {
            if($callBackException!=null)
                return $callBackException($e);
            return ResponseJson::error($e->getMessage());
        }
    }
    
}


