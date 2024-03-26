$("#voucher-name").on("blur",function(){    
    checkValidateVoucherName(this);
})
var checkValidateVoucherName = (dom)=>{
    if($(dom).val()=="")    
        $("#error-voucher-name").text("Tên chương trình không được để trống!!!");    
    else if($(dom).val().length < 8)    
        $("#error-voucher-name").text("Tối thiểu 8 kí tự");    
    else    
    {
        $("#error-voucher-name").text(""); 
        return true;
    }    
    return false;
}

$("#voucher-code").on("keydown",function(ev){            
    if(containsSpecialCharacter(ev.key) || checkForUnsignedString(ev.key))    
        ev.preventDefault();    
})


var checkValidateVoucherCode = (dom,ma_khuyen_mai = null,func)=>{
    if($(dom).val()=="")    
    $("#error-voucher-code").text("Mã giảm giá không được để trống!!!");    
    else if($(dom).val().length<4)    
        $("#error-voucher-code").text("Mã giảm giá phải có tối thiểu 4 kí tự");    
    else if(ma_khuyen_mai != null && $(dom).val()==ma_khuyen_mai)
    {
        if(typeof func === "function")              
            return func(true);
    }
    else
    {        
        if($(dom).data('now-value') != $(dom).val())
        {                        
            checkVoucherCodeExist($(dom).val(),(res)=>{                                               
                switch (res.status) {
                    case 1:
                        $("#error-voucher-code").text("Mã giảm giá này đã tồn tại, vui lòng tạo 1 mã khác");
                        $(dom).data('now-value',$(dom).val());
                        $("#btn-submit").attr("disabled",true)
                        break;
                    case 0:
                        $("#error-voucher-code").text("");  
                        $("#btn-submit").attr("disabled",false);                                                                      
                        if(typeof func === "function")              
                            return func(true);
                        break;

                    default:
                        $("#error-voucher-code").text("Đã xãy ra lỗi, vui lòng thử lại"); 
                        break;
                }
                if(typeof func === "function")              
                    return func(false);
            });
        }               
    }
    if(typeof func === "function")              
        return func(false);   
}
//$("#start-day").val(convertDateTimeToString(TODAY));
$("#start-day").on("change",function(){
    checkVaidateVoucherSaleTime();
})
$("#end-day").on("change",function(){
    checkVaidateVoucherSaleTime();
})
var checkVaidateVoucherSaleTime = ()=>{
    var startDay = new Date($("#start-day").val())    
    var endDay = new Date($("#end-day").val())  
    // if(startDay<TODAY)    
    //     $("#error-sale-time").text("Ngày bắt đầu không được nhỏ hơn ngày hiện tại!")    
    // else 
    if(endDay == "Invalid Date")    
        $("#error-sale-time").text("Vui lòng chọn ngày kết thúc!")    
    else if(endDay <= TODAY)
        $("#error-sale-time").text("Ngày kết thúc không được nhỏ hơn ngày hiện tại!")
    else if(startDay>=endDay)
        $("#error-sale-time").text("Ngày kết thúc phải lớn hơn ngày bắt đầu!")
    else
    {
        $("#error-sale-time").text("")
        return true;
    }
    return false;
}
$("#chk-option-sale-time-system").on("change",function(){
        $("#sale-time-custom").slideToggle();
        $("#sale-time-system").slideToggle();

});
createInputNumber("#discount-rate",1,100);
createInputNumber("#minimum-order",0,999999999);
createInputNumber("#discount-limit",1,999999999);
createInputNumber("#turns-of-use",1,999999999);



createEventInputNotImpty("discount-rate","Tỷ lệ giảm giá không được để trống!!!");
createEventInputNotImpty("minimum-order","Không được để trống!!!");
createEventInputNotImpty("discount-limit","Hạn mức không được để trống!!!");
createEventInputNotImpty("turns-of-use","Lượt sử dụng không được để trống!!!");

createEventSelect("#minimum-order")


