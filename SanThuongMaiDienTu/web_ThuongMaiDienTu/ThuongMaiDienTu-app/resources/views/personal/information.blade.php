@extends('layouts.layout_personal')
@section('content')
<style>
.box-information-input{
    position: relative;
    padding: 20px 10px;
}
.information-label{
    position: absolute;
    background: white;
    top: 7;
    left: 20px;
    padding: 0 5;   
    cursor: pointer; 
}
.information-input{
    width: 100%;
    text-align: center;
    height: 45px;
    border-radius:5px;
    border: 1px solid black; 
    cursor: default;    
}
.error-information{
    font-size: 13px;
    color: red;
    position: absolute;
    bottom: 0;
    left: 11;
    display: none;
}
.information-input.error-information-input{
    border: 1px solid red;
}
input.information-input-hover:hover{
    border: 1px solid #f7b500;
    cursor: auto;     
}
.information-input:focus{
    border: 1px solid #f7b500;     
}
div.information-input{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10%;
}
.information-input.information-input-don-hover:hover{
    border: 1px solid black; 
}
.item-gender{
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 3px;
}
.box-image-avatar{
    position: relative;
}
.image-avatar{    
    display: block;
    width: 100%;
    height: 300px;
    border-left:1px solid #000;     
    border-right:1px solid #000;     
    border-top:1px solid #000;     
}
.information-title{
    color:#f7b500;
    background-color: black;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px;
    font-size: 17px;
}
#input-joining-date{
    cursor: default;
}
.box-account-link{
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;    
}
.box-button{
    padding: 20px 30px;
}
.btn-update{
    float: right;
    width: 110px;
}
.box-btn-choose-avatar{
    position: relative;
    display: flex;
    justify-content: center;
    cursor: pointer;
}
.btn-update-avatar{
    width: 100%;
    font-size:17px;
    background-color: #f7cf62;
    color: black;
    border-bottom-left-radius: 5px;  
    border-bottom-right-radius: 5px;  
    border-left: 1px solid black;
    border-right: 1px solid black;
    border-bottom: 1px solid black;
    border-top:none;
    padding: 5px 10px;
}
.information-input-hover:hover{
    border: 1px solid #f7b500;     
}
.box-drop-drag-avatar{
    width: 100%;
    border: 3px dashed #f7b500;
    border-radius: 10px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    overflow: hidden;
    position: relative;
}
.title-choose-avatar{
    width: 100%;
    text-align: center;
    color: #999999;     
}
#btn-choose-avatar{
    padding: 5px 10px;
    width: 100px;
    border-radius: 5px;
    background-color: #f7b500;    
}
.box-operation-choose-avatar{
    margin: 10 0;
    min-height: 70px;
}
.box-show-avatar{    
    top: 0;    
    min-width:100%; 
    height: 100%;          
}
.avatar-preview{
    border-top-left-radius:5px; 
    border-top-right-radius:5px; 
    height: 100%;    
}
.box-image-avatar{
    border-right: 1px solid #000; 
    border-bottom: 1px solid #000;  
    border-left: 1px solid #000;  
    margin-left:12px;  
    border-bottom-left-radius: 5px;      
    border-bottom-right-radius: 5px;      
}
.item-image-avatar{        
    padding-top:10px; 
    padding-bottom:10px;
    color: crimson; 
}
.item-remove-avatar{
    position: absolute;
    top: 0;
    right: 0;
    cursor: pointer;
    opacity: 0;
}
.image-avatar:hover .item-remove-avatar{
    opacity: 1;
}
@media (max-width:991px){ 
    .box-button{
        position: sticky;
        width: 100%;     
        bottom: 0px;        
    }   
    .btn-update{
        background-color: #fff;
    }
}
@media (max-width:767px){
    .item-image-avatar{
        padding: 0;
    }
    .box-image-avatar{
        border: none;
        margin:0;
    }
    .item-remove-avatar{
        right: 12px;
        top: 1px;
    }    
}
.btn-update-password{
        position: absolute;
        right: 10;
        border-right: none;
        border: 1px solid #000;
        border-radius:5px; 
        background-color: white;
        opacity: 0;
        transition: all 0.3s;
        height: 45px;
    }
.information-input:hover .btn-update-password{
    opacity: 1;      
    width: auto;
}
.btn-update-password:hover{
    border: 1px solid #f7b500;
}
.border-message{
        border: 1px solid red;        
    }
