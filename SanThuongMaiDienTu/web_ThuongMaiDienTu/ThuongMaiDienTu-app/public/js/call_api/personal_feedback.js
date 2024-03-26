var GetOrdersWithStatus = (san_pham_id,don_hang_id,formData,func_success)=>{
    console.log(formData)
    $.ajax({
        url: BASE_URL_API+PREFIX_ACCOUNT_PERSONAL+PREFIX_ORDER+don_hang_id+"/"+san_pham_id+"/"+PREFIX_FEEDBACK,
        type: "POST",    
        data:formData,     
        //contentType: 'application/json',           
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            }, 
        success: function (res) {               
            console.log(res)
            if(res.success)  
            {
                if(typeof func_success === "function")
                    func_success(res.data);
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors);                                
        }
    });
}