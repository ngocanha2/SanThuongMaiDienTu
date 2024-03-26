@extends('layouts.layout_personal')
@section('content')
<style>
    .box-address{
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;        
    }
    .item-address{
        position: relative;
        padding: 10px 20px;
        padding-bottom: 30px;
        width: 500px;   
        border: 2px dashed #000;
        border-radius:5px;   
        z-index: 3;    
        margin-left:10px;
        margin-right: 10px; 
        margin-bottom:30px;         
    }
    .item-address-recipient-name{
        font-size: 19px;
        color: #f7b500;
    }
    .item-address-phone-number{
        font-weight: 700;
    }
    .item-address-type{
        font-weight: 500;
    }
    .item-address-detail{
        color: #aaaaaa;
    }
    .item-address-note{
        color: #aaaaaa;
        font-style: italic;
    }
    .item-address-default{
        position: absolute;
        background-color: crimson;
        padding: 5px 20px;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 5px;
        color:white;
        top: -15px;
        right: -2;
    }
    .item-address-btn-update{
        position: absolute;
        top: 50%;
        width: 100%;        
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;         
    }
    .item-address-btn-update a,
    .item-address-btn-update button{
        width: 100px
    }
    .item-address-btn{
        position: relative;
        min-height: 50px;
    }
    .box-btn-set-default{
        width: 100%;
        position: absolute;
        left: 0;
        bottom: -10;
        background-color: #f7cd5b;
        border:1px dashed #000;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px 0px;
        color: black;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        z-index: 1;
        cursor: pointer;
        opacity: 0;
        transition: all 0.3s;
    }
    .item-address:hover .box-btn-set-default{
        opacity: 1;
    }
    .box-btn-set-default:hover{
        color: red;
    }
</style>
<script src="{{asset("js/call_api/address.js")}}"></script>
    <div class="container">
        <div class="box-white">
            <div class="box-title-address">
                <h4 >SỔ ĐỊA CHỈ</h4>
                <a class="btn btn-outline-warning css-insert-address  btn_dc" id="btn-insert-address" data-bs-toggle="modal" data-bs-target="#box-update-address" style="height: 40px; font-size: 18px;">
                    <svg style="margin-bottom:4px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                        <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                    </svg>
                    Địa chỉ mới
                </a>
            </div>
            <div class="box-address">
                {{-- <div class="item-address">
                    <div class="item-address-default">
                        Mặc định
                    </div>
                    <div class="row">
                        <div class="col-lg-7 col-xxl-8">
                            <span><span class="item-address-recipient-name">Lee phast DDajt</span> | <span class="item-address-type" >Ngà riêng</span></span><br>
                            <span class="item-address-phone-number">0387079343</span><br>
                            <span class="item-address-info">Tây thạnh Tân Phú, HCM</span><br>
                            <span>(<span class="item-address-detail">Ấp 1</span>)</span><br>
                            <span class="item-address-note">Đây là ghi chú</span>
                        </div>                        
                        <div class="col-lg-5 col-xxl-4 item-address-btn">                            
                            <div class="item-address-btn-update">
                                <button class="btn btn-outline-danger">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                    </svg>
                                    <span>Xóa</span>
                                </button>
                                <button class="btn btn-outline-warning">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                      </svg>
                                    <span>Sửa</span>    
                                </button>
                            </div>                                                    
                        </div>       
    
                    </div>
                    <div class="box-btn-set-default">
                        <strong class="">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                              </svg>
                            <span>Đặt làm mặc định</span>    
                        </strong>
                    </div>
                </div>                  --}}
            </div>            
        </div>        
    </div>   

    @include("personal.address.layout_update_address")
<script src="{{asset("js/personal/address3.js")}}"></script>

@endsection