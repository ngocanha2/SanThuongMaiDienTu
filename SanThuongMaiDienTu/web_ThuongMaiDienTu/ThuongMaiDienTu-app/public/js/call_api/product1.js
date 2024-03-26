

var ShowProducts = (id_show_name,page,numpages,chk_pagination, prefix = PREFIX_PRODUCT_ALL)=>{
    page = Number.isInteger(page) ? (page < 1 ? 1:page) : 1;
    $.ajax({
        url: BASE_URL_API+PREFIX_PRODUCT+prefix,
        type: 'GET',   
        data:{
            'numpages':numpages,
            'page':page,
        },     
        success: function (res) {   
            console.log(res); 
            if(res.success)  
            {
                if(res.data.data!=null)
                    data = res.data.data;
                else
                    data = res.data;
                let s = "";
                data.forEach(item=>{
                    s+=BuildIteamProduct(item)                                        
                })                                
                id_show_name ?  $("#"+id_show_name).html(s) : $("#product-all" ).html(s);                                  
                return chk_pagination ? loadNutPhanTrang(page!=res.page?res.page:page,res.numpages) : null;
            }   
            else            
                handleCreateToast("error","Đã xãy ra lỗi khi load trang",null,true);            
        },
        error: function (xhr, status, error) {
            console.log(xhr)
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại",null,true);            
        }
    });
}
    
            
var ShowProductSales = ()=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_PRODUCT+PREFIX_PRODUCT_SALE,
        type: 'GET',        
        success: function (res) {                      
            let s = "";
            res.forEach(item=>{                
                let range = FindPriceRange(item);                
                // let strRange = GetPriceMinMax(range.min,range.max);
                let san_pham_id = JsonParseStr(item._id)
                let cua_hang_id = JsonParseStr(item.cua_hang_id)
                s+=`<div class="col-6 col-lg-3 col-sm-6 col-md-4 col-xl-3 card-product">
                    <a title="${item.ten_san_pham}" href="/${PREFIX_PRODUCT}${item._id}">
                        <div class="item-flash-sale">
                            <div class="img-item-flash-sale" style="background: url(${URL_HOST}uploads/${cua_hang_id}/${san_pham_id}/${item.anh_bia}); background-size:cover;">
                                <div class="percent-sale-off">${item.giam_gia*100}%</div>
                                <div class="check-real">
                                    <i class="fa fa-check"> Kiểm tra</i>
                                </div>
                            </div>
                            <span>${ item.ten_cua_hang ? item.ten_cua_hang.length <= 40 ? item.ten_cua_hang : item.ten_cua_hang.substring(0, 41)+"...":"SHOPBEE"}</span>
                            <div class="name-item-flash-sale">
                                <h6>${item.ten_san_pham.length <= 40 ? item.ten_san_pham : item.ten_san_pham.substring(0, 41)+"..."}</h6>
                            </div>
                            <div class="old-price-item-flash-sale">
                                <h6>${GetPriceMinMaxWithDiscount(range)}<span style="text-decoration: underline">đ</span></h6>
                            </div>
                            <div class="price-item-flash-sale " style=" font-size: 16px;">
                                ${GetPriceMinMaxWithDiscount(range,item.giam_gia)}<span style="text-decoration: underline; color:red">đ</span>
                            </div>
                            <div class="quantity-sale-off" style="background: linear-gradient(
                                to right, 
                                rgb(251, 15, 15) 0%, 
                                rgb(251, 15, 15) ${item.so_luong_da_mua_khi_khuyen_mai ? item.so_luong_da_mua_khi_khuyen_mai/item.so_luong_gioi_han*100 : 100}%, 
                                rgb(255, 181, 181) ${item.so_luong_da_mua_khi_khuyen_mai ? 100-(item.so_luong_da_mua_khi_khuyen_mai/item.so_luong_gioi_han*100) : 0}%,
                                rgb(255, 181, 181) 100%
                            );">
                                <i class="fa fa-fire">&emsp;Còn lại ${item.so_luong_da_mua_khi_khuyen_mai ? item.so_luong_gioi_han-item.so_luong_da_mua_khi_khuyen_mai : item.so_luong_gioi_han}
                                </i>
                            </div>
                        </div>
                    </a>
                    </div>`                
            })                
            $('#container-product').html(s);
            let xemqua=`rgb(251, 15, 15) {{ intval($value->quantityLimit*100/$value->quantityStorage) }}%, 
            rgb(255, 181, 181) {{ 100-intval($value->quantityLimit*100/$value->quantityStorage) }}%,`;        
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại",null,true);
            ShowProductSales()          
        }
    });
}


