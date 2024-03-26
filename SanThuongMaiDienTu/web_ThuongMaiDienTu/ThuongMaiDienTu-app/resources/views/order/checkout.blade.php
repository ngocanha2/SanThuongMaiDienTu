

@extends('layouts.layout_main')
@section('content')
<script  rel="stylesheet" src="{{asset('js/call_api/address.js')}}"></script>
<script src="{{asset("js/call_api/address2.js")}}"></script>
<script  rel="stylesheet" src="{{asset('js/call_api/voucher99.js')}}"></script>
<script  rel="stylesheet" src="{{asset('js/call_api/shipping_method.js')}}"></script>
<script  rel="stylesheet" src="{{asset('js/call_api/payment_method3.js')}}"></script>
<script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
<meta name="csrf-token" content="{{ csrf_token() }}"> 
{{-- <script  rel="stylesheet" src="{{asset('js/call_api/voucher.js')}}"></script> --}}

<style>
     .item {
        background-color: white;
        border-radius: 5px;
        box-shadow: 1px 4px 7px #AAAAAA;
        margin-bottom: 15px;
        position: relative;
        padding: 5px;
    }
    a{
        color: #000000;
    }
    .item-shop-order-avatar{
        width: 100%;
        height: 100%;

    }
    .item-shop-order-product-info{
        margin-bottom:10px; 
        min-height: 100px;
    }
    .item-shop-order-setup-info-data-dead-color{
        font-size: 13px;
    }
    .item-shop-order-setup-info-data-dead-color,
    .item-shop-order-product-classify{
        color: #999999;
    }
    .item-shop-order-product-price{
        color: rgb(233, 103, 129);
    }
    .container-info-order{
        padding: 10px;        
    } 
    .container-info-order-left{
        z-index: 2;             
    }
    .container-info-order-right{
        z-index: 1;
    }
    .padding-0{
        padding: 0;
    } 
    .margin-0{
        margin: 0;
    }
    .item-shop-order{
        position: relative;
        border: #c0c0c0 1px solid;
        border-radius:10px; 
        margin: 5px;
        margin-top:20px; 
        padding-top: 15px;
        margin-bottom:30px;  
        background-color: white;             
    }
    .item-shop-order-title{
        position: absolute;
        display: block;
        padding: 0 4;
        top: -20;
        left: 10;
        background-color: white; 
        font-size: 17px; 
        font-weight: 550;      
        color: darkgoldenrod
    }
    .item-shop-order-custom-line{
        border-top: 1px solid #ffc2c2;
        position: relative;                 
        margin-bottom:4px; 
        z-index: 1;
    }
    .item-shop-order-setup-info-data-total,
    .item-shop-order-setup-info-title-total,
    .item-shop-order-setup-info-title{
        font-weight: 600;  
        position: absolute;
        z-index: 2;                 
        background-color: white;  
        padding-left:3px;
        padding-right:3px; 
        padding-bottom:0;
        padding-top:0;                   

    }    
    .item-shop-order-setup-info-data-total{
        margin-top:10px; 
        font-weight: 600;
        font-size: 20px;
        color: red;
        top: -29;
        right: 0;
    }
    .item-shop-order-setup-info-title{
        right: 20;
        top: -13; 
    }
    .item-shop-order-setup-info-title-total{
        font-size: 16px;
        top: -16; 
    }
    .item-shop-order-setup-info-data{
        z-index: 999;
        float: left;
        padding: 0;
    }
    .receiver,
    .phone-number{
        color: #523c00
    }    
    .change-address-link{
        font-weight: 500;
        color: rgb(158, 126, 145);  
        background: none;
        border: none;  
        font-size: 13px;    
    }
    .item-shop-order-setup-info-id-voucher-shop,
    .item-shop-order-setup-link:hover{
        color: rgb(243, 58, 11);
    }  
    .item-shop-order-setup-info-details{
        margin-bottom: 10px; 
    }  
    .item-shop-order-setup-info-address{
        display: none
    }
    .item-shop-order-setup-info-details input{
        position: relative;
        min-height:30px;
        max-height:50px;
        width:100%;
        padding:2px 5px;        
        border-radius:5px;
        top: -2px; 
    }
    .item-shop-order-setup-info,
    .item-shop-order-products{
        position: sticky;
        top: 120px;        
        
    } 
    .item-shop-order-products{
        padding-bottom:5px; 
    }
    .total-pay-info{
        position: sticky;
        top: 100px;
        margin-bottom:20px; 
    }     
    .title-info-order{
        padding: 10px;
    }
    .box-address-shared{
        padding:10px; 
    }
    .form-switch{
        padding-left:55px; 
        font-size: 17px;
        font-weight: 550;
        color: #ffa500;
    }
    
    .total-pay-info-voucher-title{
        font-size: 17px;
    }
    .total-pay-info-all{
        padding: 20px 10px;
    }
    .total-pay-info-payment-methods{

    }
    .total-pay-info-payment-methods .total-pay-info-payment-methods-label{
        font-size: 17px;
        cursor: pointer;
    }     
    .total-pay-info-payment-methods-label label{
        cursor: pointer;
    }
    .total-pay-info-payment-methods .total-pay-info-payment-methods-input{        
        font-size: 100px; 
        float: right;
    }
    .total-pay-info-payment-methods-item{
        border: #818181 1px solid;
        border-radius: 5px;
        padding: 10 0 3 0;
        cursor: pointer;                
        margin:5px;          

    }
    .total-pay-info-payment-methods-item:hover{
        border: #ffc400 1px solid;

    }
    .total-pay-info-payment-methods-label img{              
        width:20%;         
    }
    .total-pay-info-payment-methods-input{
        padding-right:10px;         
        
    }
    .total-pay-info-payment-methods-input input{
        float: right;
        width: 20px;
        height: 20px;        
    }
    .total-pay-info-result{
        font-size: 17px;
    }    
    .total-pay-info-result-money-title{
        font-size: 20px;
    }
    .total-pay-info-result b{
        font-weight: 600;
        font-size: 16px;
    }
    .float-right{
        float: right;
        color: rgb(141, 0, 0);
    }
    .total-pay-info-result-money {
        font-size: 20px;
        color: crimson;
    }
    .button-submit-total-pay{
        height: 50px;
        font-size: 20px;
        width: 100%;
    }
    /* .item-shop-order-voucher{
        position: relative;        
    } */
    .box-option-voucher{
        position: relative;
    }
    .box-show-shop-order-option-voucher{      
        position: absolute;        
        width: 95%;
        z-index: 999999!important; 
        top: -20px;         
    }
    .box-shop-order-option-voucher{        
        border-left: #000000 solid 1px;
        border-right: #000000 solid 1px;
        border-bottom: #000000 solid 1px;
        border-radius: 10px;        
        min-height: 80px;                       
        max-height: 500px;    
        background-color: white; 
        padding: 0;                           
    }
    .box-shop-order-option-voucher-content{                               
        max-height: 340px; 
        overflow-y:auto;  
        margin-bottom:20px        
    }    
    .btn-show-box-choose-shipping-method,
    .btn-show-box-voucher-shop{
        cursor: pointer;
        background-color: white;
        border: none;        
        width: 100%;
        text-align: center        
    }
    .box-shop-order-option-voucher-search{
        padding: 10px;
    }
    .box-shop-order-option-voucher-search-input
    {
        border: #ffc400 solid 1px;
    }
    .box-shop-order-option-voucher-search button
    {
        border: #ffc400 solid 1px;
        padding: 2px;
        background-color: #ffc400;
        border-radius:5px; 
        margin-top:-2px; 
        text-align: center;  
        cursor: pointer;      
    }
    .box-shop-order-option-voucher-search button:hover
    {
        background-color: #ffbb00;
        color: #999999    
    }
    .box-shop-order-option-voucher-search .row div
    {
        padding: 2px;
    }
    .box-voucher-shop{
        border: #3f3f3f solid 1px;
        border-radius: 5px;        
        height: auto;
        padding: 2px;
        position: relative;        
        z-index: 9;
    }
    .box-voucher-shop-disabled{        
        background: #dddddd;
        opacity: 0.6;
    } 
    .box-voucher-shop-hover{
        cursor: pointer;
    }
    .box-voucher-shop-hover:hover{
        border-color:#ffbb00; 
    }    
    .item-voucher-avatar{
        height: 80px;
        width: 30%;
        padding: 10;
        float: left;        
    }
    .item-voucher-avatar-image{
        width: 100%;
        height: 100%;
        border-radius:50%; 
    }
    .item-voucher-content{
        width: 70%;
        float: right;
        padding: 5px 10px;
        border-left: #AAAAAA dashed 1px;
    }
    .clear-both{
        clear: both;
    }
    .item-voucher-content-title{
        font-size: 13px;
        color: #7e7e7e;        
    }
    .item-voucher-content-duration{
        color: crimson;        
    }
    .box-voucher-shop-option{
        position: relative; 
        margin-bottom:10px;        
    }      
    .item-voucher-radio-select{        
        position: absolute !important;        
        width: 20px !important;
        top: 5 !important;
        right: 10;
        z-index: 9 ;
        float: right;
    }
    .item-voucher-review-need-more{
        border-left: red solid 1px;
        border-right: red solid 1px;
        border-bottom: red solid 1px;
        background-color: #ffcccc;
        margin-top:-1px; 
        color: crimson; 
        padding: 2px;
        text-align: center;
        font-size: 12px;
        border-radius: 4px;
        position: relative;
        z-index: 1;
    }
    .item-address-type{
        background-color:orange;
        text-align:center; 
        width: 120px; 
        border-radius: 5px; 
        color: #FFf;
        margin-left: 10px;
        margin-right: 10px;
    }

    




    .item-address{
        border: #ffffff 1px solid;
        margin-top:10px;
        position: relative;
        padding: 10px 0px;
        cursor: pointer;
    }                                    
    .item.item-address{
        border-top-left-radius: 20px;
        border-bottom-right-radius: 20px;
    }
    .item-address-phone,
    .item-address-receiver{
        font-weight: 600;
        font-size: 17px;
    }
    .item-address-phone{
        color: #ffa500
    }                                                                                                       
    .item-address-material{
        color:#696969;                
    }       
    .item-address-mesage{
        color:#999999;
        font-style: italic;
        font-size: 13px;        
    } 
    .btn-address-update{
        color: white;
    } 
    .item-address:hover{
        border: #ffbb00 1px solid;
    }
    .item-address:hover .item-address-default-title{
        border-top: #ffbb00 1px solid;
        border-right: #ffbb00 1px solid;
    }
    .item-address:hover  .btn-address-update{
        color: #000000;
    }
    .btn-address-update:hover{
        color: #ff7300;
    }
    .item-address-default-title{
        position: absolute;
        background-color: red;
        top:-11;
        right: -1;                                        
        width: 100px;
        border: crimson 1px solid;
        border-top-right-radius: 5px;
        border-bottom-left-radius: 10px;
        color: white;
        padding: 3px 0px;
        text-align: center;
    }                      
    .item-address-radio{
        position: absolute;
        right: 15px;
        bottom: 15px;
        width: 18px;
        height: 18px;
    }
    .line-through{
        text-decoration: line-through;
        color: #bababa;
    }
    .one-address-for-all{
        font-size:20px; 
    }
    #box-order-packages{
        position: sticky;        
        top: 100px;
        min-height: 450px;
    }
    .one-shipping-method-for-all{
        color: #062f74;
    }
    .change-address-link{
        cursor: pointer;
    }
    #shopbee-voucher-code{
        border:1px solid #000000;
        border-radius: 5px;
        text-align: center;
        color: #696969;
        cursor: pointer;
        padding: 5px;  
        transition: all 0.3s;     
    }
    .btn-choose-shopbee-voucher{
        border: none;
        background-color: white;  
        font-size: 14px;      
    }
    .btn-choose-shopbee-voucher:hover{
       color: #ff7300;
    }
    #shopbee-voucher-code:hover{
        border-color: #ff7300;
    }
    .item-shop-order-product-title{
        font-size: 15px;
        font-weight: 600;
        height: 20px;
    }
