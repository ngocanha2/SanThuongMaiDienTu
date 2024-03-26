



const box_address = $(".box-address");

GetAddressAll(function(data){
    if(data.length==0)
    {
        box_address.html("<center><h2>Bạn chưa tạo địa chỉ nào</h2></center>")
        return
    }
    data.forEach(item => {        
        box_address.append(BuildItemAddress(item));
    });
})



var BuildItemAddress = (item)=>{
    const item_address = $(`<div class="item-address" id="id${JsonParseStr(item.id)}">                                    
                                    <div class="row">
                                        <div class="col-lg-7 col-xxl-8">
                                            <span><span class="item-address-recipient-name">${item.ten_nguoi_nhan}</span> | <span class="item-address-type" >${item.loai_dia_chi}</span></span><br>
                                            <span class="item-address-phone-number">${item.so_dien_thoai}</span><br>
                                            <span class="item-address-info">${item.dia_chi}</span><br>
                                            <span>(<span class="item-address-detail">${item.dia_chi_cu_the}</span>)</span><br>
                                            <span><span class="item-address-note">${item.ghi_chu ?? "---"}</span></span>
                                        </div>                        
                                        <div class="col-lg-5 col-xxl-4 item-address-btn">                            
                                            <div class="item-address-btn-update">
                                                <button class="btn btn-outline-danger btn-delete">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                                    </svg>
                                                    <span>Xóa</span>
                                                </button>
                                                <button class="btn btn-outline-warning btn-update" data-bs-toggle="modal" data-bs-target="#box-update-address">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                                                    </svg>
                                                    <span>Sửa</span>    
                                                </button>
                                            </div>                                                    
                                        </div>       

                                    </div>                                    
                                </div>  `);
    if(item.mac_dinh)
        item_address.append(createBoxAddressDefault(item.id));             
    else                    
        item_address.append(createBoxUpdateAddressDefault(item.id,item_address));        
    const btn_delete = item_address.find(".btn-delete");
    const btn_update = item_address.find(".btn-update");
    btn_delete.click(function(){
        showMessage("Thông báo","Xác nhận xóa địa chỉ này",function(){
            DeleteAddress(JsonParseStr(item.id),function(id){                    
                if(id)
                {
                    id = JsonParseStr(id);                        
                    $("#id"+id).append(createBoxAddressDefault(id));
                    $("#id"+id).find(".box-btn-set-default").remove();
                }                                        
                item_address.remove();
            })
        })
    })
    btn_update.click(function(){
        loadDataAddressUpdate(item);          
    })
    return item_address;
}

var refreshItemAddressDefaultOld = ()=>{
    const item_address_default = $(".item-address-default");
    const item_address_now = item_address_default.parent();            
    item_address_now.append(createBoxUpdateAddressDefault(item_address_default.data("dia_chi_id"),item_address_now));                                                
    item_address_default.remove();
}
var createBoxUpdateAddressDefault = (id,item_address)=>{
    const box_btn_set_default = $(`<button class="box-btn-set-default">
                                            <strong class="">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check2-square" viewBox="0 0 16 16">
                                                    <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z"/>
                                                    <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z"/>
                                                </svg>
                                                <span>Đặt làm mặc định</span>    
                                            </strong>
                                        </button>`);
    box_btn_set_default.click(function(){                
        SetAddressDefault(JsonParseStr(id),function(){  
            handleCreateToast("success","Cập nhật địa chỉ mặc định thành công");
            refreshItemAddressDefaultOld();

            item_address.append(createBoxAddressDefault(id));
            box_btn_set_default.remove(); 
        })
    });
    return box_btn_set_default;
}
var createBoxAddressDefault = (id)=>{
    const item_address_default = $(`<div class="item-address-default">Mặc định</div>`)
    item_address_default.data("dia_chi_id",JsonParseStr(id));
    return item_address_default;
}




btn_insert_address.click(function(){
    resetFormAddress()
})

// var closeModal = ()=>{
//     $("#box-update-address").removeClass("show")
//     $("#box-update-address").slideUp();
//     $(".modal-backdrop").remove();    
//     $(".modal-open").removeClass("modal-open")
// }

createEventFormUpdateAddress();
