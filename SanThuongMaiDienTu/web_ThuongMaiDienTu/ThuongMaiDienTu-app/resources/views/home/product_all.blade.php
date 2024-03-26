@extends('layouts.layout_main')
@section('content')
    {{-- <script src="{{ asset('js/call_api/product_setup.js') }}"></script> --}}
   <section class="new_arrivals_area section-padding-30 clearfix">
    <div class="container-custom">
        <div class="row">
            <div class="col-md-4 col-lg-3">
                <div class="nav-bar-home">
                    <div class="nav-bar-child">                
                        <h6>Nổi bật</h6>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb1.png') }}">
                            <span>Shopbee ChatGPT</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb2.png') }}">
                            <span>Astra Rewward</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb3.png') }}">
                            <span>Shopbee Extra</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb4.png') }}">
                            <span>Giá rẻ mỗi ngày</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb5.png') }}">
                            <span>Xã kho khủng</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb6.png') }}">
                            <span>Mã giảm giá</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb7.png') }}">
                            <span>Ưu đãi thẻ, ví</span>
                        </div>
                        <div class="item-nav-bar-child">
                            <img src="{{asset('system/nb8.png') }}">
                            <span>Bảo hiểm 360</span>
                        </div>
                    </div>                    
                </div>
            </div>     
            <div class="col-md-8 col-lg-9 box-main">
                <div class="box-sticky box-container box-thuong-hieu-chinh-hang">
                    <h6>Hàng Hiệu Giá Tốt</h6>
                    <div class="row">
                        <div class="col-md-4">
                            <div class="item-hang-hieu-gia-tot">
                                <div class="element-hang-hieu-gia-tot element-span" style="background: url({{ asset('system/hhgt-1.png') }}); background-size:cover;"></div>
                                <div class="element-hang-hieu-gia-tot "  style=" background: url({{ asset('system/hhgt-11.png') }}); background-size:cover;"></div>
                                <div class="element-hang-hieu-gia-tot"  style="background: url({{ asset('system/hhgt-12.png') }}); background-size:cover;"></div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="item-hang-hieu-gia-tot">
                                <div class="element-hang-hieu-gia-tot element-span" style="background: url({{ asset('system/hhgt-2.png') }}); background-size:cover;"></div>
                                <div class="element-hang-hieu-gia-tot" style="background: url({{ asset('system/hhgt-21.png') }}); background-size:cover;"></div>
                                <div class="element-hang-hieu-gia-tot" style="background: url({{ asset('system/hhgt-22.png') }}); background-size:cover;"></div>
                            </div>
                        </div>
                        
                        <div class="col-md-4">
                            <div class="item-hang-hieu-gia-tot">
                                <div class="element-hang-hieu-gia-tot element-span" style="background: url({{ asset('system/hhgt-3.png') }}); background-size:cover;"></div>
                                <div class="element-hang-hieu-gia-tot" style="background: url({{ asset('system/hhgt-31.png') }}); background-size:cover;"></div>
                                <div class="element-hang-hieu-gia-tot" style="background: url({{ asset('system/hhgt-32.png') }}); background-size:cover;"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>  
        </div>     
        <div class="main-container">            
            <div class="box-container box-thuong-hieu-chinh-hang">
                <h6>Tất Cả Sản Phẩm</h6>
                {{-- <div class="box-gird-media row" id="product-all"> --}}
                <div class="row" id="product-all">
                    <script>
                        ShowProducts("product-all",'{{$_GET["page"]??1}}',null,true);
                        var LoadDatas = (page,numpages)=>{
                            ShowProducts("product-all",page,numpages,true);
                        }

                    </script>                    
                </div>                
            </div>
            <ul class="pagination" id="pagination" style="clear: both">  
            <div class="box-container box-thuong-hieu-chinh-hang box-gird-3">
                <div class="item-mo-the-lan-dau" style="background: url({{ asset('system/mo-the-1.png') }}); background-size:cover"></div>
                <div class="item-mo-the-lan-dau" style="background: url({{ asset('system/mo-the-2.png') }}); background-size:cover"></div>
                <div class="item-mo-the-lan-dau" style="background: url({{ asset('system/mo-the-3.png') }}); background-size:cover"></div>
            </div>
        </div>
    </div>
   </section>
@endsection
