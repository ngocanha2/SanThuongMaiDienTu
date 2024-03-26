@extends('layouts.layout_personal')
@section('content')
<link rel="stylesheet" href="{{asset('css/order/order_details.css')}}">

    <div class="container">
        <div class="box-white">
            <div class="box-order-details">
                <div class="box-order-details-header">
                    <div class="box-order-details-header-left">
                       <a href="/trang-ca-nhan/don-hang">< <span>Trở lại</span></a>
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
                    <div class="text-dark">Đặt hàng lúc: <span class="order-date"></span></div>
                    <div class="box-order-details-content-main">
                        <div class="box-order-info-shop">
                            <span class="item-order-shop-name text-dark">Tên shop</span>
                            <button class="btn-order-shop-chat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-quote" viewBox="0 0 16 16">
                                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                    <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"/>
                                </svg>
                                Chat
                            </button>
                            <a class="btn-order-shop-access">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                                Xem shop
                            </a>
                            <a class="btn-feedback-shop">[Đánh giá shop]</a>
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
                        <div class="text-warning">Phương thức thanh toán: <span class="payment-method">Thanh toán khi nhận hàng</span></div>                        
                    </div>
                </div>
                <div class="box-order-details-footer">

                </div>                
            </div>                        
        </div>
    </div>

<script type="text/javascript" src="{{asset('js/call_api/personal_order.js')}}"></script>
<script type="text/javascript" src="{{asset('js/call_api/personal_feedback.js')}}"></script>
<script type="text/javascript" src="{{asset('js/personal/order_details23.js')}}"></script>
@endsection