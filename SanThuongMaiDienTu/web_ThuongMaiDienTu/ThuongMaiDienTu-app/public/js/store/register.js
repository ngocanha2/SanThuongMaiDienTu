const input_store_name = $(`input[name="ten_cua_hang"]`);
const error_validate_store_name = $("#error-validate-store-name");
const error_validate_store_name_mess = "Tên cửa hàng không được để trống";
const btn_register_store = $("#btn-register-store");
const error_validate_address = $("#error-validate-address");

createEventInputNotImptyCustom(input_store_name,error_validate_store_name,error_validate_store_name_mess)

$("#form-register-store").on("submit",(ev)=>{
    ev.preventDefault(); 
    var chk_validate = [checkInputNotImptyCusTom(input_store_name,error_validate_store_name,error_validate_store_name_mess)]
    if($("#ward").val()=="")
    {            
        error_validate_address.slideDown();  
        chk_validate.push(false)          
    }
    else
        error_validate_address.slideUp();    
    if(chk_validate.indexOf(false)==-1)
    {
        showMessage("Thông báo","Xác nhận đăng ký bán hàng tại hệ thống của chúng tôi?",function(){
            let formData = $('#form-register-store').serialize();
            registerStore(formData);
        })
    }   
})

var registerStore = (formData)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_STORE+PREFIX_REGISTER,
        type: "POST",   
        data:formData,            
        success: function (res) {    
            console.log(res)           
            if(res.success)  
            {
                showMessage("Thành công","Chúc mừng bạn đã trở thành người bán hàng trên hệ thống của chúng tôi",function(){
                    location.replace(URL_HOST+"cua-hang")
                },false);
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            console.log(xhr)
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors ?? xhr.responseJSON.message);                     
            // if(xhr.status==404)
            //     $("body").html(error404());
        }
    });
}