</style>
<section class="new_arrivals_area section-padding-30 clearfix">
    <div class="container-custom">
    <div style="margin-top:10px">
        <div class="row" >
            <div class="col-lg-8 col-12 container-info-order container-info-order-left ">                                               
                <div class="item" id="box-order-packages">
                    <h5 class="title-info-order">Thông tin đơn hàng</h5> 
                    <script>
                        
                    </script>                                       
                </div>       
            </div>
            <div class="col-lg-4 col-12 container-info-order container-info-order-right" >                
                <div class="total-pay-info">
                    <div class="box-address-shared item">                        
                        <div class="row">
                            <div class="form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="one-address-for-all">
                                <label class="form-check-label one-address-for-all" for="one-address-for-all"><span id="title-address-for-all"> Một địa chỉ cho tất cả </span><img src="{{ asset('FE/img/core-img/icon-location.svg') }}"> </label>
                            </div>                                                       
                        </div>                                                                       
                    </div>
                    {{-- <div class="box-shipping-method-shared item">                        
                        <div class="row">
                            <div class="form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" id="one-shipping-method-for-all">
                                <label class="form-check-label one-shipping-method-for-all" for="one-shipping-method-for-all"><span id="title-shipping-method-for-all">Một vận chuyển cho tất cả</span> <img src="{{ asset('FE/img/core-img/icon-shipping.svg') }}"> </label>
                            </div>                                                       
                        </div>                                                                       
                    </div> --}}
                    <div class="item total-pay-info-all">                                                                       
                        <div class="">
                            <div class="row">
                                <div class="col-lg-12 col-md-5 total-pay-info-voucher-title">
                                    <i class="bi bi-currency-exchange"></i> <span>Voucher</span> <button class="btn-choose-shopbee-voucher" data-bs-toggle="modal" data-bs-target="#modal-shopbee-voucher">Chọn</button>
                                </div>
                                <div class="col-lg-12 col-md-7 w-100">
                                    <div id="shopbee-voucher-code" title="Chọn/Nhập mã" data-bs-toggle="modal" data-bs-target="#modal-shopbee-voucher">
                                        Chọn/Nhập mã
                                    </div>
                                    {{-- <input type="text" class=" btn btn-outline-warning w-100" name="ma_voucher_apply" id="shopbee-voucher-code" data-bs-toggle="modal" data-bs-target="#modal-shopbee-voucher" placeholder="Chọn/Nhập mã" readonly> --}}
                                </div>
                            </div>
                            <hr>
                            <div class="row">
                                <h5>Phương thức thanh toán</h5>                                
                                <div class="row total-pay-info-payment-methods" id="box-payment-methods">                                    
                                    <div class="col-lg-12 col-sm-6 padding-0">
                                        <div class=" row total-pay-info-payment-methods-item padding-0">
                                            <div class="col-11 total-pay-info-payment-methods-label"  >
                                                <label for="thanh_toan1"> <img src="{{ asset('pay\momo.png')}}" alt="" style="background-size: cover"> Thanh toán khi nhận hàng
                                                </label>                                         
                                            </div>
                                            <div class="col-1 padding-0 total-pay-info-payment-methods-input">
                                                <input  type="radio" name="thanh_toan" id="thanh_toan1" value="option1">
                                            </div>
                                            <br>                                    
                                        </div>     
                                    </div>
                                    <div class="col-lg-12 col-sm-6 padding-0">
                                        <div class=" row total-pay-info-payment-methods-item padding-0">
                                            <div class="col-11 total-pay-info-payment-methods-label"  >
                                                <label for="thanh_toan1"> <img src="http:\\shopbee.local\pay\momo.png" alt="" style="background-size: cover"> Thanh toán khi nhận hàng
                                                </label>                                         
                                            </div>
                                            <div class="col-1 padding-0 total-pay-info-payment-methods-input">
                                                <input  type="radio" name="thanh_toan" id="thanh_toan1" value="option1">
                                            </div>
                                            <br>                                    
                                        </div>     
                                    </div>
                                    <div class="col-lg-12 col-sm-6 padding-0">
                                        <div class=" row total-pay-info-payment-methods-item padding-0">
                                            <div class="col-11 total-pay-info-payment-methods-label"  >
                                                <label for="thanh_toan1"> <img src="http:\\shopbee.local\pay\momo.png" alt="" style="background-size: cover"> Thanh toán khi nhận hàng
                                                </label>                                         
                                            </div>
                                            <div class="col-1 padding-0 total-pay-info-payment-methods-input">
                                                <input  type="radio" name="thanh_toan" id="thanh_toan1" value="option1">
                                            </div>
                                            <br>                                    
                                        </div>     
                                    </div>                                                                   
                                </div>
                            <hr>
                            <div class="row total-pay-info-result">
                                <div class="col-5">
                                    <b>Tạm tính</b>
                                </div>
                                <div class="col-7">
                                    <b class="float-right" id="total">999.999.999đ</b>
                                </div>
                                <div class="col-5">
                                    <b>Phí vận chuyển</b>
                                </div>
                                <div class="col-7">
                                    <b class="float-right" id="transport-cost">999.999.999đ</b>
                                </div>
                                <hr>
                                <div class="row">
                                    <b>Giảm giá:</b>
                                </div>
                                <div class="col-5">
                                    <span>Đơn hàng:</span>
                                </div>
                                <div class="col-7">
                                    <b class="float-right" id="discount_don_hang">-0đ</b>
                                </div>
                                <div class="col-5">
                                    <span>Vận chuyển:</span>
                                </div>
                                <div class="col-7">
                                    <b class="float-right" id="discount_phuong_thuc_van_chuyen">-0đ</b>
                                </div>
                                <div class="col-5">
                                    <b>Tổng giảm giá</b>
                                </div>
                                <div class="col-7">
                                    <b class="float-right" id="discount">-0đ</b>
                                </div>
                                <hr>
                                <div class="col-5 total-pay-info-result-money-title">
                                    <strong>Thành tiền</strong>
                                </div>
                                <div class="col-7">
                                    <strong class="float-right total-pay-info-result-money" id="total-pay-info-result-money">999.999.999đ</strong>
                                </div>
                            </div>
                        </div>                                        
                        </div>                
                    </div>                    
                        <button class="item btn btn-outline-warning button-submit-total-pay">ĐẶT HÀNG</button>                    
                </div>
            </div>
        </div>




    
    <style>
        .shopbee-voucher-name{
            font-size: 18px;
            color: #ffa500;
        }
        .shopbee-voucher-quantity-title{
            color: #525252;
        }
        .shopbee-voucher-box-code{
            height: 140px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;            
            font-size: 20px;
        }
        .shopbee-voucher-radio{
            position: absolute;
            right: 10;
            bottom: 10;
            width: 20px;
            height: 20px;
        }
        .shopbee-voucher-box-timeout{            
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            background-color: #f6dbe0;
            color: red;
            text-align: center;    
            position: absolute;    
            width: 100%;
            margin-left:2.5px;     
            top: -5;
            left: 50%;
            transform: translateX(-50%);
        }
        .shopbee-voucher-timeout{
            color: red; 
            width: 100%;
            text-align: center;
            font-size: 15px;
        }
        .shopbee-voucher-box-quantity{
            position: absolute;
            bottom: 0;
            left: -15;
            border-top-left-radius:10px;
            border-bottom-right-radius:10px;
            background-color: #d0d0d0;
            box-shadow: 2px 2px 2px #a5a5a5;
            display: flex;
            justify-content: center;                        
            width: 100%;

            padding: 5px;             
        }
        .voucher{
            position: relative;
            margin-top: 10px;
            padding-left:15px; 
            cursor: pointer;
        }
        
        .shopbee-voucher-unqualified{
            color: red; 
            background-color:#f6dbe0; 
            text-align:center; 
            border-bottom-left-radius:5px; 
            border-bottom-right-radius:5px; 
            font-size: 14px; 
            padding: 5px 0px; 
            margin-top:-18px; 
            border-left: 1px solid crimson; 
            border-right: 1px solid crimson; 
            border-bottom: 1px solid crimson; 
        }
        .item.voucher-disabled{
            background-color: #fdd8d8;
            opacity: 0.7;            
        }
        .box-show-shopbee-voucher-type{
            padding-bottom:20px; 
            border-bottom: 1px solid #bababa;
        }
        .item-title-shopbee-voucher-type{
            margin-top:10px; 
        }
        .shopbee-voucher-type{
            color: #ff8400;
            font-size: 15px;
        }
        .title-shopbee-voucher-is-empty{
            display: none;
        }
    </style>
    <div class="modal fade" id="modal-shopbee-voucher" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Chọn Voucher</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="height:500px; overflow-y: auto">
                    <form>
                        <div class="mb-3">                            
                            <input type="text" style="position:sticky; height:40px; top:-17px; z-index:10;" id="input-search-shopbee-voucher" maxlength="70" placeholder="Nhập mã Voucher" class="form-control">
                            <div id="box-show-shopbee-voucher">     
                                


                                <div class="box-show-shopbee-voucher-type">
                                    <div class="item-title-shopbee-voucher-type">
                                        <span class="shopbee-voucher-type">Mã miễn phí vận chuyển</span>
                                    </div>
                                    <div class="box-show-shopbee-voucher">



                                        <div class="voucher">
                                            <div class="item pad w-100">
                                                <div class="row">
                                                    <div class="col-6" style="border-right:1px dashed #999999; padding: 0px 5px;">
                                                        <span class="shopbee-voucher-name">TenKhuyenMai</span><br />
                                                        <a>
                                                            Giảm 
                                                            <span class="shopbee-voucher-discount-rate">
                                                                10
                                                            </span>%, tối đa 
                                                            <span class="shopbee-voucher-maximum-reduction">
                                                                100k
                                                            </span> cho đơn hàng từ 20k
                                                        </a><br />
                                                        <div class="shopbee-voucher-box-quantity">
                                                            <span class="shopbee-voucher-quantity-title">Còn: <span class="shopbee-voucher-quantity">999</span></span>
                                                        </div>
                                                    </div>
                                                    <div class="col-6 p-0">
                                                        <div class="shopbee-voucher-box-timeout">
                                                            <span class="shopbee-voucher-timeout">10/06/20023 - 20/10/2023</span>
                                                        </div>
                                                        <div class="shopbee-voucher-box-code">
                                                            <strong class="shopbee-voucher-code">daylâmvoucher</strong>
                                                        </div>
                                                        <input class="form-check-input shopbee-voucher-radio" id="item.MaGiamGia" type="radio" name="ma_voucher" value="item.MaVoucher">
                                                    </div>
                                                </div>
                                            </div>                                        
                                                <div class="shopbee-voucher-unqualified">
                                                    Mua thêm 100k nữa để có thể sử dụng được Voucher này!!
                                                </div>                                        
                                        </div>


                                    </div>                                    
                                </div>

                                
                                
                                


                            </div>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-secondary"  data-bs-dismiss="modal">Đóng</button>
                    <button class="btn btn-warning" data-bs-dismiss="modal" id="btn-apply-shopbee-voucher">Áp dụng</button>
                </div>
            </div>
        </div>
    </div>











    {{-- chổ lấy địa chỉ --}}
    <div class="modal fade" id="modal-choose-address" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Địa chỉ của tôi</h1>
                    <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="height:500px;">
                    <div class="mb-3">
                        <div id="box-address-list">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline-warning itemm btn_dc" id="btn-add-address" data-bs-toggle="modal" data-bs-target="#box-update-address" style="position:absolute; left:5px; margin: 10px; height: 40px; font-size: 18px;">
                        <svg style="margin-bottom:4px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                            <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                        Thêm địa chỉ
                    </button>
                    <a class="btn btn-secondary" id="btn-confirm-cancel-address" data-bs-dismiss="modal">Đóng</a>
                    <a class="btn btn-warning" data-bs-dismiss="modal" id="btn-confirm-address">Xác nhận</a>
                </div>
            </div>
        </div>
    </div>
