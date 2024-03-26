@extends('layouts.layout_store')
@section('content')
<link rel="stylesheet" href="{{asset('css/order/order_details.css')}}">
<meta name="csrf-token" content="{{ csrf_token() }}"> 
<style>
    .box-order-details-btn-update-status{
        float: left;
        margin-top:5px;        
    }
    .btn-update-order-status{
        padding: 5 10; 
        border-radius: 5px;
        background-color: #ffcc00;
        border: none;        
    }
    a{
        text-decoration: none;
    }
</style>
    <div class="container">
        <div class="box-white">
            <div class="box-order-details">
                <div class="box-order-details-header">
                    <div class="box-order-details-header-left">
                       <a href="/cua-hang/don-hang">< <span>Trở lại</span></a>
                    </div>
                    <div class="box-order-details-header-right">
                        <span class="item-order-details-code-status"><span>Mã: </span><span class="item-order-details-code">230820611YYAPF</span> - [<span class="item-order-details-status">Đã giao</span>]</span>                       
                    </div>
                    <div style="clear: both"></div>
                </div>
                <div class="box-order-details-content">
                    <div class="box-order-details-content-buyer-info row">
                        <div class="col-lg-4 box-order-details-content-buyer-info-address">
                            <center class="address-title">Địa chỉ nhận hàng</center>
                            <div>
                                <strong class="info-address-name-phone text-dark"><span class="info-address-name">Lê Phát Đạt</span> | <span class="info-address-phone-number">0387079343</span></strong><br>
                                <span class="info-address-info">Tây thạnh, Tân Phú, Hồ Chí Minh</span><br>
                                <span class="info-address-detail">Số nhà 63</span><br>
                                <span class="info-address-note">(Ghi chú)</span><br>
                                <span >Vận chyển: <span class="info-order-details-shipping-method">siêu ship</span></span>

                            </div>
                        </div>
                        <div class=" col-lg-8 box-order-details-content-buyer-info-transport">
                            <center class="box-order-details-content-buyer-info-transport-title">Chi tiết vận chuyển</center>
                            <div style="position: absolute; top: 0; left: 10;" class="w-100 h-100">
                                <div class="row w-100 row-line-info-transport">
                                    <div class="col-3 p-0"><div class="line-info-transport padding-left" line="Chờ xác nhận"></div></div>
                                    <div class="col-3 p-0"><div class="line-info-transport" line="Đang xử lý"></div></div>
                                    <div class="col-3 p-0"><div class="line-info-transport" line="Đang giao"></div></div>
                                    <div class="col-3 p-0"><div class="line-info-transport padding-right" line="Đã giao"></div></div>
                                </div>
                            </div>                         
                            <div class="status-info-transport" color="Chờ xác nhận">                                
                                    Chờ xác nhận                              
                                <div class="status-info-transport-details">
                                    <center><span class="info1">Đã đặt</span></center>
                                    <center><span class="info2 status" id="status-1" status="Chờ xác nhận">------</span></center>
                                </div>                                                                                                                
                            </div>   
                            <div class="status-info-transport" color="Đang xử lý">                                
                                    Đang xử lý                                
                                <div class="status-info-transport-details">
                                    <center><span class="info1">Đã xác nhận</span></center>
                                    <center><span class="info2 status" id="status-2" status="Đang xử lý">------</span></center>
                                </div>                                                                                                                
                            </div>  
                            <div class="status-info-transport" color="Đang giao">                                
                                    Đang giao                                
                                <div class="status-info-transport-details">
                                    <center><span class="info1">Đã giao cho ĐVVC</span></center>
                                    <center><span class="info2 status" id="status-3" status="Đang giao">------</span></center>
                                </div>                                                                                                                
                            </div>  
                            <div class="status-info-transport" color="Đã giao">                                
                                    Đã giao                                                                
                                <div class="status-info-transport-details">
                                    <center><span class="info1">Hoàn thành</span></center>
                                    <center><span class="info2 status" id="status-4" status="Đã giao">------</span></center>
                                </div>                                                                                                                
                            </div>                                                                                                                                                                  
                        </div>                        
                    </div>
                    <div class="box-order-details-content-main">
                        <div class="box-order-info-shop">
                            <span class="item-order-shop-name text-dark">Chi tiết đơn hàng</span>                                                        
                            <div style="clear: both"></div>
                        </div>
                        <div class="box-order-details-products">

                            <div class="item-order-product">
                                <div class="row">
                                    <div class="col-lg-2 col-xxl-1 col-md-3 col-sm-4 col-5">
                                        <div class="image-product" style="background: url(${URL_HOST}uploads/${don_hang.cua_hang_id}/${san_pham_id}/${chi_tiet.san_pham.anh_bia}); background-size: cover; ">                                                
                                        </div>
                                    </div>
                                    <div class="col-lg-10 col-xxl-11 col-md-9 col-sm-8 col-7">
                                        <strong class="item-product-name text-dark">Tên sản phẩm</strong><br>
                                        <span class="item-product-classify">PHân loajai | Kích cở</span><br>
                                        <span class="item-product-quantity">x 9</span>
                                        <strong class="item-product-price">19.000.000đ</strong>
                                    </div>
                                </div>
                            </div>


                            <div class="item-order-product">
                                <div class="row">
                                    <div class="col-lg-2 col-xxl-1 col-md-3 col-sm-4 col-5">
                                        <div class="image-product" style="background: url(${URL_HOST}uploads/${don_hang.cua_hang_id}/${san_pham_id}/${chi_tiet.san_pham.anh_bia}); background-size: cover; ">                                                
                                        </div>
                                    </div>
                                    <div class="col-lg-10 col-xxl-11 col-md-9 col-sm-8 col-7">
                                        <strong class="item-product-name text-dark">Tên sản phẩm</strong><br>
                                        <span class="item-product-classify">PHân loajai | Kích cở</span><br>
                                        <span class="item-product-quantity">x 9</span>
                                        <strong class="item-product-price">19.000.000đ</strong>
                                    </div>
                                </div>
                            </div>


                            <div class="item-order-product">
                                <div class="row">
                                    <div class="col-lg-2 col-xxl-1 col-md-3 col-sm-4 col-5">
                                        <div class="image-product" style="background: url(${URL_HOST}uploads/${don_hang.cua_hang_id}/${san_pham_id}/${chi_tiet.san_pham.anh_bia}); background-size: cover; ">                                                
                                        </div>
                                    </div>
                                    <div class="col-lg-10 col-xxl-11 col-md-9 col-sm-8 col-7">
                                        <strong class="item-product-name text-dark">Tên sản phẩm</strong><br>
                                        <span class="item-product-classify">PHân loajai | Kích cở</span><br>
                                        <span class="item-product-quantity">x 9</span>
                                        <strong class="item-product-price">19.000.000đ</strong>
                                    </div>
                                </div>
                            </div>




                        </div>
                        <div class="box-order-tatol-summary">
                            <div class="row text-dark">
                                <div class="col-8 text-right ">Tổng tiền:</div>
                                <div class="col-4 text-right total_amount">90.000.000đ</div>
                                <div class="col-8 text-right ">Phí vận chuyện:</div>
                                <div class="col-4 text-right ">+ 35.000đ</div>
                                <div class="col-8 text-right ">Giảm giá phí vận chuyển:</div>
                                <div class="col-4 text-right ">- 12.000đ</div>
                                <div class="col-8 text-right ">Giảm giá khác</div>
                                <div class="col-4 text-right ">- 230.000đ</div>
                                <div class="col-8 title-tatol-summary">Thành tiền:</div>
                                <div class="col-4 tatol-summary into-money">90.000.000đ</div>
                            </div>
                        </div>                        
                    </div>
                    <div class="row">
                        <div class="col-6 text-warning">Phương thức thanh toán: <span class="payment-method">Thanh toán khi nhận hàng</span></div>                        
                    </div>
                </div>
                <div class="box-order-details-footer">
                    <div class="box-order-details-btn-update-status">                       
                    </div>                    
                </div>                              
            </div>    
            <div style="clear: both"></div>                      
        </div>
    </div>

<script type="text/javascript" src="{{asset('js/call_api/store_order.js')}}"></script>
<script type="text/javascript" src="{{asset('js/store/order_details.js')}}"></script>
@endsection