</style>
    <div class="container">
        <div class="box-shadow">
            <div><center class="information-title">THÔNG TIN CÁ NHÂN</center></div> 
            <div id="form-info">
                @csrf
                <div class="row p-0">
                    <div class="col-md-5 col-lg-3 box-image-avatar">
                        <div class="item-image-avatar">
                            <div class="image-avatar" id="image-avatar" 
                                style="background: url(http://shopbee.local/uploads/avatar/user_account.png);
                                background-size: cover;">
                                <div class="item-remove-avatar" title="click vào đây để xóa avatar" style="display: none">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-x-square-fill" viewBox="0 0 16 16">
                                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                    </svg>                                                                  
                                </div>
                                <input type="file" id="input-avatar" hidden>
                            </div>
                            <div class="box-btn-choose-avatar">
                                <button class="btn-update-avatar" data-bs-toggle="modal" data-bs-target="#modal-choose-avatar" disabled>Thay đổi</button>                            
                            </div>
                        </div>                    
                    </div>
                    <div class="col-md-7 col-lg-9 row">
                        <div class="col-lg-6">
                            <div class="box-information-input">
                                <label for="input-username" class="information-label">Tên đăng nhập</label>
                                <input id="input-username" class="information-input" name="ten_dang_nhap" type="text" placeholder="Tên đăng nhập">
                                <span class="error-information" id="error-input-username"></span>
                            </div>   
                            <div class="box-information-input">
                                <label for="input-full-name" class="information-label">Họ và tên</label>
                                <input id="input-full-name" class="information-input" type="text" name="ho_ten" placeholder="Họ và tên">
                                <span class="error-information" id="error-input-full-name"></span>
                            </div>  
                            <div class="box-information-input">
                                <label for="input-phone-number" class="information-label">Số điện thoại</label>
                                <input id="input-phone-number" maxlength="10" class="information-input" type="text" name="so_dien_thoai" placeholder="Số điện thoại" maxlength="10">
                                <span class="error-information" id="error-input-phone-number"></span>
                            </div> 
                            <div class="box-information-input">
                                <label for="input-email" class="information-label">Email</label>
                                <input id="input-email" class="information-input" type="Email" name="email" placeholder="email@vidu.com">
                                <span class="error-information" id="error-input-email"></span>
                            </div>                                    
                        </div>
                        <div class="col-lg-6">
                            <div class="box-information-input">
                                <label for="input-date-of-birth" class="information-label">Ngày sinh</label>
                                <input id="input-date-of-birth" class="information-input" type="date" name="ngay_sinh" placeholder="dd/MM/yyyy">
                                <span class="error-information" id="error-input-date-of-birth"></span>
                            </div> 
                            <div class="box-information-input">
                                <label class="information-label">Giới tính</label>
                                <div class="information-input ">
                                    <div class="item-gender">
                                        <input type="radio" value="Nam" id="radio-gender-male" name="gioi_tinh" disabled>
                                        <label for="radio-gender-male">Nam</label> 
                                    </div> 
                                    <div class="item-gender">
                                        <input type="radio" value="Nữ" id="radio-gender-female" name="gioi_tinh" disabled>     
                                        <label for="radio-gender-female">Nữ</label>                             
                                    </div>                                                        
                                    <div class="item-gender">
                                        <input type="radio" value="Khác" id="radio-gender-other" name="gioi_tinh" disabled>    
                                        <label for="radio-gender-other">Khác</label>                             
                                    </div>                                                                                
                                </div>
                                <span class="error-information" id="error-input-gender"></span>
                            </div> 
                            <div class="box-information-input">
                                <label class="information-label">Mật khẩu</label>
                                <div class="information-input information-input-don-hover">
                                    <div id="input-password"></div>
                                    <button class="btn-update-password">Thay đổi</button>
                                </div>                            
                            </div>
                            <div class="box-information-input">
                                <label class="information-label">Ngày tham gia</label>
                                <div id="input-joining-date" class="information-input information-input-don-hover">24/04/2023</div>
                            </div> 
                        </div>
                    </div>                
                    <div class="col-xl-4 col-md-6 box-account-link">Facebook</div>
                    <div class="col-xl-4 col-md-6 box-account-link">Google</div>
                    <div class="col-xl-4 col-md-12 box-account-link">Titok</div>                  
                    <div class="box-button">
                        <input type="checkbox" name="update-data" id="update-data-information" hidden>
                        <label class="btn-update btn btn-outline-dark" for="update-data-information">Chỉnh sửa</label>                    
                    </div>
                </div>
            </form>                                               
        </div>
    </div>



    <div class="modal fade" id="modal-choose-avatar" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg" >
            <div class="modal-content" >
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">Cập nhật "Ảnh đại diện"</h1>
                    <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" style="height:700px; padding: 20px">
                    <div >
                        <div class="box-drop-drag-avatar">
                            <div class="box-operation-choose-avatar">
                                <span class="title-choose-avatar">Chọn hoặc kéo thả ảnh vào đây</span><br>
                                <center><button id="btn-choose-avatar">Chọn</button></center>
                                <input type="file" class="input-choose-avatar" hidden>                                
                            </div>
                            <div class="box-show-avatar" style="display: none">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">                    
                    <a class="btn btn-secondary" id="btn-cancel" data-bs-dismiss="modal">Hủy</a>
                    <a class="btn btn-warning" data-bs-dismiss="modal" id="btn-confirm">Lưu</a>
                </div>
            </div>
        </div>
    </div>
    
    <script src="{{asset("js/library/information4.js")}}"></script>
    <script src="{{asset("js/call_api/personal_information1.js")}}"></script>
    

@endsection