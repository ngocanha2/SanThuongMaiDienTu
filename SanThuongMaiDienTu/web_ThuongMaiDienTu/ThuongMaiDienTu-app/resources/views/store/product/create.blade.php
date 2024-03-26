
@extends('store.product.layout_product_update')
@section('content-child')
<div class="box-add-product">
    <div class="row">
        <div class="col-md-12 col-6"><a class="btn btn-outline-dark btn-refresh">Làm mới</a></div>
        <div class="col-md-12 col-6"><a class="btn btn-warning btn-submit" id="btn-submit-add-product">Xác nhận</a></div>            
    </div>
</div>
{{-- <!-- <script src="{{asset('js/store/create_product1.js')}}"></script> --> --}}
<script src="{{asset('js/store/update_product.js')}}"></script>
<script>
    loadEventCreateProduct()
</script>
@endsection




<!-- {{-- @extends('layouts.layout_store')
@section('content')
<link href="{{ asset('css/product/product_update.css') }}" rel="stylesheet">
<script rel="stylesheet" src="{{asset('js/library/ckeditor/ckeditor.js')}}"></script>  
<meta name="csrf-token" content="{{ csrf_token() }}">
<div class="box-shadow">
    <div class="row box-create-info-basic">
        <div class="w-100 item-title-box">
            <center>THÔNG TIN CƠ BẢN</center>
        </div>
        <div class="col-md-6 box-create-info-basic-title padding-left-right">
            <div class="row position-sticky ">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Tên sản phẩm:
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-21 box-input-create-info">
                    <input type="text" maxlength="120" class="w-100 btn input-create-info" id="input-create-product-name" placeholder="Tên sản phẩm">
                    <span id="message-product-name-all" class="message-validate "></span>
                </div>
                <div class="col-sm-3 col-lg-3 ">
                    Giá bán:
                </div>
                <div class="col-sm-9 col-lg-9 box-input-create-info margin-bottom-21">
                    <input type="text" maxlength="10" class="w-100 btn input-create-info" id="input-create-price-all" placeholder="Giá sản phẩm">
                    <span id="message-price-all" class="message-validate"></span>
                </div>                                               
            </div>           
        </div>
        <div class="col-md-6 box-create-info-basic-category padding-left-right">
            <div class="row position-sticky">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Thuộc danh mục:
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 box-select-category" id="box-select-category">
                    <div id="item-select-category-level-1" style="display:none">
                    </div>                                
                </div>
            </div>            
        </div>
    </div>  
    
    <div class="row box-create-info-basic" style="margin-bottom:-25; ">       
        <div class="col-md-6 box-create-info-basic-title padding-left-right">
            <div class="row" style="display: none" id="item-create-quantity">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Số lượng tồn
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 box-input-create-info"style="margin-bottom:20 ">
                    <input type="text" maxlength="120" class="w-100 btn input-create-info" id="input-create-quantity-all">
                    <span id="message-quantity-all" class="message-validate "></span>
                </div>                                                                               
            </div>           
        </div>
        <div class="col-md-6 box-create-info-basic-category padding-left-right">
            <div class="row position-relative h-100">
                <div class="w-100 item-check-classify padding-left-right margin-bottom-10">
                    <div class="form-check form-switch form-check-input-classify">
                        <input class="form-check-input" type="checkbox" role="switch" id="check-create-classify" checked>
                        <label class="form-check-label" for="check-create-classify">Tạo phân loại</label>
                    </div>
                </div> 
            </div>            
        </div>
    </div>  
    
    <div class="box-create-info-basic" id="box-create-classify">               
        <div class="w-100 item-title-box">
            <center>Phân loại sản phẩm</center>
            <span class="item-count-classify" title="Số lượng phân loại hiện có">(<span id="count-classify">1</span>)</span>
        </div>
        <div class="row">
            <div class="col-md-6 box-create-info-basic-title padding-left-right" id="item-input-design-key-classify">
                <div class="row" >
                    <div class="col-sm-3 col-md-12 col-lg-3 ">
                        Khóa phân loại tùy chỉnh
                    </div>
                    <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-10">
                        <input type="text" class="input-design-key-classify w-100 btn input-create-info" maxlength="30" value="Phân loại" placeholder="Mặc định: Phân loại">
                    </div>                                                                               
                </div>           
            </div>
            <div class="col-md-6 box-create-info-basic-category padding-left-right" id="item-input-design-key-size">
                <div class="row">
                    <div class="col-sm-3 col-md-12 col-lg-3 ">
                        Khóa kích cở tùy chỉnh
                    </div>
                    <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-10">
                        <input type="text" class="input-design-key-size w-100 btn input-create-info" maxlength="30" value="Kích cở" placeholder="Mặc định: Kích cở">
                    </div>
                </div>            
            </div> 
        </div>  
        <div class="padding-left-right row">
            <div class="line"></div>
            <div class="col-md-6">
                <strong>Danh mục <span>phân loại</span></strong>
            </div>
            <div class="col-md-6">
                <a class="btn btn-outline-warning btn-add-classify w-100" id="btn-create-box-classify">
                    <svg style="margin-top:-5px!important; position:relative" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                        <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                    "<span id="key-classify">Phân loại</span>" mới
                </a>
            </div>
        </div>
        



        <div class="box-design-classify padding-left-right" id="box-design-classify">
            
        </div>             
    </div>
    <div class="row box-create-info-basic">
        <div class="w-100 item-title-box">
            <center>ĐA PHƯƠNG TIỆN</center>
        </div>
        <div class="padding-left-right">
            
            <div class="product-video row">
                <div class="col-md-6">
                    <div class="product-images row position-sticky">                        
                        <div class="col-12">
                            <div class="box-add-video" id="box-add-video">
                                <span class="title-choose-video" id="title-choose-video">Chọn hoặc kéo thả video vào đây</span>
                                <a class="btn-choose-video" id="btn-choose-video">Chọn</a>
                                <input type="file" name="video" hidden id="input-choose-video">
                            </div>
                        </div>
                        <div class="col-12">
                            <div class="data-video" id="data-video">
                                
                            </div>
                        </div>                        
                    </div>                    
                </div>
                <div class="col-md-6" >
                    <div class="product-images row position-sticky">
                        <div class="col-12">
                            <div class="box-add-image" id="box-add-image">
                                <span class="title-choose-image" id="title-choose-image">Chọn hoặc kéo thả ảnh vào đây</span>
                                <a class="btn-choose-image" id="btn-choose-image">Chọn</a>
                                <input type="file" hidden id="input-choose-image" multiple>                                
                            </div>
                            <span id="error-validate-image">Phải có ít nhất một ảnh</span>
                        </div>
                        <div class="col-12" >
                            <div class="list-data-image" id="list-data-image">                                
                            </div>
                        </div>                                
                    </div>       
                </div>            
            </div>               
        </div>       
    </div>

    <div class="row box-create-info-basic">        
        <div class="w-100 item-title-box">
            <center>THÔNG TIN CHI TIẾT</center>
        </div>
        <div>
            <p>Mô tả sản phẩm</p>
            <textarea id="editor" class="w-100" name="editor"  cols="30" rows="10"></textarea>            
        </div>
        <div>
            <div class="line">
                <div title="Click vào đây để thêm một thuộc tính" class="btn-add-details-product" id="btn-add-details-product">                    
                    <a class="btn btn-outline-dark" id="btn-create-box-info-details-product">
                        <svg style="margin-top:-5px!important; position:relative" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                            <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                        </svg>
                        Chi tiết sản phẩm mới (<span title="Số lượng thuộc tính hiện có" id="count-product-info-details">0</span>)
                    </a>                    
                </div>
            </div>
            <div class="box-create-product-details" id="box-create-product-details">                
            </div>           
        </div>
    </div> 

    <div class="w-100 item-title-box">
        <center class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="check-create-discount" checked>
            <label class="form-check-label" for="check-create-discount">KHUYẾN MÃI</label>
        </center>
    </div>
    <div class="row box-create-info-basic box-create-info-discount">        
        <div class="col-md-6 box-create-info-basic-title padding-left-right">
            <div class="row">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Ngày bắt đầu:
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-21 box-input-create-info">
                    <input type="datetime-local" class="w-100 btn input-create-info" id="input-create-product-discount-start-day" placeholder="Ngày bắt đầu">
                    <span id="message-product-discount-start-day" class="message-validate " ></span>
                </div>                                                              
            </div>           
        </div>
        <div class="col-md-6 box-create-info-basic-category padding-left-right">
            <div class="row">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Ngày kết thúc:
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-21 box-input-create-info">
                    <input type="datetime-local" class="w-100 btn input-create-info" id="input-create-product-discount-end-day" placeholder="Ngày kết thúc">
                    <span id="message-product-discount-end-day" class="message-validate " ></span>
                </div>   
            </div>            
        </div>        
        <div class="col-md-6 box-create-info-basic-title padding-left-right">
            <div class="row">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Tỷ lệ giảm:
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-21 box-input-create-info">
                    <input type="text" maxlength="3" class="w-100 btn input-create-info" id="input-create-product-discount-ratio" placeholder="Tỷ lệ giảm giá">
                    <span id="message-product-discount-ratio" class="message-validate"></span>
                </div>                                                             
            </div>           
        </div>
        <div class="col-md-6 box-create-info-basic-category padding-left-right">
            <div class="row">
                <div class="col-sm-3 col-md-12 col-lg-3 ">
                    Số lượng:
                </div>
                <div class="col-sm-9 col-md-12 col-lg-9 margin-bottom-21 box-input-create-info">
                    <input type="text" maxlength="9" class="w-100 btn input-create-info" id="input-create-product-discount-limited-quantity" placeholder="Số lượng giới hạn">
                    <span id="message-product-discount-limited-quantity" class="message-validate "></span>
                </div> 
            </div>            
        </div>
    </div>          
</div>
<div class="box-add-product">
    <div class="row">
        <div class="col-md-12 col-6"><a class="btn btn-outline-dark btn-refresh">Làm mới</a></div>
        <div class="col-md-12 col-6"><a class="btn btn-warning btn-submit" id="btn-submit-add-product">Xác nhận</a></div>            
    </div>
</div>

<script src="{{asset('js/call_api/categoty1.js')}}"></script>
<script src="{{asset('js/store/create_product1.js')}}"></script>
@endsection --}} -->


