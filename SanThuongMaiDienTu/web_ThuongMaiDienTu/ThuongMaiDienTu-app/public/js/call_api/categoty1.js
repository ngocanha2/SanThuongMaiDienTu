var getCategory = (danh_muc_id = null, func_success)=>{
    if(danh_muc_id=="")
        return;
    let url = BASE_URL_API+PREFIX_CATEGORY+(danh_muc_id != null ? danh_muc_id : "");    
    $.ajax({
        url: url,
        type: "GET",              
        contentType: 'application/json', 
        success: function (res) {               
            if(res.success)  
            {
                if(typeof func_success === "function")
                    func_success(res.data);
            }   
            else            
                handleCreateToast("error",res.message,'err');            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại");                      
            if(xhr.status==404)
                $("body").html(error404());
        }
    });
}