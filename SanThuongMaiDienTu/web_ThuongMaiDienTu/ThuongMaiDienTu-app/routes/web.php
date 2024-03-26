<?php

use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\CartApiController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\View\AddressPersonalController;
use App\Http\Controllers\View\CartController;
use App\Http\Controllers\View\HomeController;
use App\Http\Controllers\View\OrderController;
use App\Http\Controllers\View\OrderPersonalController;
use App\Http\Controllers\View\OrderStoreController;
use App\Http\Controllers\View\PersonalController;
use App\Http\Controllers\View\ProductController;
use App\Http\Controllers\View\ProductStoreController;
use App\Http\Controllers\View\StoreController;
use App\Http\Controllers\View\VoucherStoreController;
use App\Models\nguoi_dung;
use Illuminate\Contracts\Cache\Store;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Route::middleware(['web'])->group(function () {
    Route::get('/',[HomeController::class,
    "HomeMain"]);
    Route::get('/navbar/navbar',function(){
        return view("layouts.navbar");
    });Route::get('/auth/dang-nhap',[
        AuthController::class,
        "Login"
    ])->name("login");
    Route::get('/tat-ca-san-pham',[HomeController::class,
    "ShowProductAll"]);
    Route::group(['prefix' => '/san-pham','namespace' => 'Cart'], function () {
        Route::get('/{san_pham_id}',[
            ProductController::class,
            "Details"
            ])->name("detailProduct");
        Route::post('/{san_pham_id}',[
            ProductController::class,
            "Details"
            ])->name("detailProduct");               
    });
    Route::get('/auth/dang-xuat',[
        AuthController::class,
        'Logout'
    ]);
});



Route::middleware(['auth'])->group(function () {

    Route::group(['prefix' => 'don-hang','namespace' => 'Cart'], function () {
        Route::get('/kiem-tra-don-dat-hang',[
            OrderController::class,
            "Checkout"
            ])->name("checkout");  
        Route::get('/dat-hang-thanh-cong',[
            OrderController::class,
            "Success"
            ])->name("order-success");                   
    });

    Route::group(['prefix' => '/cua-hang','namespace' => 'Store'], function () {
        Route::get('/dang-ky',[
            StoreController::class,
            "Register"
        ]);
    });
    Route::group(['prefix' => '/trang-ca-nhan','namespace' => 'Personal'], function () {
        Route::get('/',[
            PersonalController::class,
            "index"
        ]);
        Route::get('/thong-tin-ca-nhan',[
            PersonalController::class,
            "information"
        ])->name("information");
        
        Route::group(['prefix' => '/so-dia-chi'],function(){
            Route::get('',[
                PersonalController::class,
                "address"
            ])->name("address");  
            Route::group(['prefix' => '/{id}'],function(){
                Route::get('',[
                    AddressPersonalController::class,
                    "get"
                ]);
                
            });
        });     
        
        
        Route::group(['prefix' => '/don-hang'],function(){
            Route::get('',[
                OrderPersonalController::class,
                "index"
            ])->name("personal-order");  
            Route::group(['prefix' => '/{id}'],function(){
                Route::get('',[
                    OrderPersonalController::class,
                    "details"
                ]);                
            });
        });    
    });

});


Route::middleware(['store'])->group(function () {

    Route::group(['prefix' => '/cua-hang','namespace' => 'Store'], function () {
        Route::get('/',[
            StoreController::class,
            "Home"
        ]);
        Route::group(['prefix' => '/khuyen-mai','namespace' => 'Store'], function () {
            Route::get('/',[
                VoucherStoreController::class,
                "index"
            ])->name("store-voucher");
            Route::get('/{ma_khuyen_mai}',[
                VoucherStoreController::class,
                "details"
            ])->where('ma_khuyen_mai', '^(?!.*\s)(?!tao-khuyen-mai$).*$');
            Route::get('/tao-khuyen-mai',[
                VoucherStoreController::class,
                "create"
            ])->name("store_create_voucher");
            
        });
        Route::group(['prefix' => '/san-pham','namespace' => 'Store'], function () {
            Route::get('/',[
                ProductStoreController::class,
                "index"
            ]);
            Route::get('/them-san-pham',[
                ProductStoreController::class,
                "create"
            ]);      
            Route::get('/{san_pham_id}',[
                ProductStoreController::class,
                "details"
            ]);   
                 
        });
        Route::group(['prefix' => '/don-hang','namespace' => 'Store'], function () {
            Route::get('/',[
                OrderStoreController::class,
                "index"
            ])->name("store_order");
            Route::get('/{don_hang_id}',[
                OrderStoreController::class,
                "details"
            ]);            
        });        
    });

});