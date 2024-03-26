const input_update_address_name = $("#input-update-address-name");
const input_update_address_phone_number = $("#input-update-address-phone-number");
const result_address = $("#result-address");
const input_update_address_detail = $("#input-update-address-detail");
const input_update_address_note = $("#input-update-address-note");
const radio_home = $("#home");
const radio_office = $("#office");
const checkbox_set_address_default = $("#checkbox-set-address-default")

const error_update_address_name = $("#error-update-address-name");
const error_update_address_phone_number = $("#error-update-address-phone-number");
const error_update_address_detail = $("#error-update-address-detail");
const error_update_address_note = $("#error-update-address-note"); 
const error_update_address_select = $("#error-update-address-select"); 


const error_update_address_name_message_empty= "Tên đăng nhập không được để trống";
const error_update_address_name_message_exist = "Tên đăng nhập đã tồn tại";
const error_update_address_phone_number_message_empty = "Số điện thoại không được để trống";
const error_update_address_phone_number_message_lenght = "Số điện thoại phải có đúng 10 ký tự";
const error_update_address_detail_message_empty = "Địa chỉ cụ thể không được bỏ trống";
const error_update_address_select_message_empty = "Vui lòng chọn địa chỉ giao hàng";
const btn_confirm_address = $("#btn-confirm-address")
const btn_close = $("#btn-close");
const btn_insert_address = $("#btn-insert-address")


btn_confirm_address.data("updateId",""); 

createEventInputNotImptyCustom(input_update_address_name,error_update_address_name,error_update_address_name_message_empty)
createEventInputNotImptyCustom(input_update_address_phone_number,error_update_address_phone_number,error_update_address_phone_number_message_empty)
createEventInputNotImptyCustom(input_update_address_detail,error_update_address_detail,error_update_address_detail_message_empty)
createInputNumber(input_update_address_phone_number,null,null,false);
createEventSelect(input_update_address_name)     
createEventSelect(input_update_address_phone_number)     
createEventSelect(input_update_address_detail)     
createEventSelect(input_update_address_note)
createEventBlurCheckLength(input_update_address_phone_number,10,error_update_address_phone_number,error_update_address_phone_number_message_lenght)



var resetFormAddress = ()=>{
    input_update_address_name.val("")
    input_update_address_phone_number.val("")
    result_address.val("")
    input_update_address_detail.val("")
    input_update_address_note.val("");    
    checkbox_set_address_default.attr("checked",false);        
    btn_confirm_address.data("updateId",""); 
    btn_confirm_address.text("Thêm")
    $(`input[type='radio'][value='Nhà riêng']`).attr("checked",true);     
    $("#province")[0].selectedIndex = 0;
    $(`#province`).trigger('change')
    resetErrorAddress();
}

var loadDataAddressUpdate = (dia_chi,func_successInsert)=>{
    input_update_address_name.val(dia_chi.ten_nguoi_nhan)
    input_update_address_phone_number.val(dia_chi.so_dien_thoai)
    result_address.val(dia_chi.dia_chi)
    input_update_address_detail.val(dia_chi.dia_chi_cu_the)
    input_update_address_note.val(dia_chi.ghi_chu ?? "");
    $(`input[type='radio'][value='${dia_chi.loai_dia_chi}']`).attr("checked",true);    
    checkbox_set_address_default.attr("checked",dia_chi.mac_dinh);
    let addressItems = dia_chi.dia_chi.split(",");    
    provinceValue = addressItems[2].trim();
    districtValue = addressItems[1].trim();
    wardValue = addressItems[0].trim();         
    btn_confirm_address.data("updateId",JsonParseStr(dia_chi.id));  
    btn_confirm_address.text("Cập nhật")    
    // $(`#province`).val(provinceValue);
    // $(`#province`).trigger('change');
    selectedAddress('province',provinceValue);    
    //$(`#district`).trigger('change')
    //$(`#ward`).trigger('change')
    //selectedAddress('district',districtValue);
    //selectedAddress('ward',wardValue);
    resetErrorAddress();
    var btn_copy_address =  $(`<a class="btn btn-outline-dark itemm" id="btn-copy-address" style="position:absolute; left:5px; margin: 10px; height: 40px; font-size: 18px;">
                                    <svg style="margin-bottom:4px;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
                                        <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
                                    </svg>
                                    Tạo mới
                                </a> `)
    createEventCheckCopyAddress(btn_copy_address,dia_chi,func_successInsert);
    $("#box-update-address .modal-footer").prepend(btn_copy_address)
}

