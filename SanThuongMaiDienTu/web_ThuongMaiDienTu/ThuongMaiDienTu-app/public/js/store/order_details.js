

const url = window.location.href;
const parts = url.split('/');
const id = parts[parts.length - 1];

GetStoreOrderDetails(id,function(don_hang){    
    console.log(don_hang)
    let trang_thai = GetStatusOrder(don_hang.trang_thai)
    $(".item-order-details-code").text(JsonParseStr(don_hang._id).toUpperCase())
    $(".item-order-details-status").text(trang_thai)
    $(".info-address-phone-number").text(don_hang.dia_chi_giao_hang.so_dien_thoai)
    $(".info-address-name").text(don_hang.dia_chi_giao_hang.ten_nguoi_nhan)
    $(".info-address-info").text(don_hang.dia_chi_giao_hang.dia_chi)
    $(".info-address-detail").text(don_hang.dia_chi_giao_hang.dia_chi_cu_the)
    $(".info-address-note").text(don_hang.dia_chi_giao_hang.ghi_chu ?? "---")
    $(".info-order-details-shipping-method").text(don_hang.phuong_thuc_van_chuyen.ten_phuong_thuc_van_chuyen)       
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
        $(".box-order-details-content-buyer-info-transport").html(don_hang.trang_thai["Bị từ chối"] ? `<center class="box-order-details-content-buyer-info-transport-title">Bạn đã từ chối đơn hàng</center>
                                                                <center>Lý do: ${don_hang.trang_thai["Bị từ chối"]}</center>`:
                                                                `<center class="box-order-details-content-buyer-info-transport-title">Đơn hàng đã bị hủy</center>
                                                                <center>Lý do: ${don_hang.trang_thai["Đã hủy"]}</center>`)
    }
    const box_order_details_products = $(".box-order-details-products");
    let s = "";
    let total_amount = 0;
    box_order_details_products.html("")
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
                        <div class="image-product w-100 h-100" style="background: url(${URL_HOST}uploads/${JsonParseStr(don_hang.cua_hang_id)}/${san_pham_id}/${chi_tiet.san_pham.anh_bia}); background-size: cover; ">                                                
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
                        <span class="item-product-quantity">${chi_tiet.don_gia.toLocaleString("de-DE")} x ${chi_tiet.so_luong}</span>
                        <strong class="item-product-price">${(total_price).toLocaleString("de-DE")}đ</strong>
                        ${htmlPriceExtra}
                    </div>
                </div>
            </div>`
        var item_order_product = $(s);        
        box_order_details_products.append(item_order_product);
    });    
    $(".total_amount").text(total_amount.toLocaleString("de-DE"));
    $(".into-money").text(don_hang.thanh_tien.toLocaleString("de-DE"));    
    $(".payment-method").text(don_hang.phuong_thuc_thanh_toan)
    if(trang_thai == "Chờ xác nhận")
    {
        $(".box-order-details").append(createBoxRefuseOrder());
    }
    if(trang_thai != "Đã giao" && trang_thai != "Đã hủy" && trang_thai != "Bị từ chối")
    {
        const btn_update_order_status = $(`<button class="btn-update-order-status">Xác nhận đơn hàng</button>`)
        $(".box-order-details-btn-update-status").append(btn_update_order_status)
        // $(".box-order-details-btn-update-status").append(`<div style="clear: both"></div>`);
        btn_update_order_status.click(function(){
            showMessage("Thông báo","Xác nhận cập nhật trạng thái đơn hàng",function(){
                UpdateOrderStatus(id,function(trang_thai_moi){
                    console.log(trang_thai_moi)
                    handleCreateToast("success","Cập nhật trạng thái đơn hàng thành công");
                    $(".item-order-details-status").text(trang_thai_moi)
                    switch (trang_thai_moi) {
                        case "Đang xử lý":
                            $(".btn-update-order-status").text("Xác nhận giao cho DVVC")
                            $(".box-btn-cancel-order").remove();
                            $("#modal-cancel-order").remove();
                            break;
                        case "Đang giao":
                            $(".btn-update-order-status").text("Xác nhận đã giao")
                            break;
                        case "Đã giao":
                            $(".btn-update-order-status").remove();
                        default:
                            break;
                    }
                });
            });
        })
    }    
})


var createBoxRefuseOrder = ()=>{
    var box_refuse_order = $(`<div class="box-btn-cancel-order">
                                <button class="btn btn-danger" id="btn-cancel-order" data-bs-toggle="modal" data-bs-target="#modal-cancel-order">Từ chối đơn hàng</button>               
                            </div>
                            <div style="clear: both"></div>
                            <div class="modal fade" id="modal-cancel-order" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                <div class="modal-dialog" >
                                    <div class="modal-content" >
                                        <div class="modal-header">
                                            <h1 class="modal-title fs-5" id="exampleModalLabel">Tại sao bạn muốn từ chối đơn hàng này?</h1>
                                            <button type="button" class="btn-close"  data-bs-dismiss="modal" aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="box-cancel-order">
                                                <form action="" id="form-cancel-order" method="POST">
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do1" value="Tôi không xác nhận được đơn hàng" checked>                                    
                                                        <label for="ly_do1">Tôi không xác nhận được đơn hàng</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do2" value="Tôi không liên lạc được với người mua hàng">                                    
                                                        <label for="ly_do2">Tôi không liên lạc được với người mua hàng</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do3" value="Tôi nghĩ đây là 1 đơn hàng ảo">                                    
                                                        <label for="ly_do3">Tôi nghĩ đây là 1 đơn hàng ảo</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do4" value="Tôi thường hay bị người này boom hàng">                                    
                                                        <label for="ly_do4">Tôi thường hay bị người này boom hàng</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do5" value="Tôi không muốn bán cho người này">                                    
                                                        <label for="ly_do5">Tôi không muốn bán cho người này</label>
                                                    </div>
                                                    <div class="item-option-cancel-order">                                    
                                                        <input type="radio" name="ly_do" id="ly_do6" value="Tôi cảm thấy người này có ý đồ lừa đảo">                                    
                                                        <label for="ly_do6">Tôi cảm thấy người này có ý đồ lừa đảo</label>
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
    box_refuse_order.find("#btn-confirm").click(function(){
        showMessage("Thông báo","Xác nhận từ chối đơn hàng này?",function(){                
            let formData = $('#form-cancel-order').serialize();
            console.log(formData)
            RefuseOrder(id,formData,()=>{
                handleCreateToast("success","Bạn đã từ chối đơn hàng thành công");
                $(".item-order-details-status").text("Bị từ chối")
                $(".btn-close").click();
                box_refuse_order.remove();
                $("#modal-cancel-order").remove()
                $(".btn-update-order-status").remove();
            });
        })
    })
    return box_refuse_order;
}