var BuildIteamProduct = (item)=>{
    let range = FindPriceRange(item);
    let path_image = URL_HOST +"uploads/"+JsonParseStr(item.cua_hang_id)+"/"+JsonParseStr(item._id)+"/"+item.anh_bia;
    let s =`<div class="col-12 col-lg-3 col-sm-6 col-md-4 col-xl-3 col-xxl-2 card-product">
                        <a href="/${PREFIX_PRODUCT}${JsonParseStr(item._id)}"><div class="item-flash-sale item-product-all">
                            <div class="img-item-flash-sale" style="background-image: url(${path_image})">
                                <div class="percent-sale-off" style="font-size: 11px; padding-top:3px"><i class="fa fa-fire"></i>Hot</div>
                                <div class="check-real">
                                    <i class="fa fa-check">Kiểm tra</i>
                                </div>
                            </div>
                            <span style="font-weight: 500">SHOPBEE</span>
                            <div class="name-item-flash-sale">
                                <h6>${item.ten_san_pham.length <= 40 ? item.ten_san_pham : item.ten_san_pham.substring(0, 41)+"..."}</h6>
                            </div>
                            <div class="old-price-item-flash-sale so-sao-danh-gia">`
                                if(item.so_luong_danh_gia==0)
                                    s+=`<span style="font-weight: normal">Chưa đánh giá</span>`
                                else
                                {
                                    let starCount = Math.floor(item.danh_gia);
                                    for(i=0; i<starCount;i++)
                                        s+=`<i class="fa fa-star" ></i>`
                                    if(item.danh_gia > starCount)
                                        s+=`<i class="fa fa-star-half" ></i>`
                                }
                                s+=`<span style="font-weight: normal"> ${item.danh_gia.toString().substring(0,3)}</span>                            
                            </div>
                            <div class="div-tai-tro">Tài trợ</div>
                            <div class="price-item-flash-sale price-roduct-all">`                                                        
                                if(item.giam_gia>0)
                                    s+=`${GetPriceMinMax(range.min-(range.min*item.giam_gia),range.max-(range.max*item.giam_gia))}`
                                else
                                    s+=`${GetPriceMinMax(range.min,range.max)}`
                            s+=`đ</div>
                            <div class="item-product-footer">
                                <div class="bottom-item-product-left">Đã bán 0</div>
                                <div class="bottom-item-product-right">Việt Nam</div>
                            </div>
                        </div>
                        </a> </div>`;
    return s;
}
var Details = (ma_san_pham)=>{
    GET(BASE_URL_API+PREFIX_PRODUCT+ma_san_pham,(data)=>{
        console.log(data);
        BuildProductDetails(data,"#product-detail-body");        
    });
}
var BuildProductDetails = (dataAll,id)=>{
    let data = dataAll.sanpham;
    let cua_hang = dataAll.cuahang;
    let chk_sale = false;
    let path = URL_HOST+"/uploads/"+JsonParseStr(cua_hang._id)+"/"+ JsonParseStr(data._id)+"/"
    let s=`<section class="new_arrivals_area section-padding-30 clearfix">    
        <div style="background-color:rgb(236, 241, 241);">
            <div class="box-container-detail-product">
                <div class="title-flash-sale" style="height: 20px;">
                    <p><a href="/">Trang chủ</a > > <a href="/tat-ca-san-pham?page=1">Sản phẩm</a> > <a title = "${data.ten_san_pham}">
                        ${data.ten_san_pham.length <= 50 ? data.ten_san_pham : data.ten_san_pham.substring(0, 51)+"..."}
                        </a>
                    </p>
                </div>
                <div class="box-container">
                <div class="row">
                    <div class="col-lg-5 col-12">
                        <div class="box-detail-product-left">
                            <div id="main-image-product" class="main-img-product" style="background: url(${path}${data.anh_bia}); background-size:cover;">
                            </div>
                            <div class="box-detail-img-product">                                
                            </div>                        
                            <div class="box-share-to-social">
                                <span>Chia sẽ:&ensp;</span>
                                <img src=${URL_HOST+'system/logoFB.svg'}>
                                <img src=${URL_HOST+'system/logoMessenger.svg'}>
                                <img src=${URL_HOST+'system/logoP.svg'}>
                                <img src=${URL_HOST+'system/logoSwitter.svg'}>
                                <img src=${URL_HOST+'system/logoLink.svg'}>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7 col-12">
                        <div class="box-detail-product-right">
                            <div class="header-detail-product">
                                <h6>Xuất xứ: <span>Việt Nam</span></h6>
                                <h3>${data.ten_san_pham}</h3>
                                <div class="old-price-item-flash-sale so-sao-danh-gia">`
                                let starCount = Math.floor(data.danh_gia);
                                for(i=0; i<starCount;i++)
                                    s+=`<i class="fa fa-star" ></i>`
                                if(data.danh_gia > starCount)
                                    s+=`<i class="fa fa-star-half" ></i>`
                                    s+=`<span style="color:rgb(76, 76, 76)">(
                                        ${data.danh_gia}
                                    <i class="fa fa-star" style="color: orange"></i>&nbsp;|&nbsp;
                                    ${data.so_luong_danh_gia}
                                    đánh giá)<span>
                                </div>
                            </div>                            
                            <div class="footer-detail-product-left">`    
                            let range = FindPriceRange(_.cloneDeep(data));  
                            //var giaTienBanDau = giaTienDaDinhDang.replace(/[^\d,.-]/g, '');                   
                                if(CheckSale(data))
                                {           
                                    chk_sale = true;                                                                                                                     
                                    s+=`<br><h5><i class="fa fa-fire" style="color: rgb(252, 81, 81); font-weight: bold"> ${data.giam_gia*100}%</i>
                                    &emsp;<span style="text-decoration: line-through; font-weight: normal; color: rgb(104, 104, 104)">
                                        <span class="item-price-value" id="item-price-old">
                                            ${GetPriceMinMax(range.min,range.max)}
                                        </span>
                                        đ</span></h5>
                                    <h3 id="item-price">${GetPriceMinMaxWithDiscount(range, data.giam_gia)}<span style="text-decoration: underline">đ</span></h3><span class="limit-title">(Số lượng giới hạn:${data.so_luong_gioi_han})</span>
                                    <input type="hidden" name="giam_gia" value="${data.giam_gia}">
                                    <input type="hidden" name="ngay_bat_dau" value="${ConvertDateAsNumber(data.ngay_bat_dau)}">
                                    <input type="hidden" name="ngay_ket_thuc" value="${ConvertDateAsNumber(data.ngay_ket_thuc)}">
                                    <input type="hidden" name="so_luong_gioi_han" value="${data.so_luong_gioi_han}">`                                     
                                }                               
                                else
                                    s+=`<br><h3 ><span id="item-price" class="item-price-value" >${GetPriceMinMax(range.min,range.max)} <span style="text-decoration: underline">đ</span></span></h3>`                                                                                                                                                                                                                                                                 
                                s +=`<br><br>
                                        <div class="row" id="data-classify"></div>
                                        <div class="row" id="data-size" style="display: none"></div>
                                        <input type="hidden" name="san_pham_id" value="${data._id}">
                                        <input type="hidden" name="cua_hang_id" value="${cua_hang._id}">
                                        <input type="hidden" name="ten_cua_hang" value="${cua_hang.ten_cua_hang}">
                                        <input type="hidden" name="anh_dai_dien" value="${cua_hang.anh_dai_dien}">
                                        <input type="hidden" name="ten_san_pham" value="${data.ten_san_pham}">
                                    


                                        </div>   
                                            <div class="item-control-quantity row">
                                                <h6>Số lượng:</h6>
                                                <div class="box-edit-quantity">
                                                    <a class="btn btn-outline-warning add " >+</a>
                                                    <input type="text" name="so_luong_mua" class="show-quantity border-warning" value="1" />
                                                    <a class="btn btn-outline-warning minus" >-</a>                                        
                                                    <a style="padding-left:10px;"><span id="item-present-quantity" class="item-present-quantity">${data.so_luong_ton??GetQuantity(data.phan_loais)}</span> sản phẩm có sẳn</a>
                                                </div>
                                            </div>                                                         
                                            <div class="group-button row" id="btn-confirm">
                                                <div class="col-md-6 col-12">
                                                    <center><button name="btn_operation" value="buy" type="submit" class="btn-quickly">Mua Ngay</button></center>
                                                </div>                     
                                                <div class="col-md-6 col-12">
                                                    <center><button name="btn_operation" value="add" type="submit" class="add-to-cart">Thêm vào giỏ</button></center>
                                                </div>                                                                                                                                                             
                                            </div>
                                            <div class=" row group-button" id="btn-out-of-stock">
                                                <div class="col-12">
                                                    <center><a class="btn out-of-stock w-100">Hết hàng</a></center>
                                                </div>   
                                            </div> 
                                        <div class="footer-detail-product-right">                            
                                    
                                    <div class="header">
                                        <div class="logo-shop-seller"  style="background: url({{asset('laravel/shopbee/public/shop_of_seller/'.$value->imageShop)}}); background-size:cover;"></div>
                                        <div class="name-shop-seller">
                                            <h6>${cua_hang.ten_cua_hang}</h6>
                                            <div class="item-official"><i class="fa fa-check"></i> OFFICIAL</div>
                                        </div>
                                    </div>

                                    <div class="header info-shop-seller">
                                        <div class="box-ti-le-phan-hoi">
                                            <h5>100%</h5>
                                            <h6>Tỉ lệ phản hồi chat</h6>
                                        </div>
                                        <div class="box-so-nguoi-theo-doi">
                                            <h5>99</h5>                             
                                            <h6>Người theo dõi</h6>
                                        </div>
                                    </div>

                                    <div class="box-chuong-trinh-shop-seller" style="background: url(${URL_HOST+'system/box-seller.png'});background-size: cover;">
                                        
                                    </div>
                                    <div style="clear: both;"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                </div>
            </div>
            
            <div class="box-container-detail-product">                
                <div class="box-container" id="details-product-footer">
                    
                </div>
            </div>
        </div>
    </section>`;    
    $(id).html(s);

    let main_image_product = $("#main-image-product");
    //let item_detail_img_products = $(".item-detail-img-product")   
    let box_detail_img_product = $(".box-detail-img-product") 
    if(data.video)
    {
        let video = $(`<div class="item-detail-video-product item-detail-img-product">
                            <video class="video" id="video-show" controls autoplay>
                                <source id="video-show-source" src="${path}${data.video}" type="video/mp4" autoplay>
                            </video>
                        </div>`)
        video.click(function(){
            main_image_product.html(`<video class="video" id="video-show" controls autoplay>
                                        <source id="video-show-source" src="${path}${data.video}" type="video/mp4" autoplay>
                                    </video>`)
            main_image_product.css("background","#fff"); 
            $(".item-detail-img-product.active").removeClass("active")
            $(this).addClass("active")                   
        })        
        box_detail_img_product.html(video);
    }
    if(data.anh_san_phams)
    {                                            
        for(var image of data.anh_san_phams)                                                                                                                             
        {
            let item_image = $(`<div class="item-detail-img-product ${image == data.anh_faa ? "active":""}" style="background: url(${path}${image}); background-size:cover;"></div>`);
            item_image.data("image-name",image)
            item_image.attr("id",image.replace(".","-"))
            item_image.click(function(){  
                main_image_product.html("")              
                main_image_product.css("background",`url(${path+$(this).data("image-name")})`);
                main_image_product.css("background-size",`cover`);                
                $(".item-detail-img-product.active").removeClass("active")
                $(this).addClass("active")
            })
            box_detail_img_product.append(item_image)
        }
        // item_detail_img_products.each(function(){
        //     $(this).click(function(){
        //         main_image_product.css("background",`url(${path+$(this).attr("id")})`);
        //         $(".item-detail-img-product.active").removeClass("active")
        //         $(this).addClass("active")
        //     })        
        // })
    }
    (async () => {
        try {
          const result = await WriteDetailProductFooter(dataAll);
        } catch (error) {
            handleCreateToast("error","Đã xãy ra lỗi khi load footer",null,true);
        }
      })();        
    let box = document.querySelector(".box-edit-quantity");
    ValidateQuantity(box)    
    if(data.phan_loais)
    {                    
        DisabledBoxEditQuatity(box);                
        s = `<div class="col-12">
                <b style="float: left; margin-bottom: 5px;">${data.doi_ten_phan_loai??"Phân loại"}</b><br />
                <center>
                    <div style="position: relative; margin-top:-20px;">
                        <span class="error-classify error" hidden> Vui lòng chọn ${data.doi_ten_phan_loai??"Phân loại"} sản phẩm</span>
                    </div>
                </center>
            </div>
            <div style="align-content:center; align-items:center; text-align:center;" id="data-classify-items" role="group" aria-label="Basic radio toggle button group">
            </div>`;
        $("#data-classify").append(s);
        let i = 1;
            data.phan_loais.forEach(phan_loai=>{ 
                s=`<input type="radio" value="${phan_loai.ten_phan_loai}" class="btn-check" name="ten_phan_loai" id="phan-loai-${i}" autocomplete="off">
                    <label class="btn" title="${phan_loai.ten_phan_loai}" for="phan-loai-${i}">${Subtring(phan_loai.ten_phan_loai,51)}</label>`
                $("#data-classify-items").append(s);
                $(`#phan-loai-${i++}`).on("click",()=>{                    
                    GetConfirmData(phan_loai,chk_sale,data,`phan-loai-${i}`,data.doi_ten_kich_co);
                })
            })
    }    
    else
    {
        DisabledBoxEditQuatity(box,false); 
    }
    $("#form-buy-product button[type='submit']").on("click", function() {
        btn_operation_value = $(this).val();
    });     
    $('#form-buy-product').on('submit',(ev)=>{       
        ev.preventDefault();
        if ($("#item-present-quantity").text() == 0)    
            return;
        let formData = $('#form-buy-product').serialize();           
        if($("#data-classify").text()!=""&&formData.indexOf("ten_phan_loai")<0)
        {
            handleCreateToast("warning","Vui lòng chọn "+data.doi_ten_phan_loai??"Phân loại"+"!!!","info1",true)            
            return;
        }
        if($("#data-size").text()!=""&&formData.indexOf("ten_kich_co")<0)
        {
            handleCreateToast("warning","Vui lòng chọn "+data.doi_ten_kich_co??"kích cở"+"!!!","info2",true)            
            return;
        }   
        if($(".show-quantity").val()=="")
            return handleCreateToast("warning","Số lượng không được để trống!!!","info3",true)        
       if(btn_operation_value == "add")       
        {
            formData+=`&gia_hien_tai=${parseInt($(".item-price-value").text().replace('.', ''))}&danh_muc_id=${JsonParseStr(data.danh_muc_id)}`;                    
            if($(".show-quantity").val() > data.so_luong_gioi_han)            
                showMessage("Thông báo",`Chỉ có ${data.so_luong_gioi_han} sản phẩm khuyến mãi, phần số lượng vượt ngưỡng này sẽ tính theo giá gốc, bạn vẫn muốn tiếp tục?`,()=>{
                    AddProductToCart(formData);      
            })
            else
                AddProductToCart(formData);
        }
    })
}
var GetConfirmData = (phan_loai,chk_sale,data,phan_loai_id,doi_ten_kich_co=null)=>{  
    if(chk_sale)
    {
        $("#item-price-old").html(GetPriceMinMaxWithDiscount(GetClassifyPriceRange(phan_loai,data.gia_hien_tai)));
    }    
    $("#item-price").html(`${GetPriceMinMaxWithDiscount(GetClassifyPriceRange(phan_loai,data.gia_hien_tai),data.giam_gia)}<span style="text-decoration: underline">đ</span>`)
    $("#item-present-quantity").text(phan_loai.so_luong_ton??GetQuantity(phan_loai.kich_co_phan_loais));
    if(phan_loai.anh_phan_loai != null)
    {        
        
        $(`#${phan_loai.anh_phan_loai.replace(".","-")}`).click();
    }
    let s = "";        
    if(phan_loai.kich_co_phan_loais)
    {                
        DisabledBoxEditQuatity(document.querySelector(".box-edit-quantity"));
        let ten_kich_co = phan_loai.doi_ten_kich_co ?? ( doi_ten_kich_co ?? "Kích cở");        
        s+=`<div class="col-12" id="box-select-data-size">
                        <b style="float: left; margin-bottom: 5px;">${ten_kich_co}</b><br />
                        <center>
                            <div style="position: relative; margin-top:-20px;">
                                <span class="error-size error" hidden> Vui lòng chọn ${phan_loai.doi_ten_kich_co??"kích cở"} sản phẩm</span>
                            </div>
                        </center>
                    </div>
                <div id="data-size-items" style="align-content:center; align-items:center; text-align:center;" role="group" aria-label="Basic radio toggle button group">
            </div>`;
        $("#data-size").html(s);
                let i = 1;
                phan_loai.kich_co_phan_loais.forEach(kich_co=>{ 
                    s=`<input type="radio" value="${kich_co.ten_kich_co}"  class="btn-check" name="ten_kich_co" id="${phan_loai_id}-kich-co-${i}" autocomplete="off">
                        <label class="btn" title="${kich_co.ten_kich_co}" for="${phan_loai_id}-kich-co-${i}">${Subtring(kich_co.ten_kich_co,51)}</label>`                                
                    $("#data-size-items").append(s);  
                    $(`#${phan_loai_id}-kich-co-${i++}`).on("click",()=>{                    
                        GetConfirmDataSize(kich_co,chk_sale,data,phan_loai);
                    })                                                              
                })  
                $("#data-size").slideDown();    
    }
    else
    {
        $("#data-size").slideUp();
        $("#data-size").html("");        
        DisabledBoxEditQuatity(document.querySelector(".box-edit-quantity"),false);
    }
}
var GetConfirmDataSize = (kich_co,chk_sale,data,phan_loai)=>{        
    let price = GetClassifyPriceRangeSize(kich_co,phan_loai,data.gia_hien_tai);    
    if(chk_sale)
    {
        $("#item-price-old").html(price.toLocaleString('de-DE'));
    }        
    $("#item-price").html(`${(parseInt(price-(price*data.giam_gia))).toLocaleString('de-DE')}<span style="text-decoration: underline">đ</span>`)
    $("#item-present-quantity").text(kich_co.so_luong_ton??0);
    DisabledBoxEditQuatity(document.querySelector(".box-edit-quantity"),false);
}
var GetQuantity = (phan_loais)=>{
    let quantity = 0;
    phan_loais.forEach(item=>{
        quantity+=item.so_luong_ton??GetQuantity(item.kich_co_phan_loais);
    })
    return quantity;    
}
var GetClassifyPriceRange = (phan_loai,gia_hien_tai = null)=>{
    max = phan_loai.gia_hien_tai ?? -1;     
    min = null;
    if(phan_loai.kich_co_phan_loais)
    {
        phan_loai.kich_co_phan_loais.forEach(kich_co=>{
            max = kich_co.gia_hien_tai ? (kich_co.gia_hien_tai > max ? kich_co.gia_hien_tai: max):max;
            min = kich_co.gia_hien_tai ? (min ? (kich_co.gia_hien_tai < min ? kich_co.gia_hien_tai : min) :kich_co.gia_hien_tai):min;
        })
    }    
    if(max == -1)
        max = gia_hien_tai??0;
    return {
        "max":max,
        "min":min,
    };
}
var GetClassifyPriceRangeSize = (kich_co,phan_loai,gia_hien_tai = null)=>{

    return (kich_co.gia_hien_tai ?? phan_loai.gia_hien_tai ?? gia_hien_tai ?? 0);
}
var DisabledBoxEditQuatity = (box, chk=true)=>{   
    let show_quantity = box.querySelector(".show-quantity")           
    show_quantity.value = 1; 
    let max_quantity = parseInt(box.querySelector(".item-present-quantity").innerText);
    if(chk || max_quantity==0)
    {        
        box.querySelector(".minus").classList.add("disabled") 
        box.querySelector(".add").classList.add("disabled") 
        show_quantity.disabled = true; 
        if(max_quantity == 0)
        {
            show_quantity.value = 0;
            $("#btn-out-of-stock").slideDown();
            $("#btn-confirm").slideUp();
            return;
        }        
    }
    else
    {        
        box.querySelector(".minus").classList.remove("disabled") 
        box.querySelector(".add").classList.remove("disabled")
        show_quantity.disabled = false; 
    }
    $("#btn-out-of-stock").slideUp()
    $("#btn-confirm").slideDown();

}
var ValidateQuantity = (box)=>{        
    let show_quantity = box.querySelector(".show-quantity");
    box.querySelector(".add").addEventListener("click",()=>{
        let max_quantity = parseInt(box.querySelector(".item-present-quantity").innerText);        
        let value = parseInt(show_quantity.value)
        show_quantity.value = value + 1 > max_quantity ? max_quantity : value + 1;
        if(value + 1 > max_quantity)
        {
            return handleCreateToast("info","Đã đạt số lượng tồn tối đa","info-toida",true);
        }
        show_quantity.value = value + 1;
    })
    box.querySelector(".minus").addEventListener("click",()=>{        
        let value = parseInt(show_quantity.value)
        show_quantity.value = value - 1 > 0 ? value - 1 : 1;
    })
    show_quantity.addEventListener("input",()=>{             
        if (show_quantity.value != "") {
            let max_quantity = parseInt(box.querySelector(".item-present-quantity").innerText);
            var value = show_quantity.value;
            var x = value.substr(0, value.length - 1);
            show_quantity.value = isNaN(value) ? x : value == 0 ? 1 : show_quantity.value > max_quantity ? max_quantity : value;
        }
    })
    
}
async function WriteDetailProductFooter(dataAll) {
    try {
        let san_pham = dataAll.sanpham; 
        console.log(BASE_URL_API+PREFIX_PRODUCT+JsonParseStr(san_pham._id)+"/"+PREFIX_EVALUATE)
        // console.log(san_pham.thong_tin_chi_tiet)               
        GET(BASE_URL_API+PREFIX_PRODUCT+JsonParseStr(san_pham._id)+"/"+PREFIX_EVALUATE,(data)=>{
            let s=`<div class="row">
                    <div class="col-lg-6 col-12">
                        <div style="background-color: white; padding:20px; min-height:500px; position: relative;">
                            
                                <b><i class="fa fa-bookmark-star"></i> Đánh giá sản phẩm</b>
                                <hr style="margin-bottom: 10px; margin-top: 5px;">
                                <div class="row">
                                    <div class="col-6" style="height:125px; text-align:center; align-items:center; justify-items:center; border-right:1px solid #aaaaaa">
                                        <a id="danhgia"><b>${san_pham.danh_gia}</b>/5</a><br />
                                        <i class="fa fa-star text-warning"></i>
                                        <i class="fa fa-star text-warning"></i>
                                        <i class="fa fa-star text-warning"></i>
                                        <i class="fa fa-star text-warning"></i>
                                        <i class="fa fa-star text-warning"></i><br />
                                        <span style="color:#888888;">${san_pham.so_luong_danh_gia} đánh giá</span>
                                    </div>`         
                                    s+=`<div class="col-6" style=" height: 125px; padding-left: 80px; color: gold">`
                                    let btn_star_str = "";
                                    for (let i = 0; i < 5; i++) {
                                        s+=`<div>`
                                        for (let j = 0; j < 5; j++) {
                                            s+=`<i class="fa fa-star ${j>=5-i?"star-black":"text-warning"}"></i>`
                                        }
                                        s+=`<span class="star-quantity"> 1 </span>
                                            </div>`;
                                        btn_star_str +=`<input type="radio" class="btn-check loc_danhgia" name="options" id="option${i+1}" autocomplete="off">
                                                        <label class="btn btn-outline-warning" for="option${i+1}">${i+1}<i class="sao fa fa-star "></i></label>`
                                    }
                                    s+=`</div>
                                </div>
                                
                                <hr style="margin-bottom: 10px; margin-top: 5px;">
                                <div style="position: sticky; top: 70px; z-index: 9; padding-top:25px; background-color: white; width: 100%; " >
                                    <input type="radio" checked class="btn-check loc_danhgia" name="options" id="tatca" autocomplete="off">
                                    <label class="btn btn-outline-warning" for="tatca">Tất cả <i class="sao fa fa-star  "></i></label>
                                    `+btn_star_str+`                                                                
                                </div>
                                <hr />                            
                            <div>`
                            if(data.length==0)
                            s+=`<center>Chưa có đánh giá</center>`;
                            else
                            {
                                console.log(data)   
                                data.forEach(item=>{                                                                 
                                    s+=`<div class="row evaluate-all evaluate-${item.danh_gia.muc_do_hai_long}">
                                            <div class="col-1" style=" float:left;">`
                                            let name = "";
                                                if (item.danh_gia.an_danh)
                                                {
                                                    s+=`<img src="\Image\AVT_error.jpg" style="border:1px solid #888888; position:relative; height:45px; width:45px; border-radius:50%; margin-right:10px;" />`
                                                    name = `<b>${item.ten_dang_nhap.substr(0, 3)}************</b>`
                                                }
                                                else
                                                {
                                                    s+=`<img src="${item.anh_dai_dien}" onerror="this.src='\Image\AVT_error.jpg'" style="border:1px solid #888888; position:relative; height:45px; width:45px; border-radius:50%; margin-right:10px;" />`
                                                    name = `<b>${item.ten_dang_nhap}</b>`
                                                }
                                            s+=`</div>
                                            <div class="col-11">`
                                                for (var i = 0; i < item.danh_gia.muc_do_hai_long; i++)                                                
                                                    s+=`<i class="fa fa-star text-warning" ></i>`    
                                                for (var i = item.danh_gia.muc_do_hai_long ; i < 5 ; i++)                                                
                                                    s+=`<i class="fa fa-star" ></i>`                                            
                                                s+=`&nbsp ${GetContentRatingLevel(item.danh_gia.muc_do_hai_long)}<br />`+name+                                                
                                                `<br />
                                                <p style="color: #888888;position:relative; margin-bottom:10px; margin-top:-5px; font-size: 12px;">${ConvertDateTimeToString(item.danh_gia.ngay_danh_gia)}</p>
                                                <span>${item.danh_gia.noi_dung}</span><br />
                                            </div>
                                        </div>
                                        <hr />`                                        
                                });                                                                       
                            }                          
                                s+=`<hr />
                            </div>
                        </div>
                    </div>`
                 
                    s+=`<div class="col-lg-6 col-12" style="padding:20; position: relative;">
                        <div style="padding-top:20px; min-height: 500px; position:sticky; top:75px;">                                                               
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Thông Tin Chi Tiết</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Mô Tả Sản Phẩm</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div class="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tafandex="0">
                                    <table class="table table-hover table-striped table-bordered">`                                    
                                        for(const key in san_pham.thong_tin_chi_tiet) {
                                            if(san_pham.thong_tin_chi_tiet.hasOwnProperty(key))
                                            {
                                                s+=`<tr>
                                                    <td> <b>${key}</b></td>
                                                    <td>${san_pham.thong_tin_chi_tiet[key]}</td>
                                                </tr>`
                                            }                                            
                                        };                                                                                    
                                    s+=`</table>
                                </div>
                                <div style="white-space: pre-wrap; text-align:justify;" class="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tafandex="0">
                                    ${san_pham.mo_ta}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`;        
         
        $("#details-product-footer").html(s); 
    })              
      return true;
    } catch (error) {
      throw error;
    }
  }

var AddProductToCart = (formData)=>{      
    $(".add-to-cart").prop("disabled", true);   
    // $.ajaxSetup({
    //     headers:{
    //         'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
    //     }
    // })              
    $.ajax({        
        url: BASE_URL_API+PREFIX_CART+PREFIX_ADD_TO_CART,
        type: "POST",        
        data:formData,                            
        success: function (res) {  
            console.log(res)        
            switch (res.status) {
                case -1:
                    handleCreateToast("success",res.message,null,true);                    
                    chk_carts = false;                    
                    break;   
                case -2, -3:
                    handleCreateToast("warning",res.message,`warning-carts-${res.status}`,true);
                    break; 
                case -4:
                    handleCreateToast("error",res.message,'err');
                    break;                                   
                default:
                    handleCreateToast("info",res.message+" ("+res.status+")",'info-add-to-cart',true);                    
                    break;
            }                                                 
            $(".add-to-cart").prop("disabled", false);          
        },
        error: function (xhr, status, error) {            
            handleCreateToast("error","Đã xảy ra lỗi, vui lòng thử lại sau","err-add-to-cart",true);  
            $(".add-to-cart").prop("disabled", false);                               
        }
    });
}

