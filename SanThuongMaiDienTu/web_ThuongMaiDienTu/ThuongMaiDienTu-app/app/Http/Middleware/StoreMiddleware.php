<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StoreMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        if(Auth::guard('store')->check())
            return $next($request);
        if(Auth::guard('web')->check())
        {
            if(($store=auth()->user()->checkStoreExistence()))        
            {
                Auth::guard('store')->login($store);
                return $next($request);
            }
            return redirect("/cua-hang/dang-ky");
        }
        session([config("app.PREVIOUS_URL") => $request->fullUrl()]);
        return redirect()->route("login");
    }
}
