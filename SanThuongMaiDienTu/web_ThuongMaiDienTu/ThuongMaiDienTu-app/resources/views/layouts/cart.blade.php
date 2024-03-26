<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Document</title>
    <style>
        .box-all-product-cart a{color:black; font-size: 13px}
        #box-register{display: none;} #box-register p{line-height: 0} #box-login p{line-height: 0}
        .container-box-login{
            width: 100%; height: 100%; padding-top: 80px; 
            position: relative;
        }        

        .container-box-login h3{font-family: Arial, Helvetica, sans-serif; color: rgb(40, 40, 40)} .container-box-login h5{font-family: Arial, Helvetica, sans-serif; color: rgb(79, 79, 79); font-weight: normal}
        .input-text{border: none; border-bottom: 1px solid gray ;width: 450px; height: 40px; padding: 5px 10px; margin-bottom: 10px}.container-box-login h6{font-family: Arial, Helvetica, sans-serif; color: rgb(79, 79, 79); font-weight: normal}
        .input-text:focus{outline: none} .container-box-login .btn-login{width: 450px; height: 50px;border: none; background-color: rgb(255, 166, 0); border-radius: 4px;font-size: 17px; color: white; font-weight: 300px; margin: 30px 0;}                
        .total-all{width: 100%; height: 80px; padding: 20px 0;} .total-all .btn-login{float: right;width: 200px; height: 35px;background-color: rgb(255, 166, 0); border-radius: 4px;font-size: 13px; color: white; font-weight: 300px;margin:0;}
        .total-all .btn-login:hover{ cursor: pointer; background-color: rgb(254, 193, 79)}.total-all h6{float: right;margin: 7px 20px; color:black} .total-all span{color: red; font-weight: 300px; font-size: 20px}
        .container-box-login .lien-ket{color: rgb(68, 93, 255)}.lien-ket:hover{cursor: pointer;}
        .row{
            padding: 0; 
            margin: 0;
        }
        #box-cart{
            position: relative;
            height: 100%; 
            width: 100%; 
            display: none;
            padding-left: 10px;            
        }
        #box-cart [class*="col"] {
            padding: 0; 
            margin: 0;
        } 
        .box-check-all label,
        #check-carts-all{
            font-size:22px; 
            cursor: pointer;                        
        }        
        /* .box-check-all label:hover .box-all-product-cart{
            border: #414b07 1px solid;
        } */
        .box-check-all{
            padding-left:20px; 
        }
        .box-check-all label{
            font-weight: 400px;
            margin-left:10px; 
        }
        .checkbox-cart-shop-all{
            font-size: 20px;            
        }
        .item-product-cart-classify
        {
            font-size: 11px;
        }      
        .box-convert-select{
            position: absolute;
            top: 0;
            right: 0px;
        }        
        .box-convert-select ul{
            width: 140px;   
            margin: 0;
            list-style: none;  
            display: block;       
        }
        .box-convert-select ul li{
            width: 100%;   
            padding: 5px;                   
        }  
        .box-convert-select ul li a{
            width: 100%;  
                                
        }         
        .box-convert-select ul li a:hover{
            color: black              
        }    
        .item-convert-login li a img,     
        .box-convert-select ul li a img{
            width: 20px;            
            margin-bottom: 7px;
        }         
        .cart-item-product:hover{
            background-color: rgb(243, 243, 243); 
            border-radius:5px;            
        }  

        .cart-item-shop{
            border: 1px solid white;
            border-radius: 5px;                                    
        }        
        .cart-btn-delete-shop{
            background-color: rgb(209, 91, 115);
            border:1px solid rgb(209, 91, 115);
            top: 0;
            right: 0;
            position: absolute; 
            height: 50px; 
            width: 50px;          
            padding: 20px;
            opacity: 0;
            cursor: pointer;
            border-bottom-left-radius:15px; 
            border-top-right-radius: 3px;
            z-index: 99;
        }
        .cart-btn-delete-shop:hover{
            border:1px solid #0e0601;
        }
        .cart-btn-delete-item{
            top: 0;
            right: 0;
            position: absolute; 
            height: 40px; 
            width: 40px;          
            padding: 5px;
            background-color: rgb(250, 209, 132);
            border: 1px solid rgb(250, 209, 132);
            border-top-right-radius:5px; 
            align-items: center;
            align-self: center;            
            opacity: 0;
            cursor: pointer;
        }
        .cart-btn-delete-shop a,
        .cart-btn-delete {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%)
        }
        .btn-chat-shop{
            cursor: pointer;
        }
        .cart-item-shop:hover .cart-btn-delete-shop,
        .cart-item-product:hover .cart-btn-delete-item{
            opacity: 0.7;
        }              
        .cart-shop-btn-delete:hover .cart-btn-delete-shop,
        .cart-btn-delete-item:hover{
            border: 1px solid crimson;
        }     
        .cart-item-shop:hover{
            border:1px solid rgb(200, 200, 200);            
        }
        .btn-update-cart-quantity{
            margin-top:10px; 
        }        
        .checkbox-carts-product{
            position: absolute;
            left: -8px; 
        }
        /* input[type="radio"]:not(:checked) {
        background-color: red; 
        }
        
        input[type="radio"]:checked {
        background-color: green;*/
        /* input[type="radio"].checked-custom{            
            box-shadow: 1px 1px 2px #009cb8;
            border: 1px solid #000000;
        }         */
        .box-update-quantity{
            position: relative;
        }        
        .item-message-update-quantity img{
            position: absolute;
            width: 15px;
            right: 35;
            bottom: -9;
        }
        .total-money{
            width: 100%;
            height: 70px;
            padding-top:20px;
            padding-bottom:10px;  
            background-color:rgb(236, 241, 241) ;                        
            color: crimson;
            font-size: 17px;         
        }
        .setup-total{
            color: crimson;
        }
        .box-cart{
            width: 100%;
            height: 85%;  
            position: relative; 
            overflow-y:auto;  
            padding-left:0px;
            padding-right:0px;
            overflow-x: hidden;                                
        }
        .box-all-product-cart{
            position: relative;
            width: 100%;     
            height: 100%;                               
               
            z-index: 999;            
        }
        .box-shop-check-all {
            padding-left: 15px;
            position: relative;
        }     
        #total-data{
            position: relative;            
            bottom: 0;
            z-index: 999999999999;
            width: 100%;
        }  
        .btn-cart-order{
            margin-right:30px; 
            color: #000000;
        } 
        .btn-cart-order img{
            margin-bottom:3px; 
        }   
        #form-register{

        }  
        .error-validate-register{
            color: red;
            width: 100%;
            text-align: left;            
        }    
        .line-through{
            color: #aaa;
            text-decoration: line-through
        }
        .color-red{
            color: red;
        }
    </style>
   
