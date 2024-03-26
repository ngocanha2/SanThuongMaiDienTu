@extends('layouts.layout_store')
@section('content')
    <style>
        .btn {
            border: 1px solid #000000;
            font-size:20px;
        }

        .item {
            background-color: white;
            border-radius: 10px;
            box-shadow: 1px 4px 10px #AAAAAA;
        }
        .form-select:hover,
        .btn:hover {
            border-color: #AAAAAA;
            box-shadow: 1px 4px 10px #AAAAAA;
        }
        .form-select:focus,
        .btn:focus {
            border-color: #f8c483;
            box-shadow: 1px 4px 4px #f8c483;
        }

        .khung {
            margin-bottom: 60px;
            text-align: center;
        
        }
        input, .form-select {
            height: 45px;
        }

        .khunglon {
            margin-top: 20px;
            padding:10px;
        }
        .box-input-update-address{
        padding: 0 10px;
    }
    .input-update-address{
        min-height: 45px;
        border: 1px solid #000;
        border-radius: 5px;
        text-align: center;
        width: 100%;
    }
    .item-update-address{
        position: relative;
        margin-bottom:20px;         
    }
    .label-update-address{
        position: absolute;
        background-color: white;
        padding: 0 3px;
        top: -13px;
        z-index: 9;
    }
    .error-update-address{
        font-size: 13px;
        color: red;
        position: absolute;
        bottom: -20px;
        display: none;
    }
    .title-address{
        margin-bottom:15px; 
    }
    .box-error-validate{
        position:relative;
    }
    .error-validate{
        color:red;
        display:none;
        font-size:14px;
        position:absolute;
        left:5px;
    }
    </style>
    <div class="container-lg item khunglon">
        <center><h3>Đăng ký để trở thành người bán bán hàng trên Shopbee</h3></center>
        <form method="POST" id="form-register-store">
            @csrf
            <div class="row" style="margin:50px;">
                <div class="col-lg-3 col-12 ">
                    Tên của hàng
                </div>
                <div class="col-lg-9 col-12 khung">
                    <input class="btn w-100 tencuahang" name="ten_cua_hang" type="text" maxlength="50" />
                    <div class="w-100 box-error-validate" >
                        <span class="error-validate" id="error-validate-store-name"></span>
                    </div>
                </div>
                <div class="col-lg-3 col-12 title-address">
                    Đia chỉ lấy hàng
                </div>
                <div class="col-lg-9 col-12 khung">
                    <div class="row">
                        <div class="item-update-address col-lg-4">
                            <label class="label-update-address" for="province">Tỉnh/Thành phố</label>
                            <select class="input-update-address " id="province">
                                <option value=""> Chọn </option>
                            </select>                                                   
                        </div> 
                        <div class="item-update-address col-lg-4 col-sm-6">
                            <label class="label-update-address" for="district">Quận/Huyện</label>
                            <select class="input-update-address" id="district">
                                <option value=""> Chọn </option>
                            </select>
                        </div>
                        <div class="item-update-address col-lg-4 col-sm-6">
                            <label class="label-update-address" for="ward">Xã/Phường</label>
                            <select class="input-update-address" id="ward">
                                <option value=""> Chọn </option>                                                                                               
                            </select>
                        </div>                          
                        <input id="result-address" name="dia_chi" type="text" hidden>                                            
                    </div>
                    <div class="w-100 box-error-validate" >
                        <span class="error-validate" id="error-validate-address" style="top: -20;" >Vui lòng chọn đầy đủ địa chỉ</span>
                    </div>
                </div>
                <div class="col-lg-3 col-12 ">
                    Email
                </div>
                <div class="col-lg-9 col-12 khung">
                    <input class="btn w-100 disabled" style="cursor:no-drop" value="{{$email ?? ""}}" disabled type="email" maxlength="32" />
                </div>
                <div class="col-lg-3 col-12 ">
                    Số điện thoại
                </div>
                <div class="col-lg-9 col-12 khung">
                    <input class="btn w-100 disabled" style="cursor:no-drop" value="{{$so_dien_thoai ?? ""}}" disabled type="text" maxlength="32" />
                    <center><span style="color:#808080">Thông tin này, bạn vui lòng chỉnh sửa sau khi hoàn tất quá trình đăng ký!!!</span></center>
                </div>
                <button type="submit" class="btn btn-warning" id="btn-register-store"><b style="font-size:20px;">ĐĂNG KÝ BÁN HÀNG</b></button>                
            </div>
        </form>
    </div>

    <script src="{{asset("js/call_api/data_address2.js")}}"></script>    
    <script src="{{asset("js/store/register.js")}}"></script>    
@endsection