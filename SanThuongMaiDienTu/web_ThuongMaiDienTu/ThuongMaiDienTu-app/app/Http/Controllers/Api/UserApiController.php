<?php

namespace App\Http\Controllers\Api;

use App\Helpers\ResponseJson;
use App\Http\Controllers\Controller;
use App\Services\UserService;
use Illuminate\Http\Request;

class UserApiController extends Controller
{
    public function get()
    {
        return UserService::getUserPersonal();
    }
    public function updateInfo(Request $request)
    {
        return UserService::updateInfoPersonal($request);
    }
}
