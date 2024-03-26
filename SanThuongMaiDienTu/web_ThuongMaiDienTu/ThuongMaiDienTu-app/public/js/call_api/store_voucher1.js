var checkVoucherCodeExist = (ma_khuyen_mai,func_operation)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_STORE+PREFIX_VOUCHER+ma_khuyen_mai,
        type: "GET",                     
        success: function (res) {               
            if(typeof func_operation === "function")
                func_operation(res);            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại");                      
            if(xhr.status==404)
                $("body").html(error404());
        }
    });
}

var createVoucherStore = (data, func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_STORE+PREFIX_VOUCHER+PREFIX_VOUCHER_CREATE,
        type: "POST",   
        data: data,
        // contentType: 'application/json',                
        // headers:{
        //     'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
        //     },       
        success: function (res) {               
            if(res.success)  
            {
                func_success(res);
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","error--");                      
            if(xhr.status==404)
                $("body").html(error404());
        }
    });
}


var updateVoucherStore = (ma_khuyen_mai,data, func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_STORE+PREFIX_VOUCHER+ma_khuyen_mai,
        type: "PUT",   
        data: data,     
        success: function (res) {               
            if(res.success)  
            {
                func_success(res);
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","error---");                      
        }
    });
}

var deleteVoucherStore = (ma_khuyen_mai, func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_STORE+PREFIX_VOUCHER+ma_khuyen_mai,
        type: "DELETE",   
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
        },    
        success: function (res) {               
            if(res.success)  
            {
                func_success(res);
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","error---");                      
        }
    });
}