
var LoadDataVoucherStoreWithStatus = (tab_panees,status)=>{
    getAllVoucher(null,function(data){              
        if(data.length==0)
        {
            return tab_panees.html(`<center>Không tìm thấy</center>`)
        }
        tab_panees.data("load",true) 
        let s = `<table class="table table-hover table-striped table-bordered" border="1" style="align-content:center;text-align:center;justify-content:center;align-items:center;">
                            <thead>
                                <tr>
                                    <th>
                                        Mã khuyến mãi
                                    </th>                                        
                                    <th>
                                        Tỷ lệ giảm giá
                                    </th>
                                    <th>
                                        Đơn hàng tối thiểu
                                    </th>
                                    <th>
                                        Số lượng
                                    </th>
                                    <th>
                                        Mức giảm tối đa
                                    </th>
                                    <th>
                                        Ngày bắt đầu
                                    </th>
                                    <th>
                                        Ngày kết thúc
                                    </th>
                                    <th>                                        
                                    </th>
                                </tr>
                            </thead>
                            <tbody class="box-show-voucher-body">                    
                            </tbody>                              
                        </table>`;
        tab_panees.html(s);
        var box_show_voucher_body = tab_panees.find(".box-show-voucher-body");
        s = '';
        data.forEach(item => {
            s=`<tr class="row-voucher">
                    <th>
                        ${item.ma_khuyen_mai}
                    </th>                                        
                    <th>
                        ${item.ty_le_giam_gia*100}%
                    </th>
                    <th>
                        ${item.don_hang_toi_thieu}
                    </th>
                    <th>
                        ${item.so_luong}
                    </th>
                    <th>
                        ${item.muc_giam_toi_da}
                    </th>
                    <th>
                        ${ConvertDateTimeToString(item.ngay_bat_dau)}
                    </th>
                    <th>
                        ${ConvertDateTimeToString(item.ngay_ket_thuc)}
                    </th>
                    <th>                    
                        <div class="box-voucher-operation" style="display:none">
                            <a href="/cua-hang/khuyen-mai/${item.ma_khuyen_mai}" class="btn btn-outline-warning btn-voucher-update">Sửa</a>         
                            <button class="btn btn-danger btn-voucher-delete">Xóa</button>
                        </div>  
                        <strong class="btn-show-box-voucher-operation">...</strong>                      
                    </th>
                </tr>`
            var rowElement = $(s);
            var box_voucher_operation = rowElement.find(".box-voucher-operation")
            var btn_show = rowElement.find(".btn-show-box-voucher-operation")
            var btn_voucher_delete = rowElement.find(".btn-voucher-delete")
            btn_voucher_delete.click(()=>{
                showMessage("Thông báo","Xác nhận xóa voucher này?",()=>{
                    deleteVoucherStore(item.ma_khuyen_mai,function(){
                        handleCreateToast("success","Xóa voucher thành công"); 
                        rowElement.remove() 
                        if($(".row-voucher").length==0)                        
                            tab_panees.html(`<center>Không tìm thấy</center>`)                        
                    })
                })
            })
            btn_show.click(function(){
                box_voucher_operation.slideToggle();
            })
            box_show_voucher_body.append(rowElement);  
        });
              
    },status);
}

const tab_itemms = $(".tab-itemm");
const tab_panees = $(".tab-panee");
for(let i = 0 ;i<tab_itemms.length;i++)
{
    $(tab_itemms[i]).click(()=>{             
        if($(tab_panees[i]).data("load")==undefined)
            LoadDataVoucherStoreWithStatus($(tab_panees[i]),i);        
    })    
}

LoadDataVoucherStoreWithStatus($(tab_panees[0]),0);
