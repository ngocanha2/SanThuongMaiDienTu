<style>
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
        margin-bottom:40px;         
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
    #input-update-address-note{
        font-style: italic;
        color: #686868;
    }
    #box-radio-update-address-type{
        position: relative;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .box-radio-option-address-type{
        margin: 0 10px;
    }
    .item-error-update-address-select{
        position: relative;
    }
    .item-error-update-address-select .error-update-address{
        top: -40;
    }
    .border-message{
        border-color: red; 
    }
    .box-title-address{
        background-color: black;
        padding: 10 20 1 20;
        color: white;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-bottom:30px; 
        position: relative;
    }
    .css-insert-address{
        position: absolute;
        right: 20;
        top: 50%;
        transform: translateY(-50%);        
    }
</style>
<div class="modal fade" id="box-update-address" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h1 class="modal-title fs-5" >Cập nhật địa chỉ</h1>
                <button type="button" class="btn-close btn-close-update-address" id="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form action="" id="form-update-address" method="POST">
                <div class="modal-body" style="min-height:500px; margin-top:10px; ">
                    <div class="row box-input-update-address">
                        <div class="item-update-address col-lg-6">
                            <label class="label-update-address" for="input-update-address-name">Tên người nhận</label>
                            <input class="input-update-address" id="input-update-address-name" type="text" name="ten_nguoi_nhan" placeholder="Họ và tên người nhận"><br>
                            <span class="error-update-address" id="error-update-address-name"></span>
                        </div>  
                        <div class="item-update-address col-lg-6">
                            <label class="label-update-address" for="input-update-address-phone-number">Số điện thoại</label>
                            <input class="input-update-address" id="input-update-address-phone-number" name="so_dien_thoai" maxlength="10" type="text" placeholder="Số điện thoại"><br>
                            <span class="error-update-address" id="error-update-address-phone-number"></span>
                        </div> 
                        <div class="item-update-address col-lg-4">
                            <label class="label-update-address" for="province">Tỉnh/Thành phố</label>
                            <select class="input-update-address" id="province">
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
                        <div class="item-error-update-address-select">
                            <span class="error-update-address" id="error-update-address-select"></span>                           
                        </div> 
                        <input id="result-address" name="dia_chi" type="text" hidden>   
                        <div class="item-update-address col-lg-6">
                            <label class="label-update-address" for="input-update-address-detail">Địa chỉ cụ thể</label>
                            <input class="input-update-address" id="input-update-address-detail" type="text" name="dia_chi_cu_the" placeholder="Địa chỉ cụ thể"><br>
                            <span class="error-update-address" id="error-update-address-detail"></span>
                        </div>  
                        <div class="item-update-address col-lg-6">
                            <label class="label-update-address" for="input-update-address-note">Ghi chú</label>
                            <input class="input-update-address" id="input-update-address-note" name="ghi_chu" type="text" placeholder="Ghi chú"><br>                            
                        </div>                                                 
                        <div class="col-lg-2"></div>
                        <div class="item-update-address col-lg-8">   
                            <label class="label-update-address">Loại địa chỉ</label>                         
                            <div class="input-update-address" id="box-radio-update-address-type">
                                <div class="box-radio-option-address-type">
                                    <input type="radio" name="loai_dia_chi" id="home" value="Nhà riêng" checked>
                                    <label for="home">Nhà riêng</label>
                                </div>
                                <div class="box-radio-option-address-type">
                                    <input type="radio" name="loai_dia_chi" id="office" value="Văn phòng">
                                    <label for="office">Văn phòng</label>
                                </div>
                            </div>                            
                        </div>  
                        <div class="col-lg-2"></div>
                        <div>
                            <div class="form-check form-switch">
                                <input class="form-check-input" type="checkbox" role="switch" name="mac_dinh" id="checkbox-set-address-default">
                                <label class="form-check-label" for="checkbox-set-address-default">Đặt làm mặc định</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">                                                                                
                    <a class="btn btn-secondary" id="btn-cancel" data-bs-dismiss="modal">Đóng</a>
                    <button class="btn btn-warning" type="submit" id="btn-confirm-address">Cập nhật</button>
                </div>
            </form>
        </div>
    </div>
</div>
<script src="{{asset("js/call_api/data_address2.js")}}"></script>
<script  rel="stylesheet" src="{{asset('js/personal/address_update.js')}}"></script>