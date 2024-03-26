

const url = window.location.href;
const parts = url.split('/');
const id = parts[parts.length - 1];


var createEventFeedback = ()=>{
    const btn_confirm_feedback = $("#btn-confirm-feedback");    
    var star_feedbacks = document.querySelectorAll(".star-feedback")
    btn_confirm_feedback.data("evaluate-value",0);    
    star_feedbacks.forEach(function(element,index){                
        $(element).on("mouseover",function(){
            let evaluate = $("#btn-confirm-feedback").data("evaluate")                      
                for(let i = 0 ;i< index+1;i++)
                {
                    $(star_feedbacks[i]).css("color","gold")
                }              
                for(let i = evaluate-1 ;i> index;i++)
                {
                    $(star_feedbacks[i]).css("color","black")
                }      
        })
        $(element).on("click",function(){
            let evaluate = btn_confirm_feedback.data("evaluate-value")
            for(let i = evaluate ;i< index+1;i++)            
                $(star_feedbacks[i]).css("color","gold")                   
            for(let i = evaluate-1 ; i > index;i--)            
                $(star_feedbacks[i]).css("color","black")
            $("#feedback-value").text(GetContentRatingLevel(index+1));
            $("#error-feedback").slideUp();
            btn_confirm_feedback.data("evaluate-value",(index+1));                

        })
        $(element).on("mouseout",function(){
            let evaluate = btn_confirm_feedback.data("evaluate-value")
            for(let i = 4 ; i > evaluate-1;i--)            
                $(star_feedbacks[i]).css("color","black")                       
        })
    });
    btn_confirm_feedback.click(function(){
        let evaluate = btn_confirm_feedback.data("evaluate-value")
        if(evaluate==0)
        {
            return handleCreateToast("error","Vui lòng đánh giá mức độ hài lòng","error-feedback-level")
        }
        let noi_dung = "";
        var content_feedback_samples = $(".content-feedback-sample");        
        content_feedback_samples.each(function(){
            if($(this).is(":checked"))
                noi_dung+=$(this).val() + ", "
        })
        let content_feedback_value = $("#content-feedback").val().trim();
        if(content_feedback_value == "")
            noi_dung = noi_dung.substring(0,noi_dung.length-2);
        else
            noi_dung+=content_feedback_value
        if(noi_dung=="")
            return handleCreateToast("error","Vui lòng nhập nội dung đánh giá","error-feedback-level2")
        let danh_gia = {
            "muc_do_hai_long":evaluate,
            "noi_dung":noi_dung,            
        }
        if($("#feedback-incognito").is(":checked"))
            danh_gia["an_danh"] = true;
        var formData = {};
        formData["danh_gia"] = danh_gia;
        let ten_phan_loai = btn_confirm_feedback.data("classify-value") 
        if(ten_phan_loai != undefined)
        {
            formData["ten_phan_loai"] = ten_phan_loai;
            let ten_kich_co = btn_confirm_feedback.data("size-value") 
            if(ten_kich_co!=undefined)
                formData["ten_kich_co"] = ten_kich_co;
        }        
        let san_pham_id = btn_confirm_feedback.data("feedback-id-product");
        GetOrdersWithStatus(san_pham_id,id,formData,function(){
            handleCreateToast("success","Đánh giá sản phẩm thành công","success"+san_pham_id);
            $(`.feedback-${san_pham_id}`).each(function(){
                $(this).remove();
                $(".btn-close").click();
                if(!$(".btn-create-feedback").length)
                {
                    $("#modal-feedback").remove()
                }
            })
        })
    })
}

