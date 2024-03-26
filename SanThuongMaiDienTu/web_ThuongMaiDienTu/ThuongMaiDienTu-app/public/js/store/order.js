

var LoadDataStoreOrderWithStatus = (element,status = 0)=>{
    GetDataStoreOrderWithStatus(status,function(data){
        let s = "";        
        data.forEach(don_hang => {            
            let quantity = 0;
            let trang_thai = GetStatusOrder(don_hang.trang_thai);
            let don_hang_id = JsonParseStr(don_hang._id).toUpperCase()
            s +=`<div class="box-order">
                    <div class="item-order-header">
                        <div class="item-order-header-left">
                            <strong class="item-order-shop-name">
                                <img  src="${URL_HOST}/FE/img/core-img/icon-box.svg" alt="">
                                <span>${don_hang_id}</span>
                            </strong>                            
                        </div>   
                        <div class="item-order-header-right">
                            <strong class="item-order-shop-status">${trang_thai}</strong>                                                             
                        </div>  
                    <div style="clear: both"></div>                           
                    </div>
                    <div class="item-order-content">`                    
                    don_hang.chi_tiet_don_hangs.forEach(chi_tiet=>{
                            let san_pham_id = JsonParseStr(chi_tiet.san_pham.san_pham_id);
                            quantity+=chi_tiet.so_luong;                            
                            s+=`<div class="item-order-product">
                                    <div class="row">
                                        <div class="col-lg-2 col-xxl-1 col-md-3 col-sm-4 col-5">
                                            <div class="image-product" style="background: url(${URL_HOST}uploads/${don_hang.cua_hang_id}/${san_pham_id}/${chi_tiet.san_pham.anh_bia}); background-size: cover; ">                                                
                                            </div>
                                        </div>
                                        <div class="col-lg-10 col-xxl-11 col-md-9 col-sm-8 col-7">
                                            <strong class="item-product-name">${chi_tiet.san_pham.ten_san_pham}</strong><br>
                                            <span class="item-product-classify">`
                                            if(chi_tiet.san_pham.ten_phan_loai)
                                            {
                                                s+=chi_tiet.san_pham.ten_phan_loai
                                                if(chi_tiet.san_pham.ten_kich_co)
                                                    s+=` | ${chi_tiet.san_pham.ten_kich_co}`                                                        
                                            }                                         
                                            s+=`</span><br>
                                            <span class="item-product-quantity">${chi_tiet.don_gia.toLocaleString("de-DE")} x ${chi_tiet.so_luong}</span>
                                            <strong class="item-product-price">${(chi_tiet.so_luong*chi_tiet.don_gia).toLocaleString("de-DE")}đ</strong>
                                            ${chi_tiet.so_luong_phu ? 
                                                `<div style="position:relative">                                                 
                                                    <span class="item-product-quantity">${chi_tiet.don_gia_phu.toLocaleString("de-DE")} x ${chi_tiet.so_luong_phu}</span>
                                                    <strong class="item-product-price">${(chi_tiet.so_luong_phu*chi_tiet.don_gia_phu).toLocaleString("de-DE")}đ</strong>
                                                </div>`:""}
                                        </div>
                                    </div>
                                </div>`                          
                        });                                                           
                        s+=`</div>
                                <div class="item-order-footer">
                                    <hr>
                                    <div class="item-order-footer-left">
                                        <span class="item-product-total">Thành tiền<span> [x${quantity}]: ${don_hang.thanh_tien.toLocaleString("de-DE")}đ</span></span><br>
                                        <span class="item-order-footer-left-review">Không nhận được đánh giá</span>
                                    </div>
                                    <div class="item-order-footer-right">                                        
                                        <a class="btn-order-detail" href="/cua-hang/don-hang/${don_hang_id}">Xem chi tiết</a>
                                    </div>
                                    <div style="clear: both"></div>
                                </div>
                            </div>`;
        }); 
        if(s=="")
            s="<div><center>Không tìm thấy đơn hàng</center></div>"
        element.html(s)    
    });
}

const tab_itemms = $(".tab-itemm");
const tab_panees = $(".tab-panee");
LoadDataStoreOrderWithStatus($(tab_panees[0]))
for(let i = 0 ;i<tab_itemms.length;i++)
{
    $(tab_itemms[i]).click(()=>{        
        if($(tab_panees[i]).text()=="")
        LoadDataStoreOrderWithStatus($(tab_panees[i]),i);        
    })    
}
