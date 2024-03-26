@extends('layouts.app')
@section('main')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    {{-- <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.1/font/bootstrap-icons.css">     --}}

    <!-- Title  -->
    <title>Shopbee - Trang chủ</title>
    <!-- Favicon  -->
    <link rel="icon" href="{{ asset('system/logo2.png') }}">

    <!-- Core Style CSS -->
    <link rel="stylesheet" href="{{ asset('FE/css/core-style.css') }}">
    <link rel="stylesheet" href="{{ asset('FE/style.css') }}">
    <link rel="stylesheet" href="{{ asset('FE/css/fe1.css') }}">

    {{-- <link rel="stylesheet" href="{{ asset('owlcarousel/assets/owl.carousel.min.css')}}" type="text/css">
    <link rel="stylesheet" href="{{ asset('owlcarousel/assets/owl.theme.default.min.css')}}" type="text/css"> --}}
    {{-- <script src="{{ asset('BE/ckeditor/ckeditor.js') }}"></script>
      <script>
        CKEDITOR.replace('editor');
        CKEDITOR.replace('editor1');
      </script> --}}


    <script src="{{ asset('js/call_api/product1.js') }}"></script>
    <style>
        .cart{
            position: fixed;
            top: 10px;
            right: 10px;
            z-index: 999;
        }
        .cart-area{             
            position: absolute;
            display: block;
            height: 80px;
            width: 80px;
            top: 0; right: 0;
            z-index: 999999;
            display: flex;
            align-items: center;
            justify-content: center;            
            cursor: pointer;

        }  
        .bgr-black{
            background: rgba(0, 0, 0, 0.9);
            border-bottom-left-radius:30%; 
            border-top-left-radius:30%; 
        }
        .essenceCartBtn{            
            z-index: 9999;           
        }
    .search-box{
        flex: 1;
        position: relative;
        padding-left:40px;
        padding-right:40px;   
        width: 100%; 
    }
    .search-box input{        
        height: 40px;
        border: none;
        outline: none;
        background:#f2f2f2;
        border-radius: 30px;
        color:gray;
        font-size: 16px;
        padding-left: 5px;
        padding-right: 40px;
        text-align: center;
        
    }
    
    .search-box button{
        cursor: pointer;        
        height: 40px;
        border-radius: 30px;
        border:none;        
        top:0;
        right: 0;
        transform: scale(0.9);
        background: gold;
        color: #fff;
    }  
    #notification-cart{
        position: absolute;
        color: white;
        background-color: crimson;
        border-radius:10px;
        font-size: 12px;
        padding: 2px;
        top: 17px;
        left: 43px;
        min-width: 22px;
        text-align: center
    }  
    .item-user{
                position: relative;
            }
            .item-user:hover .menu-presonal{
                display: block;
            }
            .item-user .menu-presonal{
                position: absolute;
                top: 80;
                right: -15;
                width: 150px;
                padding: 0px;
                background-color: gold;
                border-radius: 5px;
                display: none
            }
            .item-user .menu-presonal li a{
                color: #000;
                padding: 10px 18px;   
                width: 100%;                      
            }
            .item-user .menu-presonal li a.line{
                border-top: 1px solid #ffae00;  
            }
            .item-user .menu-presonal li a:hover{
                background-color: rgb(252, 237, 153);
                border-radius: 5px;
            }
    </style>
</head>

<body>        
    <!-- ##### Header Area Start ##### -->
    <header class="header_area">
        <div class="classy-nav-container ">
            <!-- Classy Menu -->
            <link rel="stylesheet" href="/css/library/navbar2.css">
    <header class="main-header">
        <div class="logo">
            <a class="nav-brand" href="{{ URL::to('/') }}"><img style="width: 60px;" src="{{ asset('system/logo2.png') }}" alt=""></a>
        </div>
        <form class="search-box row">
            {{-- <form class="row p-0"> --}}
                <input class="col-xl-11 col-md-10 col-9 p-0" type ="text" name ="search" id ="search" placeholder="Search">
                <button class="col-xl-1 col-md-2 col-2 p-0" type ="submit"><i class="fa fa-search"></i></button>
                <a href="/cua-hang" style="font-size:13px; ">Người mua cũng bán hàng</a>               
            {{-- </form> --}}
        </form>
        <input type="checkbox" class="menu-btn" name="" id="menu-btn">
        <label for="menu-btn" class="menu-icon">      
            <span class="menu-icon__line"></span>
        </label>  
        <ul class="p-0" id="ul-user" style="display: {{Auth::check() ? "block" : "none"}}">
            <li class="item-user">                                            
                <i class="fa fa-user" style="font-size: 40px; margin-top:40px; color:#ffae00; height: 100px;"></i>                        
                <span style="position: relative;">                            
                    <a href="/trang-ca-nhan" id="username-show" style="position: absolute; top:-18px;">{{Auth::check() ? auth()->user()->ten_dang_nhap : ""}}</a>                            
                    <span style="opacity: 0" id="username-hidden">{{Auth::check() ? auth()->user()->ten_dang_nhap : ""}} </span>   
                    <a style="position: absolute; left:50%; top:-5;"><i class="fa fa-caret-down" style="color: #f2f2f2; font-size: 30px;"></i></a>                         
                </span>                        
                <ul class="menu-presonal">
                    <li><a href="/trang-ca-nhan">Trang cá nhân</a></li>
                    <li ><a class="line" href="/auth/dang-xuat">Đăng xuất</a></li>
                </ul>                        
            </li>
        </ul> 
        <ul class="nav-links">  
            <li>
                <i style="margin-top:10px;"></i>        
            </li>  
            <li class="nav-link">
                <a href="#">Danh mục</a>
            </li>
            <li class="nav-link">
                <a href="/tat-ca-san-pham">Sản phẩm</a>
            </li>                                                              
        </ul>
    </header>
    <div id="essenceCartBtn">
        <div href="#" class="cart-area" >
            <img style="width: 20px;" id="img-cart" src="{{ asset('FE/img/core-img/bag.svg') }}" alt="Giỏ hàng">
            <div id="notification-cart">.</div>
        </div>        
    </div>     
        </div>
    </header>
   
    <!-- ##### Header Area End ##### -->

    <!-- ##### Right Side Cart Area ##### -->
    {{-- <div class="cart-bg-overlay cart-bg-overlay-on"></div>

    <div class="right-side-cart-area cart-on"> --}}

        <div class="cart-bg-overlay"></div>

    <div class="right-side-cart-area">
        <!-- Cart Button -->
        <div class="cart-button">            
           <br><a href="#" style="background: none" id="rightSideCart"><img src="{{ asset('FE/img/core-img/bag.svg') }}" alt=""> <span></span></a>
        </div>        
            {{-- Login/Logout --}}
            @include('layouts.cart')
            {{-- Login/Logout --}}
            {{-- ------------- --}}
            {{-- Cart --}}
            {{-- Cart --}}
        </div>
    </div>
    <!-- ##### Right Side Cart End ##### -->

    <!-- ##### Welcome Area Start ##### -->
    {{-- @yield('slider') --}}
    <!-- ##### Welcome Area End ##### -->    
    <div style="padding-top:70px; ">
        @yield('content')    
    </div>
    <!-- ##### Footer Area Start ##### -->
    <footer class="footer_area clearfix">
        <div class="container">
            <div class="row">
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area d-flex mb-30">
                        <!-- Logo -->
                        <div class="footer-logo mr-50">
                        </div>
                        <!-- Footer Menu -->
                        <div class="footer_menu">
                            <ul>
                                <li><a href="shop.html">Mua sắm</a></li>
                                <li><a href="blog.html">Bài viết</a></li>
                                <li><a href="contact.html">Liên hệ</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area mb-30">
                        <ul class="footer_widget_menu">
                            <li><a href="#">Đơn hàng</a></li>
                            <li><a href="#">Thanh toán</a></li>
                            <li><a href="#">Giao hàng</a></li>
                            <li><a href="#">Hướng dẫn</a></li>
                            <li><a href="#">Chính sách bảo mật</a></li>
                            <li><a href="#">Điều khoản và điều kiện</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="row align-items-end">
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area">
                        <div class="footer_heading mb-30">
                            <h6>Gửi email:</h6>
                        </div>
                        <div class="subscribtion_form">
                            <form action="#" method="post">
                                <input type="email" name="mail" class="mail" placeholder="Viết gì đó...">
                                <button type="submit" class="submit"><i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
                <!-- Single Widget Area -->
                <div class="col-12 col-md-6">
                    <div class="single_widget_area">
                        <div class="footer_social_area">
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Facebook"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Instagram"><i class="fa fa-instagram" aria-hidden="true"></i></a>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Twitter"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Pinterest"><i class="fa fa-pinterest" aria-hidden="true"></i></a>
                            <a href="#" data-toggle="tooltip" data-placement="top" title="Youtube"><i class="fa fa-youtube-play" aria-hidden="true"></i></a>
                        </div>
                    </div>
                </div>
            </div>
<div class="row mt-5">
                <div class="col-md-12 text-center">
                    <p>
                        <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
    Bản quyền &copy;<script>document.write(new Date().getFullYear());</script> Chịu trách nhiệm <i class="fa fa-heart-o" aria-hidden="true"></i> bởi <a href="#" target="_blank">Lê Phát Đạt</a>, liên hệ công việc <a href="#" target="_blank">Datlvnttan@gmail.com</a>
    <!-- Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. -->
                    </p>
                </div>
            </div>

        </div>
    </footer>
    <!-- ##### Footer Area End ##### -->

    <!-- jQuery (Necessary for All JavaScript Plugins) -->
    <!-- Popper js -->
    {{-- <script src="{{ asset('FE/js/popper.min.js') }}"></script>
    <!-- Bootstrap js -->
    <script src="{{ asset('FE/js/bootstrap.min.js') }}"></script> --}}
    <!-- Plugins js -->
    {{-- <script src="{{ asset('FE/js/plugins.js') }}"></script> --}}
    <!-- Classy Nav js -->
    <script src="{{ asset('FE/js/classy-nav.min.js') }}"></script>
    <!-- Active js -->
    <script src="{{ asset('FE/js/active.js') }}"></script> 
    <script src="/js/library/navbar2.js"></script>
    <script src="{{ asset('owlcarousel/owl.carousel.min.js')}}"></script>
    <script>
            $('.owl-carousel').owlCarousel({
                loop:true,
                margin:10,
                nav:true,
                navText: [`<img  src="${URL_HOST}FE/img/core-img/chevron-left.svg" class="chevron-left" alt="">`, `<img class="chevron-right" src="${URL_HOST}FE/img/core-img/chevron-right.svg" alt="">`],
                dots:false,
                responsive:{
                    0:{
                        items:1
                    },
                    600:{
                        items:3
                    },
                    1000:{
                        items:5
                    }
                }
            })
    </script>
</body>

</html>
@endsection