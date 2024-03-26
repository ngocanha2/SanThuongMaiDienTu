
var ConvertDateAsNumber = (responseJsonDate)=>{
    return parseInt(responseJsonDate.$date.$numberLong);
}

var ConvertDate = (responseJsonDate)=>{
    let value = parseInt(responseJsonDate);    
    return new Date( !isNaN(value) ? value : ConvertDateAsNumber(responseJsonDate));
}


var ConvertDateDMY = (responseJsonDate)=>{
    let date = ConvertDate(responseJsonDate);
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day<10?"0"+day:day}/${month<10?"0"+month:month}/${year}`;
}
var ConvertDateToString = (responseJsonDate)=>{
    return ConvertDate(responseJsonDate).toISOString().split('T')[0];
}
var ConvertDateTimeToString = (responseJsonDate)=>{
    let valueTime = ConvertDate(responseJsonDate).toISOString();
    let vls = valueTime.split("T");
    valueTime = vls[0] +" "
    vls = vls[1].split(":");
    valueTime+=vls[0]+":"+vls[1];
    return valueTime;
}
var JsonParseStr = (id)=>{
    return id.$oid ?? id;
}

var TODAY = new Date();


var GetOverallQuantityOfProduct = (san_pham)=>
{
    let quantity = 0;
    if(san_pham.phan_loais)
    {
        san_pham.phan_loais.forEach(phan_loai=>{
            if(phan_loai.kich_co_phan_loais)
            {
                phan_loai.kich_co_phan_loais.forEach(kich_co=>quantity+=kich_co.so_luong_ton)
            }
            else
                quantity += phan_loai.so_luong_ton;
        })
    }
    else 
        quantity = san_pham.so_luong_ton;
    return quantity;
}



function FindPriceRange(sanPham)
{
    max = sanPham.gia_hien_tai ?? -1;        
    min = null;
    if(sanPham.phan_loais)
    {
        items = sanPham.phan_loais;
        do {
            item = items.shift();
            if(item.gia_hien_tai)
            {
                max = item.gia_hien_tai ? (item.gia_hien_tai > max ? item.gia_hien_tai: max):max;
                min = item.gia_hien_tai ? (min ? (item.gia_hien_tai < min ? item.gia_hien_tai : min) :item.gia_hien_tai):min;
            }
            else if(item.kich_co_phan_loais)
                item.kich_co_phan_loais.forEach(element => {
                    items.push(element);
                });
        }while(items.length>0);
    }    
    return {
        "max":max,
        "min":min,
    };
} 
var GetPriceMinMax = (min, max)=>{
    min = parseInt(min);
    max = parseInt(max);
    return min ? (min == max ? min.toLocaleString('de-DE') : (min.toLocaleString('de-DE')+" - "+max.toLocaleString('de-DE'))) : max.toLocaleString('de-DE');
}

var GetPriceMinMaxWithDiscount = (range,discount=null)=>{
    let min = range.min ? (discount ? (range.min - range.min * discount):range.min):null;    
    let max = range.max ? (discount ? (range.max - range.max * discount):range.max):0;
    min = min ? parseInt(min) : null;
    max = max ? parseInt(max) : null;
    return min ? (min == max ? min.toLocaleString('de-DE') : (min.toLocaleString('de-DE')+" - "+max.toLocaleString('de-DE'))) : max.toLocaleString('de-DE');
}
var Subtring = (value, end = 41)=>{
    return value.length <= end-1 ? value : value.substring(0, end)+"...";
}
var GetContentRatingLevel = (rating)=>{
    return rating == 5 ? "Cực kì hài lòng" : rating == 4 ? "Hài lòng" : rating == 3 ? "Bình thường" : rating == 2 ? "Không hài lòng" : "Quá tệ";
}

var CheckSale = (san_pham)=>{
    return (san_pham.giam_gia && san_pham.giam_gia > 0 && ConvertDate(san_pham.ngay_bat_dau)<TODAY&&ConvertDate(san_pham.ngay_ket_thuc)>TODAY && san_pham.so_luong_gioi_han>0) ? true:false;
}

var loadColorCheckBox = ()=>{    
    let checkboxes = Array.from(document.querySelectorAll('input[type="checkbox"]'));
    let radios = Array.from(document.querySelectorAll('input[type="radio"]'));
    let allInputs = checkboxes.concat(radios);
    allInputs.forEach(item =>{
        $(item).on("click",()=>{
            if(item.checked)
            {                            
                item.classList.add("checked-custom");
            }
            else
                item.classList.remove("checked-custom");  
        })          
    })
}

function containsSpecialCharacter(str) {
    const pattern = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+/;
    return pattern.test(str);
}
function checkForUnsignedString(str) {
    const pattern = /[^\x00-\x7F]+/;
    return pattern.test(str);
}

function isDigit(str) {    
    const pattern = /[0-9]+/;
    return pattern.test(str);
}
function isEmail(str) {    
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return pattern.test(str);
}

var createInputNumber = (element,min = null,max = null,numeric = true)=>{
    if(max==null)
        max = 9999999999;
    if(typeof element ==="string")
        element = $(element);
    element.on("keydown",function(ev){        
        if(!isDigit(ev.key) && ev.key!=="Backspace" && ev.key!=="Delete" && ev.key!=="ArrowLeft" && ev.key!=="ArrowRight" && ev.key!=="Shift" && ev.key!=="Home" && ev.key!=="End")    
            ev.preventDefault();
    });
    if(numeric == true)    
        element.on("input",function(ev){  
            if($(this).val()!="")      
            {            
                    var value = parseInt($(this).val());
                    $(this).val(value == (min-1) ? min : value > max ? max : value);                    
            }
        });
}

var createEventSelect = (dom)=>{
    if(typeof dom === "string")
        dom = $(dom);
    dom.click(function(){
        $(this).select();
    })
}

var createEventInputNotImpty = (id,msg) =>{
    $(`#${id}`).on("blur",function(){    
        checkValidateInputNotImpty(id,msg)
    }) 
}

