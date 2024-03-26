

function showMessage(title,mes,function_submit,function_cancel = null)
{
    let s = `<div class="modall" id="message-box">
                <div>
                    <div class="modal__innerr">
                        <div class="modal__headerr">
                            <p>${title}</p>
                            <i class="fas fa-times" id="btn-message-box-close" ></i>
                        </div>
                        <div class="modal__bodyy">
                            <span>${mes}</span>
                        </div>
                        <div class="modal__footerr">
                            <button id="btn-message-box-cancel" class=" close btn btn-warning">Hủy bỏ</button>
                            <button id="btn-message-submit" class="btn btn-danger">Xác nhận</button>
                        </div>
                    </div>
                </div>
            </div>`;
    $("body").append(s);
    $('#btn-message-box-cancel').on("click",()=>$('.modall').remove());
    $('#btn-message-box-close').on("click",()=>$('.modall').remove());
    $('#btn-message-submit').on("click",()=>{
        if (typeof function_submit === 'function') {            
            function_submit();
            $("#message-box").remove();
        }                       
    })
    if (typeof function_cancel === 'function') {            
        $("#btn-message-box-cancel").click(()=>{
            function_cancel();        
        })                
    }
    else if(function_cancel == false)
    {
        $("#btn-message-box-close").remove()
        $("#btn-message-box-cancel").remove()
    }


}


