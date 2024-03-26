var updateInfoPersonal = (formData,func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_PERSONAL+PREFIX_PERSONAL_INFO,
        type: "POST",   
        data:formData,    
        contentType: false,
        processData: false,
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },
        success: function (res) {               
            if(res.success)  
            {
                handleCreateToast("success","Cập nhật thông tin thành công");
                console.log(res)
                if(typeof func_success === "function")
                    func_success()
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại");                      
        }
    });
}