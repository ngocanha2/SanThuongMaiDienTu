const information_inputs = $(".information-input");
const btn_update = $(".btn-update");
const update_data_information = $("#update-data-information")
const btn_update_avatar = $(".btn-update-avatar");
const radio_gender_male = $("#radio-gender-male");
const radio_gender_female = $("#radio-gender-female");
const radio_gender_other = $("#radio-gender-other");
const error_informations = $(".error-information")
update_data_information.change(function(){
    if($(this).is(":checked"))
    {
        setInputReadonly(false)
        btn_update.text("Cập nhật")
        btn_update.removeClass("btn-outline-dark")
        btn_update.addClass("btn-warning")
    }
    else
    {
        for(var element of error_informations)
            if($(element).css("display")!=="none")
                return;
        showMessage("Thông báo","Xác nhận cập nhật thông tin cá nhân?",function(){
            var formData = new FormData();
            formData.append("avatar",input_choose_avatar[0].files[0]);
            var info = {
                "ten_dang_nhap":input_username.val(),
                "ho_ten":input_full_name.val(),
                "so_dien_thoai":input_phone_number.val(),
                "email":input_email.val(),
                "ngay_sinh":input_date_of_birth.val(),
                "gioi_tinh":$("input[type='radio']:checked").val()
            }
            formData.append("info",JSON.stringify(info));
            updateInfoPersonal(formData,function(){
                setInputReadonly(true)
                btn_update.text("Chỉnh sửa")
                btn_update.addClass("btn-outline-dark")
                btn_update.removeClass("btn-warning")
            })
        })
    }
})
var setInputReadonly = (boolValue)=>{
    information_inputs.each(function(){
        $(this).attr("readonly",boolValue);        
        btn_update_avatar.attr("disabled",boolValue)
        return boolValue ?  $(this).removeClass("information-input-hover"): $(this).addClass("information-input-hover");
          
    })
    $("input[type='radio']").each(function(){
        $(this).attr("disabled",boolValue)
    })
}

setInputReadonly(true);



const box_add_avatar = $(".box-drop-drag-avatar");
const title_choose_avatar = $(".title-choose-avatar");
const btn_choose_avatar = $("#btn-choose-avatar");
const input_choose_avatar = $(".input-choose-avatar");
const box_show_avatar = $(".box-show-avatar");


function showFileImage(file) {            
    const fileType = file.type;
    const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validExtensions.includes(fileType)) {
        const fileReader = new FileReader();
        fileReader.onload = function () {                          
            const fileUrl = fileReader.result;                                
            let img = $(`<div class="avatar-preview" style="background: url(${fileUrl}); background-size:cover ">                                                          
                        </div>`);                                                                                                                         
            box_show_avatar.html(img);
            box_show_avatar.fadeIn();
        }                
        fileReader.readAsDataURL(file);          
    } else {
        handleCreateToast("error","Không đúng định dạng hình ảnh!!!","info-images")        
    }
    title_choose_avatar.text("Chọn hoặc kéo thả ảnh vào đây")
}

box_add_avatar.on('drop', function (ev) {
    ev.preventDefault();
    const files = ev.originalEvent.dataTransfer.files;
    showFileImage(files[0])
});
input_choose_avatar.on("change",function(ev){
    showFileImage(this.files[0]);
})



const btn_cancel = $("#btn-cancel")
const btn_confirm = $("#btn-confirm")
const image_avatar = $("#image-avatar");
const input_avatar = $("#input-avatar")
const item_remove_avatar = $(".item-remove-avatar");

const input_username = $("#input-username")
const input_full_name = $("#input-full-name")
const input_phone_number = $("#input-phone-number")
const input_email = $("#input-email")
const input_date_of_birth = $("#input-date-of-birth")


const error_input_username = $("#error-input-username")
const error_input_full_name = $("#error-input-full-name")
const error_input_phone_number = $("#error-input-phone-number")
const error_input_email = $("#error-input-email")
const error_input_date_of_birth = $("#error-input-date-of-birth")


const error_input_username_message = "Tên đăng nhập không được để trống";
const error_input_full_name_message  = "Họ tên không được để trống";
const error_input_phone_number_message  = "Số điện thoại không được để trống";
const error_input_email_message  = "Email không được để trống";
const error_input_email_message_format = "Email không đúng định dạng";
const error_input_date_of_birth_message  = "Ngày sinh phải lớn hơn ngày hiện tại";

btn_cancel.click(function(){    
    box_show_avatar.fadeOut();
    box_show_avatar.html("");
})
btn_confirm.click(function(ev){
    var avatar_preview = $(".avatar-preview");
    if(avatar_preview.length)
    {        
        image_avatar.css("background",avatar_preview.css("background"))
        image_avatar.css("background-size","cover")
        input_avatar[0].files = input_choose_avatar[0].files;
        item_remove_avatar.fadeIn();
    }    
    else
    {        
        handleCreateToast("info","Bạn chưa chọn ảnh mới","info1");
    }
})



var GetInfoUser = ()=>{
    GET(BASE_URL_API+PREFIX_PERSONAL+PREFIX_PERSONAL_INFO,function(data){                           
        let pathAvatar = URL_HOST + "uploads/avatar/";
        if(data.anh_dai_dien)  
        {
            pathAvatar+=data.anh_dai_dien;
            image_avatar.css("background",`url(${pathAvatar})`);
            image_avatar.css("background-size","cover")
            item_remove_avatar.fadeIn();
        }        
        input_username.val(data.ten_dang_nhap)
        input_full_name.val(data.ho_ten)
        input_phone_number.val(data.so_dien_thoai)
        input_email.val(data.email)
        if(data.ngay_sinh)
            input_date_of_birth.val(ConvertDateToString(data.ngay_sinh))
        if(data.gioi_tinh)
            $(`input[type="radio"][value="${data.gioi_tinh}"]`).attr("checked",true);        
        $("#input-joining-date").text(ConvertDateToString(data.ngay_tao))
        $("#input-password").text('*'.repeat(data.mat_khau.length))
    });
}

GetInfoUser();


createEventClickChooseImage(btn_choose_avatar,input_choose_avatar)
createEventDragoverImage(box_add_avatar,title_choose_avatar)
createEventDragleaveImage(box_add_avatar,title_choose_avatar)
createInputNumber(input_phone_number);

createEventInputNotImptyCustom(input_username,error_input_username,error_input_username_message)
createEventInputNotImptyCustom(input_full_name,error_input_full_name,error_input_full_name_message)
createEventInputNotImptyCustom(input_phone_number,error_input_phone_number,error_input_phone_number_message)
//createEventInputNotImptyCustom(input_email,error_input_email,error_input_email_message)
input_email.blur(function(){
    if($(this).val()=="")    
        return messageSizeShow(error_input_email,error_input_email_message,$(this))            
    else if(!isEmail($(this).val()))            
        return messageSizeShow(error_input_email,error_input_email_message_format,$(this))    
        messageSizeHide(error_input_email,$(this))
})
input_date_of_birth.change(function(){
    if(new Date($(this).val())>TODAY)
        messageSizeShow(error_input_date_of_birth,error_input_date_of_birth_message,$(this))
    else
        messageSizeHide(error_input_date_of_birth,$(this))
})
