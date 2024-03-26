@extends('layouts.layout_store')
@section('content')
<div class="container box-shadow">
    <link rel="stylesheet" href="{{asset('css/library/tabcustom2.css')}}">
<link rel="stylesheet" href="{{asset('css/order/orderstylelist.css')}}">
    <div class="container">
        <br><br><br>
        <div class="box-white">
            <div>
                <div class="tabss w-100">
                    <div class="tab-itemm activee">
                        <i class="tab-icon fas fa-code"></i>
                        Tất cả
                    </div>
                    <div class="tab-itemm">
                        <i class="tab-icon fas fa-cog"></i>
                        Chờ xác nhận
                    </div>
                    <div class="tab-itemm ">
                        <i class="tab-icon fas fa-plus-circle"></i>
                        Đang xử lý
                    </div>
                    <div class="tab-itemm ">
                        <i class="tab-icon fas fa-pen-nib"></i>
                        Đang giao
                    </div>
                    <div class="tab-itemm ">
                        <i class="tab-icon fas fa-pen-nib"></i>
                        Đã giao
                    </div>
                    {{-- <div class="tab-itemm ">
                        <i class="tab-icon fas fa-pen-nib"></i>
                        Đã nhận
                    </div> --}}
                    <div class="tab-itemm ">
                        <i class="tab-icon fas fa-pen-nib"></i>
                        Đã hủy
                    </div>
                    <div class="tab-itemm ">
                        <i class="tab-icon fas fa-pen-nib"></i>
                        Bị từ chối
                    </div>
                    <div class="line"></div>
                </div>
                <div class="w-100" style="border-bottom:1px solid #AAAAAA"></div>
            </div> 
            <div class="box-order-list">
                <div class="tab-contentt w-100">                
                    <div class="tab-panee activee" id="test"> 
                        
                        
                        {{-- <div class="box-order">
                            <div class="item-order-header">
                                <div class="item-order-header-left">
                                    <strong class="item-order-shop-name">
                                        <img  src="{{asset("FE/img/core-img/icon-box.svg")}}" alt="">
                                        <span>Tên shop</span>
                                    </strong>
                                    <button class="btn-order-shop-chat">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-quote" viewBox="0 0 16 16">
                                            <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                            <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"/>
                                        </svg>
                                        Chat
                                    </button>
                                    <button class="btn-order-shop-access">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                                            <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                        </svg>
                                        Xem shop
                                    </button>
                                </div>   
                                <div class="item-order-header-right">
                                    <strong class="item-order-shop-status">Đã giao</strong>                                    
                                </div>  
                            <div style="clear: both"></div>                           
                            </div>
                            <div class="item-order-content">





                                <div class="item-order-product">
                                    <div class="row">
                                        <div class="col-lg-2 col-xxl-1 col-md-3 col-sm-4 col-5">
                                            <div class="image-product" style="background: url({{asset('FE/img/product-img/product-1.jpg')}}); background-size: cover; ">                                                
                                            </div>
                                        </div>
                                        <div class="col-lg-10 col-xxl-11 col-md-9 col-sm-8 col-7">
                                            <strong class="item-product-name">Teen sarn phaarm</strong><br>
                                            <span class="item-product-classify">Phaan loaji | Kisch cowr</span><br>
                                            <span class="item-product-quantity">x 99</span>
                                            <strong class="item-product-price">1.200.000đ</strong>
                                        </div>
                                    </div>
                                </div>
                                
                                
                                
                                


                            </div>
                            <div class="item-order-footer">
                                <hr>
                                <div class="item-order-footer-left">
                                    <span>Không nhận được đánh giá</span>
                                </div>
                                <div class="item-order-footer-right">
                                    <button class="btn-order-repurchase">Mua lại</button>
                                    <a class="btn-order-detail">Xem chi tiết</a>
                                </div>
                                <div style="clear: both"></div>
                            </div>
                        </div>  --}}
                        
                        

                        
                    </div>

                    <div class="tab-panee "></div>
                    <div class="tab-panee "></div>
                    <div class="tab-panee "></div>
                    <div class="tab-panee "></div>
                    <div class="tab-panee "></div>
                    <div class="tab-panee "></div>                    
                </div>  
            </div>             
        </div>
    </div>
<script type="text/javascript" src="{{asset('js/library/tabcustom1.js')}}"></script>
<script type="text/javascript" src="{{asset('js/call_api/store_order.js')}}"></script>
<script type="text/javascript" src="{{asset('js/store/order.js')}}"></script>
</div>
@endsection