@extends('layouts.app')
@section('main')
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="description" content="">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.1/font/bootstrap-icons.css">    

    <!-- Title  -->
    <title>Shopbee - Trang chủ</title>
    <!-- Favicon  -->
    <link rel="icon" href="{{ asset('system/logoShopbee.png') }}">

    <!-- Core Style CSS -->
    <link rel="stylesheet" href="{{ asset('FE/css/core-style1.css') }}">
    <link rel="stylesheet" href="{{ asset('FE/style.css') }}">
    <link rel="stylesheet" href="{{ asset('FE/css/fe.css') }}">
    {{-- <script src="{{ asset('BE/ckeditor/ckeditor.js') }}"></script>
      <script>
        CKEDITOR.replace('editor');
        CKEDITOR.replace('editor1');
      </script> --}}


    <script src="{{ asset('js/call_api/product.js') }}"></script>
</head>

<body>        
    <!-- ##### Header Area Start ##### -->
    <header class="header_area">
        <div class="classy-nav-container breakpoint-off d-flex align-items-center justify-content-between">
            <!-- Classy Menu -->
            <nav class="classy-navbar" id="essenceNav">
                <!-- Logo -->
                  <a class="nav-brand" href="{{ URL::to('/') }}"><img style="height: 35x; width: 85px;" src="{{ asset('system/logoShopbee.png') }}" alt=""></a>
                <!-- Navbar Toggler -->
                <div class="classy-navbar-toggler">
                    <span class="navbarToggler"><span></span><span></span><span></span></span>
                </div>
                <!-- Menu -->
                <div class="classy-menu">
                    <!-- close btn -->
                    <div class="classycloseIcon">
                        <div class="cross-wrap"><span class="top"></span><span class="bottom"></span></div>
                    </div>
                    <!-- Nav Start -->
                    <div class="classynav">
                        <ul>
                            <li>
                                    <a href="#">Danh mục</a>
                                <div class="megamenu">   
                                    {{-- @foreach($category as $key => $cate)
                                    <ul class="single-mega cn-col-4">
                                        <a href="{{ URL::to('danh-muc-san-pham',$cate->idCategory) }}" style="font-size:16px; font-weight:bold" class="title">{{ $cate->nameCategory }}</a>                                            
                                    </ul> 
                                     @endforeach   --}}                                                                    
                                </div>
                            </li>
                            <li> <a href="{{ URL::to('tat-ca-san-pham?page=1') }}">Sản phẩm</a></li>
                            {{-- <li> <a href="#">Sale off</a></li>
                            <li> <a href="#">Liên hệ</a></li>
                            <li> <a href="#">Đối tác</a></li> --}}
                            {{-- <li>
                                <a class="nav-link active gio" aria-current="page">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-ui-checks-grid" viewBox="0 0 16 16">
                                        <path d="M2 10h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm9-9h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm0 9a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-3zm0-10a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2h-3zM2 9a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H2zm7 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3zM0 2a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm5.354.854a.5.5 0 1 0-.708-.708L3 3.793l-.646-.647a.5.5 0 1 0-.708.708l1 1a.5.5 0 0 0 .708 0l2-2z" />
                                    </svg>
                                </a>
                            </li>                         --}}
                            <li>
                                <form action="/Home/TimKiem" class="d-flex search" role="search" method="post">
                                    <input class="form-control me-2 " type="search" name="txt_search" placeholder="Tìm sản phẩm, thương hiệu tương ứng" aria-label="Search" style="margin-left:5px;">
                                    <button class="btn btn-outline-light" type="submit"><i class="bi bi-search"></i></button>
                                </form>
                            </li>
                        </ul>
                    </div>
                </div>
                    <!-- Nav End -->
            </nav>
            <!-- Header Meta Data -->
            <div class="header-meta d-flex clearfix justify-content-end">
                <!-- Search Area -->

                {{-- <div class="search-area">
                    <form action="" method="post">
                        {{ csrf_field() }}
                        <input type="search" name="keyword" id="headerSearch" placeholder="Type for search">
                        <button type="submit"><i class="fa fa-search" aria-hidden="true"></i></button>
                    </form>
                </div> --}}              
                <!-- Cart Area -->
                <div class="cart-area">
                    <br>
                    <a href="#" id="essenceCartBtn"><img src="{{ asset('FE/img/core-img/bag.svg') }}" alt="Giỏ hàng"> <span></span></a>
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
           <br><a href="#" id="rightSideCart"><img src="{{ asset('FE/img/core-img/bag.svg') }}" alt=""> <span></span></a>
        </div>

        <div class="cart-content d-flex">
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
        @yield('content')    
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
    <script src="{{ asset('FE/js/plugins.js') }}"></script>
    <!-- Classy Nav js -->
    <script src="{{ asset('FE/js/classy-nav.min.js') }}"></script>
    <!-- Active js -->
    <script src="{{ asset('FE/js/active.js') }}"></script> 
</body>

</html>
@endsection