var createEventCheckCopyAddress = (btn_copy_address,dia_chi,func_successInsert)=>{
    btn_copy_address.click(function(){
    if(CheckValidate().indexOf(false)==-1)
    {        
                
        if(input_update_address_name.val() == dia_chi.ten_nguoi_nhan &&
            input_update_address_phone_number.val() == dia_chi.so_dien_thoai &&
            input_update_address_detail.val() == dia_chi.dia_chi_cu_the &&
            result_address.val() == dia_chi.dia_chi &&
            ((input_update_address_note.val() == "" && dia_chi.ghi_chu == undefined)||input_update_address_note.val() == dia_chi.ghi_chu))
        {                
            return handleCreateToast("info","Để tạo địa chỉ mới từ dịa chỉ cũ bạn cần phải thay đổi ít nhất một thông tin","info-copy-address");
        }
        else
        {       
            let formData = $('#form-update-address').serialize();     
            CallInsertAddress(formData,func_successInsert);
        }
        
    }
    else
        handleCreateToast("error","Bạn chưa cập nhật đủ thông tin","error",true);        
            
    });
}




var createEventFormUpdateAddress = (func_successUpdate,func_successInsert,func_UpdateSuccessAddressDefault)=>{
    $("#form-update-address").on("submit",(ev)=>{
        ev.preventDefault();
        
        if(CheckValidate().indexOf(false)==-1)
        {        
            let formData = $('#form-update-address').serialize();     
            let updateId = btn_confirm_address.data("updateId");
            if(updateId!="")
            {
                UpdateAddress(updateId,formData,function(){
                    handleCreateToast("success","Cập nhật địa chỉ thành công",null,true);  
                    //btn_close.click();                                                                                               
                    var item_update = $(`#id${updateId}`);                                        
                        if(checkbox_set_address_default.is(":checked"))
                        {   if(typeof func_UpdateSuccessAddressDefault ==="function")
                                func_UpdateSuccessAddressDefault(item_update)  
                            else                 
                                callUpdateSuccessAddressDefault(updateId,item_update)
                        }                                              
                    updateBoxAddress(item_update);  
                    if(typeof func_successUpdate === "function")
                    func_successUpdate()                                                                                                
                });
            }
            else
            {                         
                CallInsertAddress(formData,func_successInsert);
            }
            
        }
        else
            handleCreateToast("error","Bạn chưa cập nhật đủ thông tin","error");
    })
}


var updateBoxAddress = (item_address)=>{
    let note = input_update_address_note.val();
    item_address.find(".item-address-recipient-name").text(input_update_address_name.val())
    item_address.find(".item-address-type").text($(`input[type="radio"][name="loai_dia_chi"]:checked`).val())
    item_address.find(".item-address-phone-number").text(input_update_address_phone_number.val())
    item_address.find(".item-address-info").text(result_address.val())
    item_address.find(".item-address-detail").text(input_update_address_detail.val())
    item_address.find(".item-address-note").text( note == "" ? "---" : note);
}


var callUpdateSuccessAddressDefault = (updateId,item_update) =>{
    refreshItemAddressDefaultOld();                        
    item_update.find(".box-btn-set-default").remove();    
    item_update.append(createBoxAddressDefault(updateId))
}


var resetErrorAddress = ()=>{
    errorHide(input_update_address_name,error_update_address_name),
    errorHide(input_update_address_phone_number,error_update_address_phone_number),
    errorHide(input_update_address_detail,error_update_address_detail),
    error_update_address_select.slideUp();
}

var CallInsertAddress = (formData,func_successInsert)=>{
    return InsertAddress(formData,function(data){
        handleCreateToast("success","Thêm mới địa chỉ thành công",null,true);
        if(typeof func_successInsert === "function")
                return func_successInsert(data);
        if(data.mac_dinh)         
        {            
            refreshItemAddressDefaultOld();        
        }
        if(box_address)
            box_address.append(BuildItemAddress(data));
        btn_close.click()                            
    });
}

var CheckValidate = ()=>{
    let chk_validate =[
        checkInputNotImptyCusTom(input_update_address_name,error_update_address_name,error_update_address_name_message_empty),
        checkInputNotImptyCusTom(input_update_address_phone_number,error_update_address_phone_number,error_update_address_phone_number_message_empty),
        checkInputNotImptyCusTom(input_update_address_detail,error_update_address_detail,error_update_address_detail_message_empty),
        checkLength(input_update_address_phone_number,10,error_update_address_phone_number,error_update_address_phone_number_message_lenght)
    ];    
    if($("#ward").val()=="")
    {
        error_update_address_select.text(error_update_address_select_message_empty)
        error_update_address_select.slideDown();
        chk_validate.push(false);
    }
    return chk_validate;
}

