<link href="{{ asset('css/bootstrap.css') }}" rel="stylesheet">
<link href="{{ asset('css/library/enter_quantity.css') }}" rel="stylesheet">
<style>
    .box-shadow{
        background-color: white;
        border-radius: 10px;
        box-shadow: 1px 4px 10px #AAAAAA;
    }
    .box-white{        
        background-color: white;
        border-radius: 10px;
    }
    .page-item{        
        cursor: pointer;
    }
    input[type="checkbox"]:checked{
            background-color: rgb(255, 166, 0)!important;
            box-shadow: 1px 1px 2px rgb(255, 166, 0);
            border: 1px solid #fb7500;
        }
    select option:hover {
        background-color: rgb(255, 166, 0)!important;
        color: #000; /* Màu chữ cho tùy chọn đã chọn */
    }
</style>
<script src="{{ asset('js/bootstrap.js') }}"></script>
{{-- <link rel="stylesheet" href="{{ asset('FE/css/core-style.css') }}"> --}}
<link rel="stylesheet" href="{{ asset('FE/css/font-awesome.min.css') }}">
<script src="{{ asset('js/call_api/build_request.js') }}"></script>
{{-- <script src="https://kit.fontawesome.com/213b585f79.js" crossorigin="anonymous"></script> --}}
<!-- Jquery -->
<script rel="stylesheet" src="{{ asset('js/library/jquery.min.js') }}"></script>

<!--toastMessage-->
<link rel="stylesheet" href="{{asset('css/library/toast_message.css')}}" />    
<link rel="stylesheet" href="{{asset('css/library/message-box.css')}}" />    

<!--config setup-->
<script  rel="stylesheet" src="{{asset('js/call_api/config2.js')}}"></script>
<script rel="stylesheet" src="{{ asset('js/library/buildfontendrestfullapi.js') }}"></script>
<!--pagination-->
<script  rel="stylesheet" src="{{asset('js/library/pagination.js')}}"></script>

<!--Message Box-->
<script src="{{asset('js/library/message2.js')}}"></script>
<!--Helper-->
<script src="{{asset('js/library/helper2.js')}}"></script>




<!-- ##### notifications ##### -->
<ul class="notifications"></ul>
@yield('main') 
<!-- Toastmessage -->
<script type="text/javascript" src="{{asset('js/library/toastmessage.js')}}"></script>   