</head>
<body>        
    {{-- {{Session::has("error_login") ? Session::get('error_login') : ""}} --}}
    @if(!Auth::user())          
        <div class="container-box-login" id="container-box-auth"> 
            <div class="box-convert-select" id="item-convert-cart">
                <ul>                    
                    <li id="icon-convert-cart" title="Giỏ hàng"><a href="#"><b>Giỏ hàng</b> <img  src="{{ asset('FE/img/core-img/bag.svg') }}" alt=""></a></li>
                </ul>
            </div>                                   
            <div id="box-login">
                <center><h3>ĐĂNG NHẬP</h3></center> 
                <center><h5>Chào mừng mấy you đến với đế chế Shopbee</h5></center><br>
                <center>
                    <form method="POST" action="/auth/dang-nhap" id="form-login">  
                        @csrf                                              
                        <input required name="dang_nhap" type="text" class="input-text" value="" placeholder="Số điện thoại, email hoặc tên đăng nhập...">                        
                        <input required name="mat_khau" type="password" class="input-text" value="" placeholder="Mật khẩu...">
                        <p style="color: red" id="error-login"></p>                        
                        <button class="btn-login" type="submit" id="btn-login">Đăng Nhập</button>                        
                    </form>
                    <h6 class="lien-ket">Quên mật khẩu</h6>
                    <h6>Chưa có tài khoản? &ensp;<span class="lien-ket" id="link-register">Đăng ký</span> </h6>
                </center>
            </div>            
           
            <div id="box-register">
                <center>
                    <h3>ĐĂNG KÝ</h3>
                    <h5>Nhập tí thông tin là tạo được ngay ấy mà</h5><br>
                </center>
                    <div class="row">
                        <div class="col-lg-2">

                        </div>
                        <div class="col-lg-8">
                            <form class="row" action="" method="POST"  id="form-register">
                                @csrf                                                           
                                <input name="ho_ten" type="text" class="input-text" placeholder="Họ tên đầy đủ...">                
                                <p class="error-validate-register ho_ten"></p>                                         
                                <input name="dang_nhap" type="text" class="input-text" placeholder="Email hoặc số điện thoại">
                                <p class="error-validate-register dang_nhap"></p>                 
                                <input name="mat_khau" type="password" class="input-text" placeholder="Mật khẩu...">
                                <p class="error-validate-register mat_khau"></p>  
                                <input name="nhap_lai_mat_khau" type="password" class="input-text" placeholder="Nhập lại mật khẩu...">  
                                <p class="error-validate-register nhap_lai_mat_khau"></p>                                 
                                <button class="btn-login" id="btn-register">Đăng Ký</button>                                                            
                            </form>    
                        </div>
                    </div>            
                <center><h6>Đã có tài khoản? &ensp;<span class="lien-ket" id="link-login">Đăng nhập ngay</span> </h6></center>
            </div>
        </div>
        <script>
            $(".cart-area").attr("id","login");            
        </script>
@endif
<br>
    <div id="box-cart">
        <div class="box-convert-select" id="box-select-login">            
        </div>
        {{-- <a href="{{ URL::to('trang-ca-nhan', Session::get('hasLogged')) }}"><h5><i class="fa fa-user"> Trang cá nhân</i></h5></a> --}}
        <h3 style="margin-left:30px ">Giỏ hàng</h3>
        <center id="box-convert"></center>        
        <div class="box-cart">                                       
        </div>  
        <div class="w-100" id="total-data">                                    
        </div>
    </div>     
    <script src="{{ asset('js/library/validate_cart100.js') }}"></script>  
    <script>reloadFormAuth();</script>    
</body>
</html>