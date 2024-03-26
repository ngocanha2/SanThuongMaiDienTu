@extends('layouts.layout_store')
@section('content')
<script src="https://kit.fontawesome.com/213b585f79.js" crossorigin="anonymous"></script>
<meta name="csrf-token" content="{{ csrf_token() }}">
<style>
    .item {
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 4px 10px #AAAAAA;
    }

    body {
        background-color: #f5f5fa;
    }

    a {
        text-decoration: none;
    }

    .btn:hover,
    .btn:focus,
    .btn {
        border: 1px solid black;
    }

        .btn:hover,
        .btn:focus {
            border-radius: 5px;
            box-shadow: 1px 4px 10px #AAAAAA;
        }

    .item div {
        margin-bottom: 15px;
    }

    .error-validate {
        color: red;
        left: 2px;
        font-size: 13px;
        margin-top: 5px;
        position: absolute;
        top: -5px;
        /* display: none; */
    }

    #start-day:hover,
    #end-day:hover {
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 4px 10px #AAAAAA;
    }

    .tieude {
        background-color: black;
        padding: 5px;
        width: 105%;
        margin-left: -2.5%;
        color: white;
    }

    .item-select-sale-time-system{
        padding: 0px 10px;
    }
    .item-select-sale-time-system select{
        display: flex;
        text-align: center;
    }
    #sale-time-system{
        display: none;
    }
</style>
    <div class="container-lg">
        <center><h2>Tạo khuyến mãi</h2></center>
        <hr />
        <center>
            <form id="form-create-voucher" method="POST">
                @csrf
                <div class="item " style="position:relative; padding:20px; max-width:850px;">
                    <div class="row tieude">
                        <center><h5>Thông tin cơ bản </h5></center>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                Tên chương trình giảm giá
                            </span>
                        </div>
                        <div class="col-md-8">
                            <input class="btn w-100" name="ten_khuyen_mai" id="voucher-name" placeholder="Nhập tên chương trình giảm giá" title="Nhập tên chương trình giảm giá" type="text" maxlength="70" />
                            <div class="w-100" style="position:relative;">
                                <span id="error-voucher-name" class="error-validate"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                Mã giảm giá
                            </span>
                        </div>
                        <div class="col-md-8">
                            <input class="btn w-100" id="voucher-code" name="ma_khuyen_mai" placeholder="Nhập mã giảm giá" title="Nhập mã giảm giá" type="text" maxlength="30" />
                            <div class="w-100" style="position:relative;">
                                <span id="error-voucher-code" class="error-validate"></span>
                            </div>
    
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                <input type="checkbox" name="dang_ky_khung_gio_sale" id="chk-option-sale-time-system">
                                <label for="chk-option-sale-time-system">Đăng ký khung giờ sale</label>
                            </span>
    
                        </div>
                        <div class="col-md-8">
                            <div class="row"  id="sale-time-custom">
                                <div class="col-md-6">
                                    <input class="btn w-100" name="ngay_bat_dau" id="start-day" type="datetime-local" step="60" alt="Chọn ngày bắt đầu" title="Nếu không chọn ngày bắt đầu, hệ thống sẽ tự động lấy ngày hiện tại" placeholder="Ngày bắt đầu" style="text-align:center;  height:40px; border-radius:5px; border:1px solid #808080;" />                                                                        
                                </div>
                                <div class="col-md-6">
                                    <input class="btn w-100" name="ngay_ket_thuc" id="end-day" type="datetime-local" step="60" alt="Chọn ngày kết thúc" title="Chọn ngày kết thúc" placeholder="Ngày kết thúc" style="text-align:center; height:40px; border-radius:5px; border:1px solid #808080;" />
                                </div>   
                                <div class="col" style="position:relative; float: left; margin-top:-15px; margin-left:12px;  ">
                                    <span id="error-sale-time" class="error-validate"></span>
                                </div>                             
                            </div>
                            <div id="sale-time-system" class="row item-select-sale-time-system">
                                <select class="btn select" name="khung_gio_sale" id="">
                                    <option>22-12-2023</option>
                                    <option>11-11-2023</option>
                                    <option>10-10-2023</option>
                                    
                                </select>
                            </div>
                        </div>
    
                    </div>
                    <div class="row tieude" style="margin-top:-30px;">
                        <center><h5>Thiết lập mã giảm giá</h5></center>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                Tỷ lệ giảm giá
                            </span>
                        </div>
                        <div class="col-md-8">
                            <input class="btn w-100" id="discount-rate" name="ty_le_giam_gia" placeholder="Tỷ lệ giảm giá(1-100)" title="Nhập tỷ lệ giảm giá" type="text" maxlength="3" min="1" max="100" />                            
                            <div class="w-100" style="position:relative;">
                                <span id="error-discount-rate" class="error-validate"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                Giá trị đơn hàng tối thiểu
                            </span>
                        </div>
                        <div class="col-md-8">
                            <input class="btn w-100" id="minimum-order" name="don_hang_toi_thieu" placeholder="Giá trị đơn hàng tối thiểu" value="0" title="Nhập giá trị đơn hàng tối thiểu" type="text" maxlength="10" />
                            <div class="w-100" style="position:relative;">
                                <span id="error-minimum-order" class="error-validate"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                Hạn mức giảm tối đa
                            </span>
                        </div>
                        <div class="col-md-8">
                            <input class="btn w-100" id="discount-limit" name="muc_giam_toi_da" placeholder="Mức giảm tối đa" title="Nhập mức giảm tối đa" type="text" maxlength="10" />
                            <div class="w-100" style="position:relative;">
                                <span id="error-discount-limit" class="error-validate"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-4">
                            <span>
                                Lượt sử dụng
                            </span>
                        </div>
                        <div class="col-md-8">
                            <input class="btn w-100" id="turns-of-use" name="so_luong"placeholder="Số lần mã giảm giá còn hiệu lực" title="Nhập lượt sử dụng" type="text" maxlength="10" />
                            <div class="w-100" style="position:relative;">
                                <span id="error-turns-of-use" class="error-validate"></span>
                            </div>
                        </div>
                    </div>
                    <div class="row" style="margin-bottom:-10px;">
                        <div class="col-lg-6">
                        </div>
                        <div class="col-md-6 col-12">
                            <div>
                                <button type="submit" id="btn-submit" style="margin-right:10px; float:right;" class="btn btn-dark">Xác nhận</button>
                                <a style="margin-right:10px; float:right;" class="btn btn-outline-danger ">Hủy</a>                                                                
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            
        </center>
    </div>
<script src="{{ asset('js/call_api/store_voucher1.js') }}"></script>
<script src="{{ asset('js/store/validate1.js') }}"></script>
@yield("content-child")
@endsection