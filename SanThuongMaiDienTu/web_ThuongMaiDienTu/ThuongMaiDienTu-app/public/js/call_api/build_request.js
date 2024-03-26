var POST = (url,data = null,func_success = null)=>{
    CreateApiWithNotification(url,"POST",data,func_success);
}
var GET = (url,data = null,func_success = null)=>{
    CreateApiWithNotification(url,"GET",data,func_success);
}
var PUT = (url,data = null,func_success = null)=>{
    CreateApiWithNotification(url,"PUT",data,func_success);
}
var DELETE = (url,data = null,func_success = null)=>{
    CreateApiWithNotification(url,"DELETE",data,func_success);
}

var CreateApiWithNotification = (url,type,data = null,func_success = null)=>{
    return typeof data === "function" ? CallApiWithNotification(url,type,null,data):CallApiWithNotification(url,type,data,func_success);
}

var CallApiWithNotification = (url,type,data = null,func_success = null)=>{
    $.ajax({
        url: url,
        type: type,   
        data:data,    
        //contentType: 'application/json', 
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
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors);                     
            if(xhr.status==404)
                $("body").html(error404());
        }
    });
}
var error404 = () =>{
    return `<div class="container">
        <div>
            lỗi 404: không tìm thấy dữ liệu
        </div>
    </div>`;
}


// headers:{
//     'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
//     },