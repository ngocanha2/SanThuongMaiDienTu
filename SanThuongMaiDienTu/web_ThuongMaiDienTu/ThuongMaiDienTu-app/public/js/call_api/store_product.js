
var GetProductForStore = () => {
    $.ajax({
        url: BASE_URL_API+PREFIX_STORE+PREFIX_PRODUCT+PREFIX_PRODUCT_ALL,
        type: "GET",             
        success: function (res) {                         
            if(res.success)  
            {
                let box = $("#box-show-product-all");                
                let s = `<table class="table table-hover table-striped table-bordered" border="1" style="align-content:center;text-align:center;justify-content:center;align-items:center;">
                            <thead>
                                <tr>
                                    <th>
                                        Tên Sản Phẩm
                                    </th>                                        
                                    <th>
                                        Số Lượng
                                    </th>
                                    <th>
                                        Giá Gốc
                                    </th>
                                    <th>
                                        Doanh Số
                                    </th>
                                    <th>                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="item-show-product-body">                    
                            </tbody>                              
                        </table>`;
                    $(box).html(s); 
                    let item_show_product_body = box.find(".item-show-product-body");
                    res.data.forEach(item => {
                    let san_pham_id = JsonParseStr(item._id)
                    let cua_hang_id = JsonParseStr(item.cua_hang_id)
                    var row = $(`<tr class="tr-product">
                                    <td class="td-click">
                                        <a class="item-product-link" href="${URL_HOST+PREFIX_STORE+PREFIX_PRODUCT+san_pham_id}">
                                            <center><div  style="background: url(${URL_HOST}uploads/${cua_hang_id}/${san_pham_id}/${item.anh_bia}); background-size:cover; width: 80px; height: 100px;"></div></center>
                                            <center><strong title="${item.ten_san_pham}">${item.ten_san_pham}</strong></center>
                                        </a>
                                    </td>                                        
                                    <td class="td-quantity td-click">
                                        <div class="td-quantity-all">${GetOverallQuantityOfProduct(item)}</div>                                        
                                    </td>
                                    <td class="td-price td-click">
                                        
                                    </td>
                                    <td class="td-click">
                                        12
                                    </td>
                                    <td class="operation-td">
                                        <center class="operation-center">
                                            <div class="operation-option">
                                                <a href="/cua-hang/san-pham/${san_pham_id}" class="btn operation-btn btn-outline-warning">Xem</a><br>
                                                <a href="#" class="btn operation-btn  btn-outline-dark">Ẩn</a><br>
                                                <a href="#" class="btn operation-btn btn-outline-danger">Xóa</a>
                                            </div>                                                  
                                            <strong class="item-operation" title="Thao tác">...</strong>
                                        </center>                                              
                                    </td>
                                </tr> `);
                    if(item.phan_loais)
                    {                                                   
                        let td_quantity = row.find(".td-quantity");
                        let td_quantity_all = row.find(".td-quantity-all");
                        let dom_quantity_str = `<div class="td-quantity-details" >`;
                        let quantity_classify = 0;                        
                        item.phan_loais.forEach(phan_loai=>{  
                            let box_quantity_size="";                                                      
                            if(phan_loai.kich_co_phan_loais)
                            {                                
                                box_quantity_size=`<div class="td-box-quantity-size">`                                
                                phan_loai.kich_co_phan_loais.forEach(kich_co=>{                                    
                                    quantity_classify+=kich_co.so_luong_ton;
                                    box_quantity_size+=`<span class="td-item-size">-${kich_co.ten_kich_co}: 
                                                            <span class="td-item-quantity">${kich_co.so_luong_ton} | <span class="td-item-price">${(kich_co.gia_hien_tai??phan_loai.gia_hien_tai??item.gia_hien_tai).toLocaleString('de-DE')}đ</span></span>                                                             
                                                        </span><br>`
                                });
                                box_quantity_size+=`</div>`;                                
                            }
                            else 
                                quantity_classify = phan_loai.so_luong_ton;

                            dom_quantity_str+=`<div class="td-box-quantity-classify">
                                    <span class="td-item-classify">#${phan_loai.ten_phan_loai}: <span class="td-item-quantity">${quantity_classify}<span class="td-item-price">${(!phan_loai.kich_co_phan_loais ? (" | "+(phan_loai.gia_hien_tai??item.gia_hien_tai).toLocaleString('de-DE')+"đ") : "")}</span></span><br>
                                    ${box_quantity_size}
                                    </div><br>`
                        })
                        dom_quantity_str+=`</div>`;
                        let td_quantity_details= $(dom_quantity_str);
                        td_quantity.append(td_quantity_details);                        
                        row.find(".td-click").each(function(){
                            $(this).on("click",function(){
                                td_quantity_details.slideToggle();
                                td_quantity_all.slideToggle();
                            })
                        }) 
                        row.attr("title","chi tiết");
                    }
                    else   
                        row.addClass("not-details");
                    row.find(".td-price").append($(`<div class="td-price-range">${GetPriceMinMaxWithDiscount(FindPriceRange(item))}đ</div>`));                 
                    let item_operation = row.find(".item-operation");
                    let operation_option = row.find(".operation-option");
                    let operation_btns = row.find(".operation-btn");
                    item_operation.click(function(){                        
                        operation_option.slideToggle();                                             
                    })
                    operation_btns.each(function(){
                        $(this).click(function(){                            
                            operation_option.slideUp();
                        })
                    })                    
                    item_show_product_body.append(row);
                });                
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