var getCheckValidateVoucher = ()=>{
    return [checkValidateVoucherName("#voucher-name"), checkVaidateVoucherSaleTime()
    ,checkValidateInputNotImpty("discount-rate","Tỷ lệ giảm giá không được để trống!!!") 
    ,checkValidateInputNotImpty("minimum-order","Không được để trống!!!") 
    ,checkValidateInputNotImpty("discount-limit","Hạn mức không được để trống!!!") 
    ,checkValidateInputNotImpty("turns-of-use","Lượt sử dụng không được để trống!!!")];
}

var createEventFormCreateVoucher = ()=>{
    $("#voucher-code").on("blur",function(){
        checkValidateVoucherCode(this);
    })
    $("#form-create-voucher").on("submit",(ev)=>{
        ev.preventDefault(); 
        var check_validates = getCheckValidateVoucher(); 
        checkValidateVoucherCode("#voucher-code",null,(chk_exist)=>{
            if( chk_exist && check_validates.indexOf(false)==-1)
            {
                let formData = $('#form-create-voucher').serialize();
                createVoucherStore(formData,(res)=>{
                    console.log(res);
                    handleCreateToast("success","Thao tác thành công");
                    //resetFormVoucher();
                }); 
            }
            else            
            {
                handleCreateToast("info","Vui lòng kiểm tra lại thông tin!","info-validate-voucher");                        
            }
        })                                                 
    })
}


var createEventFormUpdateVoucher = (ma_khuyen_mai)=>{
    $("#form-create-voucher").on("submit",(ev)=>{
        ev.preventDefault(); 
        var check_validates = getCheckValidateVoucher(); 
        if(check_validates.indexOf(false)==-1)
        {
            showMessage("Thông báo","Xác nhận cập nhật khuyến mãi này?",function(){
                let formData = $('#form-create-voucher').serialize();
                updateVoucherStore(ma_khuyen_mai,formData,(res)=>{
                    handleCreateToast("success","Cập nhật voucher thành công");
                    ma_khuyen_mai = $("#voucher-code").val()
                    createEventFormUpdateVoucher(ma_khuyen_mai)
                    changeURLWithoutReloading(URL_HOST + PREFIX_STORE + PREFIX_VOUCHER + ma_khuyen_mai);
                }); 
            })
        }
        else            
            handleCreateToast("info","Vui lòng kiểm tra lại thông tin!","info-validate-voucher");
        })                                                                        
}

var resetFormVoucher = ()=>{
    $("#voucher-name").val("");
    $("#voucher-code").val("");
    $("#start-day").val(convertDateTimeToString(TODAY=new Date()));
    $("#end-day").val("");
    $("#discount-rate").val("");
    $("#minimum-order").val(0);
    $("#discount-limit").val("");
    $("#turns-of-use").val("");
}

var loadVoucherUpdate = (ma_khuyen_mai)=>{
    checkVoucherCodeExist(ma_khuyen_mai,function(res){
        if(res.status!=1)
        {
            $("body").html(error404());
            return;
        }
        var khuyen_mai = res.data.khuyen_mai;
        if(khuyen_mai.ten_khuyen_mai)
            $("#voucher-name").val(khuyen_mai.ten_khuyen_mai);
        $("#voucher-code").val(khuyen_mai.ma_khuyen_mai);
        $("#start-day").val(ConvertDateTimeToString(khuyen_mai.ngay_bat_dau));
        $("#end-day").val(ConvertDateTimeToString(khuyen_mai.ngay_ket_thuc));
        $("#discount-rate").val(khuyen_mai.ty_le_giam_gia*100);
        $("#minimum-order").val(khuyen_mai.don_hang_toi_thieu);
        $("#discount-limit").val(khuyen_mai.muc_giam_toi_da);
        $("#turns-of-use").val(khuyen_mai.so_luong);
        createEventSelect("#voucher-name")
        createEventSelect("#voucher-code")
        createEventSelect("#discount-rate")
        createEventSelect("#discount-limit")
        createEventSelect("#turns-of-use")
        $("#voucher-code").on("blur",function(){
            checkValidateVoucherCode(this,ma_khuyen_mai);
        })
        createEventFormUpdateVoucher(ma_khuyen_mai)
    })
}