var createModalFeedback = ()=>{
    if(!$("#modal-feedback").length)
    {
        let s = `<div class="modal fade" id="modal-feedback" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg" >
                        <div class="modal-content" >
                            <div class="modal-header">
                                <h1 class="modal-title fs-5" id="exampleModalLabel">Đánh giá sản phẩm</h1>
                                <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body" style="height:700px; padding: 20px">
                                <div >
                                    <div style=" margin-top: 20px;">
                                        <center>
                                            <div class="feedback-image-product" style="height:120px; width:100px; border:1px solid #000">                                                
                                            </div>
                                        </center>
                                        <center><b id="feedback-produce-name">Tên sản phẩm</b></center>
                                    </div>
                                    <center>`
            for(var i = 0 ;i<5 ;i++)
                s+=`<strong class="star-feedback">
                        <svg xmlns="http://www.w3.org/2000/svg" width="70" height="70" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
                            <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
                        </svg>
                    </strong> `
            s+=`<br />
                    <span style="color:rgb(255, 153, 0); font-size:17px;" id="feedback-value">-</span>
                    <br />
                        <span style="color:crimson; font-size:14px; display: none" id="error-feedback">Vui lòng chọn số sao đánh giá</span>        
                        </center>                                                                      
                        <div class="row" style="margin-top:10px;">
                            <center><textarea maxlength="200" id="content-feedback" name="noi_dung" placeholder="Bạn cảm thấy sản phẩm như thế nào"></textarea></center>
                        </div>
                    <center class="box-feedback-sample">
                        <input type="checkbox" class="btn-check content-feedback-sample" id="chatluong"  name="noi_dung1" value="Chất lượng sản phẩm tuyệt vời" autocomplete="off">
                        <label class="btn  btn-outline-warning content-feedback-sample-label"  for="chatluong">Chất lượng sản phẩm tuyệt vời</label>
                        <input type="checkbox" class="btn-check content-feedback-sample" id="phucvutot"  name="noi_dung2" value="Shop phục vụ rất tốt"  autocomplete="off">
                        <label class="btn btn-outline-warning content-feedback-sample-label"  for="phucvutot">Shop phục vụ rất tốt</label><br>
                        <input type="checkbox" class="btn-check content-feedback-sample" id="kyluong"  name="noi_dung3" value="Đóng gói sản phẩm rất đẹp kỷ lưỡng" autocomplete="off">
                        <label class="btn btn-outline-warning content-feedback-sample-label"  for="kyluong">Đóng gói sản phẩm rất đẹp kỷ lưỡng</label>
                    </center>
                        <div style="margin-left:70px; margin-top:20px; font-size:19px;" class="form-check form-switch">
                            <input style="height:20px; width:40px" class="form-check-input btn-outline-warning btn" name="AnDanh" value="1" type="checkbox" id="feedback-incognito">
                            <label class=" form-check-label"  for="feedback-incognito" style="float:left; margin-left:5px; margin-top:-2px;">Đánh giá ẩn danh</label>
                        </div>                                                
                    </div>
                </div>
                <div class="modal-footer">                    
                    <a class="btn btn-secondary" id="btn-cancel-feedback" data-bs-dismiss="modal">Hủy bỏ</a>
                    <a class="btn btn-warning" id="btn-confirm-feedback">Đánh giá</a>
                </div>
            </div>
        </div>
        </div>`
        $("body").append($(s));
        createEventFeedback()
    }
}

