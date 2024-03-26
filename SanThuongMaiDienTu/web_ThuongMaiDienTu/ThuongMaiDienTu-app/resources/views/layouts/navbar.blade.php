{{-- <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Awesome CSS Responsive Navigation menus  </title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  
    <style>
        *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Arial;
}
body{
    background: url(bg.jpg);
    background-size: cover;
    height: 100vh;
    background-position: center;
}
header{
    width:100%;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    z-index: 99;
    box-shadow: 0 0 10px #000;
    background: rgba(0,0,0,0.5);
}
#chk1{
    display: none;
     
     
}
i{
    color: #fff;
    cursor: pointer;
}
header .logo{
    flex: 1;
    color:#fff;
     
    margin-left: 50px;
    text-transform: uppercase;
    font-size: 15px;
}
header .search-box{
    flex: 1;
    position: relative;
}
.search-box input{
    width:100%;
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
    width:40px;
    height: 40px;
    border-radius: 30px;
    border:none;
    position: absolute;
    top:0;
    right: 0;
    transform: scale(0.9);
    background: green;
    color: #fff;
}
header ul {
    flex:2;
    display: flex;
    justify-content: space-evenly;
}
header ul li{
    list-style: none;
}
header ul li a{
    text-decoration: none;
    color:#fff;
    font-weight: 600;
    text-transform: uppercase;
    padding: 10px 15px;
}
header ul li a:hover{
    border-bottom: 2px solid cadetblue;
}
header .menu{
    font-size: 2.5em;
    display: none;
}
@media(max-width:1000px){
    .search-box button{
        position: absolute;
    }
    header ul{
        position: fixed;
        top:100px;
        right: -100%;
        background: rgba(0,0,0,0.5);
        height: calc(100vh - 100px);
        width:50%;
        flex-direction: column;
        align-items: center;
        transition: right 0.5s linear;
    }
     
    header .menu{
        display: block;
        width:100px;
        text-align: center;
    }
    #chk1:checked ~ ul{
        right: 0;
        
    }
  
}
@media(max-width:600px){
    header .logo{
        font-size: 10px;
        margin-left:8px;         
    }
    header ul{
        width: 100%;
    }
}
    </style>
</head>
<body>
    <header>
        <input type ="checkbox" name ="" id ="chk1">
        <div class="logo"><h1>Web Master</h1></div>
            <div class="search-box">
                <form>
                    <input type ="text" name ="search" id ="srch" placeholder="Search">
                    <button type ="submit"><i class="fa fa-search"></i></button>
                </form>
            </div>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Product</a></li>
                <li><a href="#">Blog</a></li>
                <li><a href="#">Contact</a></li>
                <li>
                    <a href="#"><i class="fa fa-facebook"></i></a>
                    <a href="#"><i class="fa fa-twitter"></i></a>
                    <a href="#"><i class="fa fa-instagram"></i></a>
                      
                </li>
            </ul>
            <div class="menu">
                <label for="chk1">
                    <i class="fa fa-bars"></i>
                </label>
            </div>
    </header>
</body>
</html> --}}




<!DOCTYPE html>
<html lang="en">
<head>
    
</head>
<body>
    <link rel="stylesheet" href="/css/library/navbar.css">
    <header class="main-header">
        <div class="logo">
            <a href="#">LOGO</a>
        </div>
        <input type="checkbox" class="menu-btn" name="" id="menu-btn">
        <label for="menu-btn" class="menu-icon">      
            <span class="menu-icon__line"></span>
        </label>  
        <ul class="nav-links">
            <li class="nav-link">
                <a href="#">About</a>
            </li>
            <li class="nav-link">
                <a href="#">Profile</a>
            </li>
            <li class="nav-link">
                <a href="#">Sevices</a>
            </li>
            <li class="nav-link">
                <a href="#">Home</a>
            </li>          
        </ul>
        {{-- <div class="cart-area">
            <br>
            <a href="#" id="essenceCartBtn"><img src="{{ asset('FE/img/core-img/bag.svg') }}" alt="Giỏ hàng"> <span></span></a>
        </div> --}}
    </header>
    <div class="hero">
        <h1>Text HERO</h1>
    </div>
     <script src="/js/library/navbar.js"></script>
</body>
</html>





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





