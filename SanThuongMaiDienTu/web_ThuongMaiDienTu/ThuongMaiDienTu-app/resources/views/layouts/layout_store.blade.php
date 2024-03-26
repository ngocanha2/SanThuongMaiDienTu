@extends('layouts.app')
@section('main')
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://unpkg.com/@phosphor-icons/web"></script>
    <link href="{{ asset('css/library/sidebar-store.css') }}" rel="stylesheet">
    <style>
        .conteiner-store{
            padding-left:100px; 
        }
        .box-shadow,
        .item {
            background-color: white;
            border-radius: 10px;
            box-shadow: 1px 4px 10px #AAAAAA;
        }
    </style>
</head>
<body>
    <div class="container-setup">
        <div class="sidebar active"> 
            <div class="menu-btn">
                <i class="ph-bold ph-caret-left"></i>
            </div>
            <div class="head">
                <div class="user-img">
                    <img src="#" alt="">
                </div>
                <div class="user-details">
                    <p class="title">web dev</p>
                    <p class="name">Crustea</p>
                </div>
            </div>
            <div class="nav-store">
                <div class="menu">
                    <p class="title">
                        Main
                    </p>
                    <ul>
                        <li id="menu-product">
                            <a href="#">
                                <i class="icon ph ph-chart-pie-slice"></i>
                                <span class="text">Sản phẩm</span>
                                <i class="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul class="sub-menu">
                                <li id="menu-product-all">
                                    <a href="/cua-hang/san-pham">
                                        <span class="text">Tất cả sản phẩm</span>
                                    </a>
                                </li>
                                <li id="menu-product-create">
                                    <a href="/cua-hang/san-pham/them-san-pham">
                                        <span class="text">Thêm sản phẩm</span>
                                    </a>
                                </li>                                
                            </ul>                            
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon ph-bold ph-user"></i>
                                <span class="text">Khuyến mãi</span>
                                <i class="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="{{route("store-voucher")}}">
                                        <span class="text">Khuyến mãi của tôi</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="{{route("store_create_voucher")}}">
                                        <span class="text">Tạo mới</span>
                                    </a>
                                </li>                               
                            </ul>                            
                        </li>
                        <li>
                            <a href="{{route("store_order")}}">
                                <i class="icon ph-bold ph-file-text"></i>
                                <span class="text">Đơn hàng</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon ph-bold ph-user"></i>
                                <span class="text">Tài chính</span>
                                <i class="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="#">
                                        <span class="text">Doanh thu</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="text">Ngân hàng</span>
                                    </a>
                                </li>   
                                <li>
                                    <a href="#">
                                        <span class="text">Thanh toán</span>
                                    </a>
                                </li>                            
                            </ul>                            
                        </li>
                        <li >
                            <a href="#">
                                <i class="icon ph-bold ph-file-text"></i>
                                <span class="text">Dữ liệu</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <i class="icon ph-bold ph-chart-bar"></i>
                                <span class="text">Khách hàng</span>
                                <i class="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="#">
                                        <span class="text">Khách hàng đã mua</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="text">Trợ lý chat</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="text">Hỏi đáp</span>
                                    </a>
                                </li>                                
                            </ul>                            
                        </li>
                    </ul>
                </div>
                <div class="menu">
                    <p class="title">
                        Cài đặt
                    </p>
                    <ul>
                        <li>
                            <a href="#">
                                <i class="icon ph-bold ph-gear"></i>
                                <span class="text">Cửa hàng</span>
                                <i class="arrow ph-bold ph-caret-down"></i>
                            </a>
                            <ul class="sub-menu">
                                <li>
                                    <a href="#">
                                        <span class="text">Hồ sơ</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="text">Đánh giá</span>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <span class="text">Thiết lập</span>
                                    </a>
                                </li>                                
                            </ul>    
                        </li>                                                
                    </ul>
                </div>
            </div>
            <div class="menu">
                <p class="title">
                    Tài khoản
                </p>
                <ul>
                    <li>
                        <a href="#">
                            <i class="icon ph-bold ph-info"></i>
                            <span class="text">Giúp đở</span>
                        </a>
                    </li>   
                    <li>
                        <a href="#">
                            <i class="icon ph-bold ph-sign-out"></i>
                            <span class="text">Đăng xuất</span>
                        </a>
                    </li>                                                
                </ul>
            </div>
        </div>
    </div>
    <div class="conteiner-store">
        <div class="container">
            @yield("content")
        </div>
    </div>
    <script src="{{asset('js/library/sidebar-store1.js')}}"></script>
</body>
</html>
@endsection