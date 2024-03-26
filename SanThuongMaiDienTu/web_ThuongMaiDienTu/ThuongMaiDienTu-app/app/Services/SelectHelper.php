<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class  SelectHelper 
{    
    public static function All($collectionName,$project)
    {
        $data = DB::collection($collectionName);
        return ($project ? $data->project($project) : $data)->get();
    }
    public static function Count($collectionName)
    {
        return DB::collection($collectionName)->Count();
    }
    public static function Pagination($collectionName,$request,$pageItemCount,$project)
    {
        $page = $request ? $request->page ?? 1 : 1;         
        $pageItemCount = $pageItemCount??config('app.PAGE_NUMBER_MAX');            
        $numpages = $request ? $request->numpages ?? ceil(SelectHelper::Count($collectionName)/$pageItemCount):ceil(SelectHelper::Count($collectionName)/$pageItemCount);
        if(($page - 1)*$pageItemCount > $numpages * $pageItemCount) 
            $page = 1;
        $curentIndex = ($page - 1)*$pageItemCount;          
        $data = DB::collection($collectionName)
                ->skip($curentIndex)
                ->limit($pageItemCount);   
        return ([
            "data"=>($project ? $data->project($project) : $data)->get(),
            "numpages"=>$numpages,
            "page"=>$page,
            "pageItemCount"=>$pageItemCount
        ]);             
    }
}