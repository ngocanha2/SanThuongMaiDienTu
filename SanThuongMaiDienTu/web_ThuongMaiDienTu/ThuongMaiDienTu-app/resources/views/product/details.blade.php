
@extends('layouts.layout_main')
@section('content')
    <meta name="csrf-token" content="{{ csrf_token() }}">           
    {{-- <script src="{{ asset('js/call_api/product_setup.js') }}"></script>    --}}
    <script src="https://cdn.jsdelivr.net/npm/lodash@4.17.21/lodash.min.js"></script>
    <style>
        .star-quantity,
        .star-black{
            color: black !important;
        }    
        .star-gold{
            color: gold;
            
        }
        .item-detail-img-product{
            border: 3px solid white;
        }
        .item-detail-img-product.active{
            border: 3px solid goldenrod;
        }
        .item-detail-video-product{            
            overflow:hidden;      
        }
        #video-show-source{
           
        }        
        #main-image-product{
            display: flex;
            align-items: center;
            overflow: hidden;            
        }
        #main-image-product #video-show{            
            width: 100%;
            height: auto;
        }
        .limit-title{
            color: #616161;
            font-style: italic;
        }
        .item-price-value{
            text-align: left;
        }
    </style>
    {{-- action="/gio-hang/them-vao-gio-hang" --}}
    <form method="POST" id="form-buy-product">
        @csrf
    <div class=" container-custom" style="background-color:rgb(236, 241, 241);" id="product-detail-body">                   
        <script>
            Details("{{$ma_san_pham}}");
            let btn_operation_value = "";            
        </script>        
    </div>
</form>
@endsection
