<?php

use App\Helpers\ResponseJson;
use App\Http\Controllers\Api\AddressApiController;
use App\Http\Controllers\Api\AuthApiController;
use App\Http\Controllers\Api\AuthStoreApiController;
use App\Http\Controllers\Api\CartApiController;
use App\Http\Controllers\Api\CategoryApiController;
use App\Http\Controllers\Api\EvaluateApiController;
use App\Http\Controllers\Api\OrderApiController;
use App\Http\Controllers\Api\OrderPersonalApiController;
use App\Http\Controllers\Api\OrderStoreApiController;
use App\Http\Controllers\Api\PaymentMethodApiController;
use App\Http\Controllers\Api\ProductApiController;
use App\Http\Controllers\Api\ProductStoreApiController;
use App\Http\Controllers\Api\ShippingMethodApiController;
use App\Http\Controllers\Api\StatisticalStoreApiController;
use App\Http\Controllers\Api\StoreApiController;
use App\Http\Controllers\Api\UserApiController;
use App\Http\Controllers\Api\VoucherShobeeApiController;
use App\Http\Controllers\Api\VoucherStoreApiController;
use App\Services\AddressService;
use Carbon\Carbon;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use MongoDB\BSON\UTCDateTime;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(['api'])->group(function () {
    Route::group(['prefix' => 'danh-muc','namespace' => 'Api/Category'], function () {
        Route::get('/{danh_muc_id?}',[
            CategoryApiController::class,
            'GetCategory'
        ]);     
    });
    Route::group(['prefix' => 'san-pham','namespace' => 'Api/Product'], function () {
        Route::get('/tat-ca-san-pham',[
            ProductApiController::class,
            'ShowAll'
        ]);
        Route::get('/goi-y',[
            ProductApiController::class,
            'suggest'
        ]);
        Route::get('/san-pham-khuyen-mai',[
            ProductApiController::class,
            'ShowProductSales'
        ]);
        Route::group(['prefix' => '{san_pham_id}'], function () {
            Route::get('',[
                ProductApiController::class,
                'Details'
            ]);
            Route::get('/danh-gia',[
                EvaluateApiController::class,
                'Gets'
            ]);            
        });                        
    });
    // 'middleware'=>"web"
    Route::group(['prefix' => 'auth','namespace' => 'Api'], function () {
        Route::post('/dang-nhap',[
            AuthApiController::class,
            'Login'
        ]);
        Route::post('/dang-ky',[
            AuthApiController::class,
            'Register'
        ]); 
        Route::post('/dang-xuat',[
            AuthApiController::class,
            'Logout'
        ]); 
        Route::get('/dang-xuat',[
            AuthApiController::class,
            'Logout'
        ]); 
        Route::post('/kiem-tra-dang-nhap',[
            AuthApiController::class,
            "CheckLogin"
        ]);
    });
    Route::group(['prefix' => 'gio-hang','namespace' => 'Api/CartApi'], function () {
        Route::post('/them-vao-gio-hang',[
            CartApiController::class,
            "AddProductToCart"
        ]);        
        Route::get('/danh-sach-gio-hang',[
            CartApiController::class,
            "GetCarts"
        ]);
        Route::post('/cap-nhat-so-luong',[
            CartApiController::class,
            "UpdateQuantity"
        ]);
        Route::delete('/xoa-san-pham-khoi-gio-hang',[
            CartApiController::class,
            "DeleteProduct"
        ]);
        Route::delete('/xoa-cua-hang-khoi-gio-hang',[
            CartApiController::class,
            "DeleteProductWithShop"
        ]);
    });
    Route::group(['prefix' => 'don-hang','namespace' => 'Api/OrderApi'], function () {
        Route::post('/kiem-tra-don-dat-hang',[
            OrderApiController::class,
            "PostDataOrder"
        ]);
        Route::get('/kiem-tra-don-dat-hang',[
            OrderApiController::class,
            "GetDataOrder"
        ]);  
        Route::post('/tao-don-dat-hang',[
            OrderApiController::class,
            "Create"
        ]);                
    });


    Route::group(['prefix' => 'tai-khoan-ca-nhan','namespace' => 'Api/AddressApi'], function () { 
        Route::middleware("auth")->group(function(){
            Route::group(['prefix' => 'so-dia-chi','namespace' => 'Api/AddressApi'], function () {        
                Route::get('/tat-ca-dia-chi',[
                    AddressApiController::class,
                    "GetAddressAll"
                ]);
                Route::post('/them-dia-chi',[
                    AddressApiController::class,
                    'Insert'
                ]);   
                Route::group(['prefix' => '/{id}','namespace' => 'Api/AddressApi'], function () {        
                    Route::post('/dat-lam-mac-dinh',[
                        AddressApiController::class,
                        "SetDefault"
                    ]);   
                    Route::delete('',[
                        AddressApiController::class,
                        "Delete"
                    ]); 
                    Route::put('',[
                        AddressApiController::class,
                        "Update"
                    ]);            
                });            
            });

            Route::group(['prefix' => 'don-hang','namespace' => 'Api/OrderPersonal'], function () {        
                Route::get('/tat-ca-don-hang/{status?}',[
                    OrderPersonalApiController::class,
                    "Gets"
                ]); 
                Route::group(['prefix' => '/{don_hang_id}','namespace' => 'Api/OrderPersonal'], function () {    
                    Route::get("",[
                        OrderPersonalApiController::class,
                        "Deiails"
                    ]);   
                    Route::put("",[
                        OrderPersonalApiController::class,
                        "cancel"
                    ]);
                    Route::post('/{san_pham_id}/danh_gia',[
                        EvaluateApiController::class,
                        'Insert'
                    ]);
                });                                          
            });
        });
    });    

    Route::group(['prefix' => 'cua-hang','namespace' => 'Api/StoreApi'], function () {   

        Route::post('/dang-ky',[
            AuthStoreApiController::class,
            "Register"
        ]);

        Route::middleware(['store'])->group(function () {   
            Route::get('thong-ke',[
                StatisticalStoreApiController::class,
                "index"
            ]); 

            Route::group(['prefix' => '/khuyen-mai','namespace' => 'VoucherStore'], function () {                
                Route::post('/tao-khuyen-mai',[
                    VoucherStoreApiController::class,
                    "CreateVoucher"
                ]);
                Route::get('/tat-ca-khuyen-mai/{cua_hang_id?}',[
                    VoucherStoreApiController::class,
                    "GetVoucherAll"
                ])->withoutMiddleware('store');  
                Route::get('/{ma_khuyen_mai}',[
                    VoucherStoreApiController::class,
                    "GetVoucher"
                ])->withoutMiddleware('store'); 
                Route::put('/{ma_khuyen_mai}',[
                    VoucherStoreApiController::class,
                    "UpdateVoucher"
                ]);
                Route::delete('/{ma_khuyen_mai}',[
                    VoucherStoreApiController::class,
                    "DeteleVoucher"
                ]);
            });
            Route::group(['prefix' => '/san-pham','namespace' => 'ProductStore'], function () {                              
                Route::get('/tat-ca-san-pham/{cua_hang_id?}',[
                    ProductStoreApiController::class,
                    "getProductForStore"
                ])->withoutMiddleware('store');   
                Route::post('/tao-san-pham',[
                    ProductStoreApiController::class,
                    "create"
                ]); 
                Route::post('/{san_pham_id}',[
                    ProductStoreApiController::class,
                    "update"
                ]);          
            });
            Route::group(['prefix' => 'don-hang','namespace' => 'Api/OrderStore'], function () {        
                Route::get('/tat-ca-don-hang/{status?}',[
                    OrderStoreApiController::class,
                    "Gets"
                ]); 
                Route::group(['prefix' => '/{don_hang_id}','namespace' => 'Api/OrderStore'], function () {    
                    Route::get("",[
                        OrderStoreApiController::class,
                        "Deiails"
                    ]);   
                    Route::put("",[
                        OrderStoreApiController::class,
                        "Refuse"
                    ]);
                    Route::patch("",[
                        OrderStoreApiController::class,
                        "UpdateStatus"
                    ]);                 
                });                                          
            });     
        });        
        // Route::group(['prefix' => '/khuyen-mai'], function () {        
        //     Route::get('/tat-ca-khuyen-mai/{cua_hang_id?}',[
        //         VoucherStoreApiController::class,
        //         "GetVoucherAll"
        //     ]);  
        //     Route::get('/{ma_khuyen_mai}',[
        //         VoucherStoreApiController::class,
        //         "GetVoucher"
        //     ]);
        //     // ->where('ma_khuyen_mai', `[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+`);               
        // });                  
    });
    Route::group(['prefix' => 'phuong-thuc-van-chuyen','namespace' => 'Api/ShippingMethodApi'], function () {                       
            Route::get('',[
                ShippingMethodApiController::class,
                "Gets"
            ]);  
            Route::get('/{phuong_thuc_van_chuyen_id}',[
                VoucherStoreApiController::class,
                "Get"
            ]);
            // ->where('ma_khuyen_mai', `[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+`);                       
    });
    Route::group(['prefix' => 'phuong-thuc-thanh-toan','namespace' => 'Api/PaymentMethodApi'], function () {                       
        Route::get('',[
            PaymentMethodApiController::class,
            "Gets"
        ]);  
        Route::get('/{phuong_thuc_thanh_toan_id}',[
            PaymentMethodApiController::class,
            "Get"
        ]);
    
        // ->where('ma_khuyen_mai', `[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+`);                       
    });

    //Cái phần này bị bỏ r
    Route::group(['prefix' => 'voucher','namespace' => 'Api/VoucherShobeeApi'], function () {                       
        Route::get('',[
            VoucherShobeeApiController::class,
            "Gets"
        ]);  
        Route::get('/{voucher_id}',[
            VoucherShobeeApiController::class,
            "Get"
        ]);
    
        // ->where('ma_khuyen_mai', `[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+`);                       
    });

    Route::group(['prefix' => 'shopbee-vouchers','namespace' => 'Api/VoucherShobeeApi'], function () {                       
        Route::get('/{ma_voucher?}',[
            VoucherShobeeApiController::class,
            "GetShopbeeVouchers"
        ]);                                          
    });


    Route::group(['prefix' => '/trang-ca-nhan','namespace' => 'Store'], function () {
        Route::middleware(['auth'])->group(function () {               
                Route::get("/thong-tin-ca-nhan",[
                    UserApiController::class,
                    "get"
                ]);  
                Route::post("/thong-tin-ca-nhan",[
                    UserApiController::class,
                    "updateInfo"
                ]);           
            });
        
        });

    // Route::group(['prefix' => '/cua-hang','namespace' => 'Store'], function () {
    //     Route::middleware(['store'])->group(function () {               
    //         Route::group(['prefix' => '/khuyen-mai','namespace' => 'VoucherStore'], function () {                
    //             Route::post('/tao-khuyen-mai',[
    //                 VoucherStoreApiController::class,
    //                 "CreateVoucher"
    //             ]);
    //             Route::get('/tat-ca-khuyen-mai/{cua_hang_id?}',[
    //                 VoucherStoreApiController::class,
    //                 "GetVoucherAll"
    //             ])->withoutMiddleware('store');  
    //             Route::get('/{ma_khuyen_mai}',[
    //                 VoucherStoreApiController::class,
    //                 "GetVoucher"
    //             ])->withoutMiddleware('store'); 
                
    //         });
    //         Route::group(['prefix' => '/san-pham','namespace' => 'ProductStore'], function () {                              
    //             Route::get('/tat-ca-san-pham/{cua_hang_id?}',[
    //                 ProductStoreApiController::class,
    //                 "getProductForStore"
    //             ])->withoutMiddleware('store');   
    //             Route::post('/tao-san-pham',[
    //                 ProductStoreApiController::class,
    //                 "create"
    //             ]);           
    //         });
    //     });
        
    // });

});