GetOrderDetails(id,function(don_hang){    
    let trang_thai = GetStatusOrder(don_hang.trang_thai)
    $(".item-order-details-code").text(JsonParseStr(don_hang._id).toUpperCase())
    $(".item-order-details-status").text(trang_thai)
    $(".info-address-phone-number").text(don_hang.dia_chi_giao_hang.so_dien_thoai)
    $(".info-address-name").text(don_hang.dia_chi_giao_hang.ten_nguoi_nhan)
    $(".info-address-info").text(don_hang.dia_chi_giao_hang.dia_chi)
    $(".info-address-detail").text(don_hang.dia_chi_giao_hang.dia_chi_cu_the)
    $(".info-address-note").text(don_hang.dia_chi_giao_hang.ghi_chu ?? "---")
    $(".order-date").text(ConvertDateTimeToString(don_hang.ngay_dat_hang))
    $(".info-order-details-shipping-method").text(don_hang.phuong_thuc_van_chuyen.ten_phuong_thuc_van_chuyen)
    $(".item-order-shop-name").text(don_hang.ten_cua_hang)
    $(".btn-order-shop-access").attr("href",`${URL_HOST}cua-hang/${JsonParseStr(don_hang.cua_hang_id)}`)
    if(!don_hang.trang_thai["Đã hủy"] && !don_hang.trang_thai["Bị từ chối"])  
        for (const key in don_hang.trang_thai) {
            if (Object.hasOwnProperty.call(don_hang.trang_thai, key)) {
                const thoi_gian = don_hang.trang_thai[key];
                $(`span[status="${key}"]`).text(ConvertDateToString(thoi_gian))
                $(`div[color="${key}"]`).addClass("active")
                $(`div[line="${key}"]`).addClass("active")
            }
        } 
    else 
    {
        $(".box-order-details-content-buyer-info-transport").html(don_hang.trang_thai["Bị từ chối"] ? `<center class="box-order-details-content-buyer-info-transport-title">Đơn hàng đã bị từ chối</center>`:
                                                                `<center class="box-order-details-content-buyer-info-transport-title">Bạn đã hủy đơn hàng này</center>
                                                                <center>Lý do: ${don_hang.trang_thai["Đã hủy"]}</center>`)
    }
    const box_order_details_products = $(".box-order-details-products");
    let s = "";
    let total_amount = 0;
    box_order_details_products.html("")
    let feedbacks = [];
    don_hang.chi_tiet_don_hangs.forEach(chi_tiet => {
        let san_pham_id = JsonParseStr(chi_tiet.san_pham.san_pham_id);
        let total_price = chi_tiet.so_luong * chi_tiet.don_gia;
        total_amount+=total_price
        let htmlPriceExtra = ""
        if(chi_tiet.don_gia_phu)
        {
            let total_price_extra = chi_tiet.so_luong_phu * chi_tiet.don_gia_phu;
            total_amount += total_price_extra;
            htmlPriceExtra = `<div>
                <span class="item-product-quantity">${(chi_tiet.don_gia_phu).toLocaleString("de-DE")} x ${chi_tiet.so_luong_phu}</span>
                <strong class="item-product-price">${(total_price_extra).toLocaleString("de-DE")}đ</strong>
            </div>`
        }
        s=`<div class="item-order-product">
                <div class="row">
                    <div class="col-lg-2 col-xxl-1 col-md-3 col-sm-4 col-5">
                        <div class="image-product w-100 h-100" style="background: url(${URL_HOST}uploads/${don_hang.cua_hang_id}/${san_pham_id}/${chi_tiet.san_pham.anh_bia}); background-size: cover; ">                                                
                        </div>
                    </div>
                    <div class="col-lg-10 col-xxl-11 col-md-9 col-sm-8 col-7">
                        <strong class="item-product-name text-dark">${chi_tiet.san_pham.ten_san_pham}</strong>
                        <div class="box-btn-create-feedback">                            
                        </div>                        
                        <div style="clear: both"></div>
                        <span class="item-product-classify">`
                        if(chi_tiet.san_pham.ten_phan_loai)
                        {
                            s+=chi_tiet.san_pham.ten_phan_loai;
                            if(chi_tiet.san_pham.ten_kich_co)
                                s+=" | "+chi_tiet.san_pham.ten_kich_co;
                        }
                        s+=`</span><br>
                        <span class="item-product-quantity">${(chi_tiet.don_gia).toLocaleString("de-DE")} x ${chi_tiet.so_luong}</span>
                        <strong class="item-product-price">${(total_price).toLocaleString("de-DE")}đ</strong>
                        ${htmlPriceExtra}
                    </div>
                </div>
            </div>`
        var item_order_product = $(s);
        if(chi_tiet.danh_gia != null && feedbacks.indexOf(`feedback-${san_pham_id}`)==-1)        
            feedbacks.push(`feedback-${san_pham_id}`)
        if( trang_thai == "Đã giao" && !chi_tiet.danh_gia)
        {
            if(feedbacks.indexOf(`feedback-${san_pham_id}`)==-1)
            {
                createModalFeedback();
                let btn_feedback = $(`<a class="btn-create-feedback feedback-${san_pham_id}" data-bs-toggle="modal" data-bs-target="#modal-feedback">Đánh giá</a>`);
                var btn_confirm_feedback = $("#btn-confirm-feedback"); 
                btn_feedback.click(function(){                
                    if(btn_confirm_feedback.data("feedback-id-product") != undefined && btn_confirm_feedback.data("feedback-id-product")!=san_pham_id)                
                        resetLevelFeedback();                                    
                    else
                    {
                        console.log(chi_tiet.san_pham.ten_kich_co)
                        $(".feedback-image-product").css('background',`url(${URL_HOST}uploads/${don_hang.cua_hang_id}/${san_pham_id}/${chi_tiet.san_pham.anh_bia})`)
                        $(".feedback-image-product").css("background-size",'cover');                
                        $("#feedback-produce-name").text(chi_tiet.san_pham.ten_san_pham)
                        btn_confirm_feedback.data("feedback-id-product",san_pham_id);
                        btn_confirm_feedback.data("classify-value",chi_tiet.san_pham.ten_phan_loai);
                        btn_confirm_feedback.data("size-value",chi_tiet.san_pham.ten_kich_co);                                  
                    }
                    
                })
                item_order_product.find(".box-btn-create-feedback").append(btn_feedback);
            }            
        }                                 
        box_order_details_products.append(item_order_product);
    });  
    if(feedbacks.length>0) 
    {
        feedbacks.forEach(feedback=>{
            $("."+feedback).each(function(){
                $(this).remove();
            }) 
        }) 
        if(!$(".btn-create-feedback").length)
            $("#modal-feedback").remove()
    }     
    $(".total_amount").text(total_amount.toLocaleString("de-DE"));
    $(".into-money").text(don_hang.thanh_tien.toLocaleString("de-DE"));
    $(".payment-method").text(don_hang.phuong_thuc_thanh_toan)
    if(trang_thai == "Chờ xác nhận" || trang_thai == "Đang xử lý")
    {
        $(".box-order-details").append(createBoxCancelOrder());
    }
})

