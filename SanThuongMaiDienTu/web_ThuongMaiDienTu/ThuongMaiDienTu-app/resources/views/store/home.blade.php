@extends('layouts.layout_store')
@section('content')
<link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.css" />
<style>
    #dothi {
        width: 100%;
        border: 1px solid #000000;
    }

    .mr-bt {
        margin-top: 20px;
    }

    #NgayBatDau,
    #NgayKetThuc {
        margin-bottom: 10px;
    }

    .option {
        text-align: left;
        background-color: #ffe2a5;
    }

    .hver:hover {
        background-color: white;
        box-shadow: 1px 4px 5px #0dcaf0;
    }
    body{
        background-color:#f5f5fa;
    }
</style>
<br><br>
<div class="container item" style="padding:20px;">    
    <div>
        <center><h4>Thống kê doanh thu</h4></center>
    </div>
    <div class="row ">
        <div class="col-lg-6 mr-bt col-12">
            <div class="row">
                <div class="col-lg-9 col-12">
                    <div class="row">
                        <div class="col-lg-6 col-12">
                            <center><input name="NgayBatDau" type="date" class="hver" id="NgayBatDau" alt="Chọn ngày bắt đầu" placeholder="Chọn ngày bắt đầu" style="text-align:center;  width:95%; height:40px; border-radius:5px; border:1px solid #808080;" /></center>
                        </div>
                        <div class="col-lg-6 col-12">
                            <center><input name="NgayKetThuc" type="date" class="hver" id="NgayKetThuc" alt="Chọn ngày kết thúc" placeholder="Chọn ngày kết thúc" style="text-align:center;  width:95%; height:40px; border-radius:5px; border:1px solid #808080;" /></center>
                        </div>
                    </div>
                    <div class="row" style="margin-top:-7px; margin-bottom:2px; margin-left:-4px; font-size:14px; color:crimson;">
                        <span id="error-validate"></span>
                    </div>
                </div>
                <div class="col-lg-3 col-12">

                </div>
            </div>

        </div>
        <div class="col-lg-6 mr-bt col-12">
            <div class="row">
                <div id="Loc" class="">
                    <div class="row">
                        <div class="col-4">
                            Doanh thu theo:
                        </div>
                        <div class="col-8">
                            <div class="row">
                                <div class="col-6">
                                    <div class="form-check ">
                                        <input class="form-check-input hver bg-warning" checked type="checkbox" name="LoaiThongKe" value="0" id="TatCa">
                                        <label class="form-check-label" for="TatCa">
                                            Tất cả
                                        </label>
                                    </div>
                                    <div class="form-check ">
                                        <input class="form-check-input hver " type="checkbox" name="LoaiThongKe" value="1" id="LuotTruyCap">
                                        <label class="form-check-label" for="LuotTruyCap">
                                            Lượt truy cập
                                        </label>
                                    </div>
                                </div>
                                <div class="col-6">
                                    <div class="form-check ">
                                        <input class="form-check-input hver" name="LoaiThongKe" type="checkbox" value="2" id="CuaHang">
                                        <label class="form-check-label" for="CuaHang">
                                            Cửa hàng
                                        </label>
                                    </div>
                                    <div class="form-check ">
                                        <input class="form-check-input hver" type="checkbox" name="LoaiThongKe" value="3" id="SanPham">
                                        <label class="form-check-label" for="SanPham">
                                            Sản phẩm
                                        </label>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
                <div id="listSanPham" style="display:none" class="col-4">
                    <select id="select-sp" class="form-select btn hver btn-outline-warning" name="MaSP" aria-label="Default select example">
                                                
                    </select>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6 col-12">
                <div class="col-lg-2 col-12">
                    <center><button type="button" id="btn-submit" class="btn hver btn-warning">Thống kê</button></center>
                </div>
            </div>
            <div class="col-lg-6 col-12">
            </div>
        </div>
    </div>
    <div class="row" style="margin:20px 0px; padding: 0px 10px;">
        <div></div>
        <center><div id="myfirstchart" style="height: 400px; width:100%; border:1px solid #000000"></div></center>
    </div>
    {{-- <div class="row">
        <div class="col-lg-6 col-12">
            <center><h5>Tổng theo quãng thời gian đã chọn</h5></center>
            <div class="row">
                <div class="col-6">
                    <center>
                        <div>
                            <br />
                            <span style="color:#808080">Lượt truy cập: </span><span>123821</span><br /><br />
                            <span style="color:#808080">Đang truy cập: </span><span>12</span>
                        </div>
                    </center>
                </div>
                <div class="col-6">
                    <center>
                        <div>
                            <br />
                            <span style="color:#808080">Cửa hàng: </span><span>@(string.Format("{0:0,0}",Convert.ToInt32(ViewBag.tongCH)))đ</span><br /><br />
                            <span style="color:#808080">Sản phẩm: </span><span>@(string.Format("{0:0,0}",Convert.ToInt32(ViewBag.tongSP)))đ</span><br />
                        </div>
                    </center>
                </div>
            </div>
        </div>
        <div class="col-lg-6 col-12">
            <center><h5>Toàn bộ</h5></center>
            <div class="row">
                <div class="col-6">
                    <center>
                        <div>
                            <br />
                            <span style="color:#808080">Lượt truy cập: </span><span id="LuotTruyCapToanBo">123</span><br /><br />
                            <span style="color:#808080">Đang truy cập: </span><span>12</span>
                        </div>
                    </center>
                </div>
                <div class="col-6">
                    <center>
                        <div>
                            <br />
                            <span style="color:#808080">Cửa hàng: </span><span>123.123đ</span><br /><br />
                            <span style="color:#808080">Sản phẩm: </span><span>100.000đ</span><br />
                        </div>
                    </center>
                </div>
            </div>
        </div>
    </div> --}}
</div>

</div>
<script src="//cdnjs.cloudflare.com/ajax/libs/raphael/2.1.0/raphael-min.js"></script>
<script src="//cdnjs.cloudflare.com/ajax/libs/morris.js/0.5.1/morris.min.js"></script>
<script src="{{asset("js/store/statistical.js")}}"></script>    
@endsection