var checkValidateInputNotImpty = (id,msg)=>{
    if($(`#${id}`).val()=="")    
    $(`#error-${id}`).text(msg);       
    else
    {
        $(`#error-${id}`).text("");       
        return true;
    }
    return false;
}


var checkValidateInputNotImpty2 = (element,element_msg,msg)=>{      
    if(typeof element_msg === "string")
        element_msg = $(element_msg);
    
    if(element.val()=="")    
        element_msg.text(msg);       
    else
    {
        element_msg.text("");       
        return true;
    }
    return false;
}

var createEventInputNotImpty2 = (element,element_msg,msg) =>{   
    if(typeof element === "string")
        element = $(element);    
    element.on("blur",function(){    
        checkValidateInputNotImpty2($(this),element_msg,msg)
    }) 
}

var createEventBlurCheckLength = (element,length,element_msg,msg)=>{
    element.blur(function(){
        checkLength($(this),length,element_msg,msg)
    })
}

var checkLength = (element,length,element_msg,msg)=>{
    if(element.val().length != length)
    {
        messageSizeShow(element_msg,msg,element);
        return false;
    }
    else
    {
        messageSizeHide(element_msg,element);
        return true;
    }            
}


var convertDateTimeToString = (currentDate)=>{    
    const year = currentDate.getFullYear(); // Năm
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Tháng 
    const day = String(currentDate.getDate()).padStart(2, '0'); // Ngày
    const hours = String(currentDate.getHours()).padStart(2, '0'); // Giờ
    const minutes = String(currentDate.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}`;
}
var split = (str,separator)=>{
    ss = str.split(separator);
    let sss = ""
    for(s of ss)
        sss+=s;
    return s;
}
var createEventClickChooseImage = (btn_choose, input_choose)=>{
    btn_choose.click(function(){
        input_choose.click()
    })
}

var createEventDragoverImage = (box_add_image,title_choose_image)=>{
    box_add_image.on('dragover', function (envent) {
        envent.preventDefault();
        title_choose_image.text("Thả để tải ảnh lên")
    })
}

var createEventDragleaveImage = (box_add_image,title_choose_image)=>{
    box_add_image.on('dragleave', function (envent) {
        envent.preventDefault();
        title_choose_image.text("Kéo và thả để tải ảnh lên")
    })
}

var createEventInputNotImptyCustom = (element,element_msg,msg)=>{
    element.blur(function(){
        checkInputNotImptyCusTom($(this),element_msg,msg);     
    })
}

var errorShow = (element,element_msg,msg)=>{
    messageSizeShow(element_msg,msg,element);
}

var errorHide = (element,element_msg)=>{
    messageSizeHide(element_msg,element);
}
var messageSizeShow = (dom_mess,msg,input_size)=>{
    dom_mess.text(msg);
    dom_mess.slideDown()
    input_size.addClass("border-message")    
}

var messageSizeHide = (dom_mess,input_size)=>{
    dom_mess.slideUp();
    input_size.removeClass("border-message")
    dom_mess.text("");
}
checkInputNotImptyCusTom = (element,element_msg,msg)=>{    
    element.val(element.val().trim());
    if(element.val()=="")
    {
        messageSizeShow(element_msg,msg,element);
        return false;
    }
    else
    {
        messageSizeHide(element_msg,element);
        return true;

    }             
}

var selectedAddress = (id,name)=>{    
    var optionToSelect = $(`#${id} option`).filter(function() {
        return $(this).text() === name;
    });    
    optionToSelect.prop('selected', true);
    $(`#${id}`).trigger('change')
}
var GetStatusOrder = (trang_thai)=>{    
    if(trang_thai["Đã hủy"])
        return "Đã hủy";
    if(trang_thai["Bị từ chối"])
        return "Bị từ chối";
    if(trang_thai["Đã nhận"])
        return "Đã giao";
    if(trang_thai["Đã giao"])
        return "Đã giao";
    if(trang_thai["Đang giao"])
        return "Đang giao";
    if(trang_thai["Đang xử lý"])
        return "Đang xử lý";    
    return "Chờ xác nhận";
}