</div>





<style>
    .item-shipping-method{
        padding: 10px;
        border: 1px solid #aaaaaa;
        border-left: 7px solid;
        border-top-right-radius: 10px;
        border-bottom-right-radius: 10px;
        cursor: pointer;
        margin-bottom: 10px; 

    }    
    .shipping-method-name{
        font-size: 17px;
        font-weight: 500;
    }
    .shipping-method-fee{
        color: red;
    }
    .shipping-method-estimate-time-title{
        color: #696969;
    }
    .item-shipping-method-left{
        float: left;
    }
    .item-shipping-method-right{
        float: right;
    }
    .item-shipping-method.active{
        border-left: 7px solid crimson;
    }
    .item-shipping-method:hover{
        border-top: 1px solid #ffc400;
        border-right: 1px solid #ffc400;
        border-bottom: 1px solid #ffc400;
        border-left: 7px solid #ffc400;
    }
    .item-shipping-method.active:hover{
        border-color:#ff6600; 
    }
    .shipping-method-co-check{
        color: #aaaaaa;
        font-style: italic;
    }
</style>


{{-- chổ lấy phương thức vận chuyển --}}
<div class="modal fade " id="shipping-method" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Phương thức vận chuyển</h1>
          <button type="button" class="btn-close" id="btn-close-box-shipping-method" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body" id="box-show-shipping-method" style="height:500px; overflow-y: auto">
            <div class="item-shipping-method active">                
                <div class="item-shipping-method-left">
                    <span class="shipping-method-name">Tên phương thức vận chuyển</span> | -<span class="shipping-method-fee">000.000đ</span>
                    <br>
                    <span class="shipping-method-estimate-time-title">Nhận hàng vào khoảng <span class="shipping-method-estimate-time">0</span> ngày nữa</span>
                </div>
                <div class="item-shipping-method-right"> 
                    <input type="radio" name="phuong_thuc_van_chuyen_id" id="">                  
                </div>
                <div style="clear: both"></div>
            </div>          
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Đóng</button>
          <button type="button" class="btn btn-primary" id="btn-confirm-shipping-method">Lưu</button>
        </div>
      </div>
    </div>
  </div>

  @include("personal.address.layout_update_address")

</section>
<script  rel="stylesheet" src="{{asset('js/call_api/checkout011.js')}}"></script>
@endsection
