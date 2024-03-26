var GetAddressAll = ( func_success,msg_info, msg_error,func_add)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_ACCOUNT_PERSONAL+PREFIX_ADDRESS+PREFIX_ADDRESS_ALL,
        type: 'GET',              
        success: function (res) {   
            console.log(res)            
            switch (res.status) {
                case 0:
                    if(typeof func_add === "function")
                        func_add()
                    return msg_info ? handleCreateToast("info",msg_info,"info-check-address") : null;
                    break;
                case -1:
                    return msg_error ? handleCreateToast("error",msg_error,"error-check-address") : null;
                    break;                            
                default:
                    if(typeof func_success ==="function")
                        func_success(res.data)
                    break;
            }                              
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors ?? xhr.responseJSON.message); 
        }
    });
}

var SetAddressDefault = (id,func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_ACCOUNT_PERSONAL+PREFIX_ADDRESS+id+"/"+PREFIX_ADDRESS_SET_DEFAULT,
        type: 'POST',  
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },            
        success: function (res) {               
            console.log(res);            
            if(res.success)                       
                if(typeof func_success ==="function")
                    func_success();                                                        
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors ?? xhr.responseJSON.message); 
        }
    });    
}

var DeleteAddress = (id,func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_ACCOUNT_PERSONAL+PREFIX_ADDRESS+id,
        type: 'DELETE',  
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },            
        success: function (res) {               
            console.log(res);            
            if(res.success)                       
                if(typeof func_success ==="function")
                    func_success(res.data)                                                        
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors ?? xhr.responseJSON.message); 
        }
    });   
}

var UpdateAddress = (id,formData,func_success)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_ACCOUNT_PERSONAL+PREFIX_ADDRESS+id,
        type: 'PUT',  
        data: formData,
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },            
        success: function (res) { 
            console.log(res);                                     
            if(res.success)                       
                if(typeof func_success ==="function")
                    func_success(res.data)                                                        
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors ?? xhr.responseJSON.message); 
        }
    }); 
}

var InsertAddress = (formData,func_success)=>{        
    $.ajax({
        url: BASE_URL_API+PREFIX_ACCOUNT_PERSONAL+PREFIX_ADDRESS+PREFIX_ADDRESS_INSERT,
        type: 'POST',  
        data: formData,
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },            
        success: function (res) {                                      
            if(res.success)                       
                if(typeof func_success ==="function")
                    func_success(res.data)                                                        
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors ?? xhr.responseJSON.message); 
        }
    }); 
}