var createBoxCancelOrder = ()=>{
    var box_cancel_order = $(`<div class="box-btn-cancel-order">
                                <button class="btn btn-danger" id="btn-cancel-order" data-bs-toggle="modal" data-bs-target="#modal-cancel-order">Hủy bỏ đơn hàng</button>               
                            </div>
                            <div style="clear: both"></div>
                            <div class="modal fade" id="modal-cancel-order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" >
                                    <div class="modal-content" >
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Tại sao bạn muốn hủy bỏ đơn hàng này?</h1>
                                            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="box-cancel-order">
                                                <form action="" id="form-cancel-order" method="POST">
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do1" value="Tôi muốn thay đổi địa chỉ giao hàng" checked>                                    
                                                        <label for="ly_do1">Tôi muốn thay đổi địa chỉ giao hàng</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do2" value="Tôi muốn nhập/thay đổi mã Voucher">                                    
                                                        <label for="ly_do2">Tôi muốn nhập/thay đổi mã Voucher</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do3" value="Tôi muốn thay đổi sản phẩm trong đơn hàng">                                    
                                                        <label for="ly_do3">Tôi muốn thay đổi sản phẩm trong đơn hàng</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do4" value="Thủ tục thanh toán quá rắc rối">                                    
                                                        <label for="ly_do4">Thủ tục thanh toán quá rắc rối</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do5" value="Tìm thấy giá rẻ hơn ở chỗ khác">                                    
                                                        <label for="ly_do5">Tìm thấy giá rẻ hơn ở chỗ khác</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do6" value="Đổi ý, không muốn mua nữa">                                    
                                                        <label for="ly_do6">Đổi ý, không muốn mua nữa</label>
                                                    </div>
                                            </form>
                                            </div>                           
                                        </div>
                                        <div class="modal-footer">                    
                                            <a class="btn btn-secondary" id="btn-cancel" data-bs-dismiss="modal">Hủy bỏ</a>
                                            <a class="btn btn-warning" id="btn-confirm">Xác nhận</a>
                                        </div>
                                    </div>
                                </div>
                            </div>`);
    box_cancel_order.find("#btn-confirm").click(function(){
        showMessage("Thông báo","Xác nhận bạn muốn hủy đơn hàng này?",function(){                
            let formData = $('#form-cancel-order').serialize();
            console.log(formData)
            CancelOrder(id,formData,()=>{
                handleCreateToast("success","Bạn đã hủy đơn hàng thành công");
                $(".item-order-details-status").text("Đã hủy")
                $(".btn-close").click();
                box_cancel_order.remove();
            });
        })
    })
    return box_cancel_order;
}

var resetLevelFeedback = () =>{
    const btn_confirm_feedback = $("#btn-confirm-feedback"); 
    var star_feedbacks = document.querySelectorAll(".star-feedback")
    btn_confirm_feedback.data("evaluate-value",0);
    $("#feedback-value").text("-");
    $("#content-feedback").val("")
    for(let i = 0 ;i< 5;i++)
    {
        $(star_feedbacks[i]).css("color","black")
    } 
}

// var getFeedbackLevel = (level)=>{
//     switch (level) {
//         case 1:
//             return "Quá tệ";
//         case 2:
//             return "Không hài lòng";
//         case 3:
//             return "Bình thường";
//         case 4:
//             return "Hài lòng";
//         default:
//             return "Cực kì hài lòng"
//     }
// }
