var LoadBoxOrder = (element,status = 0)=>{
    GetOrdersWithStatus(status,function(data){        
        let s = "";        
        data.forEach(don_hang => { 
            console.log(don_hang)           
            let quantity = 0;
            let trang_thai = GetStatusOrder(don_hang.trang_thai);
            s +=`<div class="box-order">
                    <div class="item-order-header">
                        <div class="item-order-header-left">
                            <strong class="item-order-shop-name">
                                <img  src="${URL_HOST}/FE/img/core-img/icon-box.svg" alt="">
                                <span>${don_hang.ten_cua_hang}</span>
                            </strong>
                            <button class="btn-order-shop-chat">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-right-quote" viewBox="0 0 16 16">
                                    <path d="M2 1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h9.586a2 2 0 0 1 1.414.586l2 2V2a1 1 0 0 0-1-1H2zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
                                    <path d="M7.066 4.76A1.665 1.665 0 0 0 4 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112zm4 0A1.665 1.665 0 0 0 8 5.668a1.667 1.667 0 0 0 2.561 1.406c-.131.389-.375.804-.777 1.22a.417.417 0 1 0 .6.58c1.486-1.54 1.293-3.214.682-4.112z"/>
                                </svg>
                                Chat
                            </button>
                            <button class="btn-order-shop-access">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-shop-window" viewBox="0 0 16 16">
                                    <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0zM1.5 8.5A.5.5 0 0 1 2 9v6h12V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5zm2 .5a.5.5 0 0 1 .5.5V13h8V9.5a.5.5 0 0 1 1 0V13a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9.5a.5.5 0 0 1 .5-.5z"/>
                                </svg>
                                Xem shop
                            </button>
                        </div>   
                        <div class="item-order-header-right">
                            <strong class="item-order-shop-status">${trang_thai}</strong> | 
                            <a href="#">Đánh giá</a>                                    
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
                                    <div class="item-order-footer-right">`
                                    if(trang_thai == "Đã giao" || trang_thai == "Đã hủy")                            
                                        s+=`<button class="btn-order-repurchase">Mua lại</button>`                                                                        
                                        s+=`<a class="btn-order-detail" href="/trang-ca-nhan/don-hang/${JsonParseStr(don_hang._id)}">Xem chi tiết</a>
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
LoadBoxOrder($(tab_panees[0]))
for(let i = 0 ;i<tab_itemms.length;i++)
{
    $(tab_itemms[i]).click(()=>{        
        if($(tab_panees[i]).text()=="")
            LoadBoxOrder($(tab_panees[i]),i);        
    })    
}



