var ValidateQuantityCart = (items_product,checkboxCartProduct,data)=>{        
    let show_quantity = items_product.find(".cart-show-quantity");
    let btnUpdateCartQuantity = items_product.find(".btn-update-cart-quantity");   
    let infoUpdateCartQuantity = items_product.find(".item-message-update-quantity");
    let itemPresentQuantity = items_product.find(".item-present-quantity");        
    // let price = parseInt(checkboxCartProduct.val());    
    let price = items_product.data("price-real");
    let priceSale = items_product.data("price-sale");
    let saleQuantity = items_product.data("sale-quantity");

    const elementPriceReal = items_product.find(".price-real");
    const elementPriceSale = items_product.data(".price-sale");
    const elementPriceRealQuantity = items_product.find(".price-real-quantity");
    const elementPriceSaleQuantity = items_product.find(".price-sale-quantity");

    show_quantity.data("present-value",data.so_luong) 
    show_quantity.data("previous-value",data.so_luong) 
    show_quantity.data("current-price",priceSale)    
    show_quantity.val(data.so_luong);    
    btnUpdateCartQuantity.slideUp();
    items_product.find(".cart-add").on("click", () => {        
        let max_quantity = parseInt(itemPresentQuantity.text());
        let value = parseInt(show_quantity.val());
        value = isNaN(value) ? 0: value;
        if (value + 1 > max_quantity) {
            handleCreateToast("info", "Đã đạt số lượng tồn tối đa", "info",true);
            return;
        }        
        if(price!=priceSale && value > saleQuantity)
        {            
            elementPriceReal.text(price.toLocaleString("de-DE")+"đ")
            elementPriceRealQuantity.text(`(${value - saleQuantity})`)
            elementPriceSaleQuantity.text(`(${saleQuantity})`)
        }
        show_quantity.val(value + 1);
        if(checkboxCartProduct.is(':checked'))
            // refreshTotal((value + 1 > saleQuantity ? price : priceSale),1)
            refreshTotal()
        if(parseInt(show_quantity.data("present-value")) != value+1)
            btnUpdateCartQuantity.slideDown();
        else
        {
            infoUpdateCartQuantity.slideUp();
            btnUpdateCartQuantity.slideUp();                
        }
    });
    items_product.find(".cart-minus").on("click", () => {
        let value = parseInt(show_quantity.val());
        value = isNaN(value) ? 2: value;
        if (value - 1 > 0) {            
            show_quantity.val(value - 1);
            if(checkboxCartProduct.is(':checked'))
                // refreshTotal((value + 1 > saleQuantity ? price : priceSale),1,false)
                refreshTotal()
            if(parseInt(show_quantity.data("present-value")) != value-1)
                btnUpdateCartQuantity.slideDown();
            else
            {
                infoUpdateCartQuantity.slideUp();
                btnUpdateCartQuantity.slideUp();                
            }
            if(price!=priceSale && value <= saleQuantity)
            {            
                elementPriceReal.text("")
                elementPriceRealQuantity.text("")
                elementPriceSaleQuantity.text("")
            }
        }
    });
    show_quantity.on("input", () => {
        let previousValue = parseInt(show_quantity.data("previous-value"));        
        if (show_quantity.val() !== "") {
            let max_quantity = parseInt(itemPresentQuantity.text());
            let value = show_quantity.val();                                                
            //show_quantity.val(isNaN(value) ? x : value == 0 ? 1 : show_quantity.val() > max_quantity ? max_quantity : value);
            if(!isNaN(value))
            {
                let quantityNew = value == 0 ? 1 : value > max_quantity ? max_quantity : value
                show_quantity.val(quantityNew);
                show_quantity.data("previous-value",quantityNew);                
                if(checkboxCartProduct.is(':checked'))
                {
                    // refreshTotal(price,previousValue,false)
                    refreshTotal()
                    // refreshTotal(price,previousValue-quantityNew,false)
                }
                    
            }
            else
                show_quantity.val(previousValue == 0 ? 1 : previousValue);      
            if(parseInt(show_quantity.data("present-value")) != show_quantity.val())
                btnUpdateCartQuantity.slideDown();
            else
            {
                infoUpdateCartQuantity.slideUp();
                btnUpdateCartQuantity.slideUp();                      
            }
            if(price!=priceSale)
            {
                if( !isNaN(value) && value > saleQuantity)
                {            
                    elementPriceReal.text(price.toLocaleString("de-DE")+"đ")
                    elementPriceRealQuantity.text(`(${value - saleQuantity})`)
                    elementPriceSaleQuantity.text(`(${saleQuantity})`)
                }
                else{
                    elementPriceReal.text("")
                    elementPriceRealQuantity.text("")
                    elementPriceSaleQuantity.text("")
                }
            }
        }
        else
        {      
            infoUpdateCartQuantity.slideUp();      
            btnUpdateCartQuantity.slideUp();
            show_quantity.data("previous-value",0);
            if(checkboxCartProduct.is(':checked'))
                // refreshTotal(price,previousValue,false)
                refreshTotal()
        }
    });
    btnUpdateCartQuantity.on("click",() => {
        let so_luong_moi = parseInt(show_quantity.val()); 
        if( parseInt(show_quantity.data("present-value")) == so_luong_moi)
            return;    
        data['so_luong_moi'] = so_luong_moi;            
        if(price!=priceSale && so_luong_moi > saleQuantity )
            showMessage("Thông báo",`Chỉ có ${saleQuantity} sản phẩm khuyến mãi, phần số lượng vượt ngưỡng này sẽ tính theo giá gốc, bạn vẫn muốn tiếp tục?`,()=>{
                UpdateCartQuantityProduct(data,btnUpdateCartQuantity,infoUpdateCartQuantity,show_quantity);        
        })
        else
            UpdateCartQuantityProduct(data,btnUpdateCartQuantity,infoUpdateCartQuantity,show_quantity);        
    })
}

var UpdateCartQuantityProduct = (data,btnUpdateCartQuantity,infoUpdateCartQuantity,show_quantity)=>{    
    $.ajax({
        url: BASE_URL_API+PREFIX_CART+PREFIX_CART_UPDATE_QUANTITY,
        type: "POST",   
        data:data,                
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },            
        success: function (res) {  
            console.log(res)                            
            switch (res.status) {
                case -1:
                    handleCreateToast("success",res.message,null,true);
                    btnUpdateCartQuantity.slideUp();
                    infoUpdateCartQuantity.slideUp();
                    show_quantity.data("present-value",data.so_luong_moi);                    
                    break;   
                case -2, -3:
                    handleCreateToast("warning",res.message,`warning-carts-${res.status}`,true);
                    break; 
                case -4:
                    handleCreateToast("error",res.message,'err',true);
                    break;                                   
                default:
                    handleCreateToast("info",res.message+" ("+res.status+")",'info',true); 
                    //itemPresentQuantity.text(res.status);                  
                    break;
            }                                                     
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","err-call-cart",true);                      
            if(xhr.status==404)
                $("body").html(error404());
        }
    });
}

$("#link-register").on("click",()=>{
    //down:hiện
    $("#box-login").slideUp()
    $("#box-register").slideDown();
})

$("#link-login").on("click",()=>{
    $("#box-login").slideDown()
    $("#box-register").slideUp();
}) 

// var createEventValidateQuantityCart = ()=>{
//     const cart_boxs = $('.cart-box-edit-quantity');
//     cart_boxs.each(function() {        
//         ValidateQuantityCart($(this));
//     });
//     // const cart_boxs = document.querySelectorAll('.cart-box-edit-quantity');
//     // cart_boxs.forEach(item=>ValidateQuantityCart(item))
// }


// $("#cart-button").on("click",()=>{
//     $("#box-login").slideUp()
//     $("#box-register").slideDown();
// })
var htmlBoxLogin = `<ul class="item-convert-login">                    
                        <li title="Đăng nhập"><a href="#" id="icon-convert-login"><b>Đăng nhập</b> <img  src="${URL_HOST}FE/img/core-img/right-to-bracket-solid.svg" alt=""></a></li>                    
                    </ul>`
var reloadFormAuth = ()=>{
    $(".cart-area").on("click",()=>{
        if($("#login").length)    
        {                     
            $("#rightSideCart").html(`<img src="${URL_HOST}FE/img/core-img/right-to-bracket-solid.svg" alt="Đăng nhập"> <span></span>`)            
            $("#icon-convert-cart").on('click',()=>{
                $("#box-cart").fadeIn();
                $("#container-box-auth").fadeOut();  
                $("#rightSideCart").html(`<img src="${URL_HOST}FE/img/core-img/bag.svg" alt="Giỏ hàng"> <span></span>`)                           
            });            
            createEventLoginAndRegister();
            $("#item-convert-cart").on("click",()=>loadDataCart())
        }
        else
        {
            $("#box-cart").fadeIn();
            loadDataCart();
            $("#box-select-login").html(ulOrderStr());            
        }
    })    
}
// href="/don-hang/tao-don-dat-hang"
var ulOrderStr = () => {
    return `<a class="btn btn-outline-warning btn-cart-order "  id="btn-submit-order">
                <img src="${URL_HOST}FE/img/core-img/icon_order.svg" alt="Đặt hàng">
                Đặt hàng
            </a>`
}

var createEventLoginAndRegister = ()=>{    
    $('#form-login').on('submit',(ev)=>{
        ev.preventDefault();        
        let formData = $('#form-login').serialize();  
        $("#btn-login").prop("disabled", true);                  
        $.ajax({
            url: BASE_URL_API+PREFIX_AUTH+PREFIX_LOGIN,
            type: "POST",   
            data:formData,                                 
            success: function (res) {                                                           
                if(res.success)  
                {                                                                                           
                    if(res.url!=null)
                        location.replace(res.url);
                    else                    
                        handleCreateToast("success",res.message,"success-login",true);                                                             
                    $("#error-login").text("");
                    $("#container-box-auth").slideUp();                    
                    $("#box-cart").slideDown(); 
                    $("#container-box-auth").remove();
                    $("#login").attr("id","cart");
                    chk_carts = false;    
                    loadUIUlUser(res.nguoidung)
                    loadDataCart();                                                                          
                }   
                else            
                    {
                        handleCreateToast("warning",res.message,null,true);            
                        $("#error-login").text(res.message);
                        $("#btn-login").prop("disabled", false);
                    }
            },
            error: function (xhr, status, error) {
                handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","error-login",true);
                $("#btn-login").prop("disabled", false);                                  
                // if(xhr.status==404)
                //     $("body").html(error404());
            }
        });
    })

    $('#form-register').on('submit',(ev)=>{
        ev.preventDefault();        
        let formData = $('#form-register').serialize();  
        $("#btn-register").prop("disabled", true);
        $(".error-validate-register").each(function(){
            $(this).text("")
        });
        $.ajax({
            url: BASE_URL_API+PREFIX_AUTH+PREFIX_REGISTER,
            type: "POST",   
            data:formData,                                 
            success: function (res) {                                                           
                if(res.url!=null)
                    location.replace(res.url);
                $("#container-box-auth").slideUp();                    
                $("#box-cart").slideDown(); 
                $("#container-box-auth").remove();
                $("#login").attr("id","cart");
                chk_carts = false;    
                loadDataCart(); 
                loadUIUlUser(res.data.nguoidung)
            },
            error: function (xhr, status, error) {
                res = xhr.responseJSON;
                $("#btn-register").prop("disabled", false);
                console.log(res)
                for (const key in res.errors) {
                    if (Object.hasOwnProperty.call(res.errors, key)) {
                        const error = res.errors[key];
                        $(`.error-validate-register.${key}`).text(error)
                    }
                }    
            }
        });
        // new CallApi(PREFIX_AUTH+PREFIX_REGISTER)
        //     .create(formData,(res)=>{
        //         if(res.url!=null)
        //             location.replace(res.url);
        //         $("#container-box-auth").slideUp();                    
        //         $("#box-cart").slideDown(); 
        //         $("#container-box-auth").remove();
        //         $("#login").attr("id","cart");
        //         chk_carts = false;    
        //         loadDataCart();                 

        //     },(res)=>{
        //         $("#btn-register").prop("disabled", false);
        //         console.log(res)
        //         for (const key in res.errors) {
        //             if (Object.hasOwnProperty.call(res.errors, key)) {
        //                 const error = res.errors[key];
        //                 $(`.error-validate-registe.${key}`).text(error)
        //             }
        //         }                
        //     })
        // $.ajax({
        //     url: BASE_URL_API+PREFIX_AUTH+PREFIX_REGISTER,
        //     type: "POST",   
        //     data:formData,                                 
        //     success: function (res) {                                                           
        //         if(res.success)  
        //         {                                                                                           
        //             if(res.url!=null)
        //                 location.replace(res.url);
        //             else                    
        //                 handleCreateToast("success",res.message,"success-login");                                                             
        //             $("#error-login").text("");
                                                                                             
        //         }   
        //         else            
        //             {
        //                 handleCreateToast("warning",res.message);            
        //                 $("#error-register").text(res.message);
        //                 $("#btn-register").prop("disabled", false);
        //             }
        //     },
        //     error: function (xhr, status, error) {
        //         handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại");
        //         $("#btn-register").prop("disabled", false);                                  
        //         // if(xhr.status==404)
        //         //     $("body").html(error404());
        //     }
        // });
    })

}
const loadUIUlUser = (nguoi_dung)=>{
    $("#ul-user").show();
    $("#username-show").text(nguoi_dung.ten_dang_nhap)
    $("#username-hidden").text(nguoi_dung.ten_dang_nhap)
}
const notificateCart = $("#notification-cart");
var chk_carts = false;
var loadDataCart =()=>{ 
    return chk_carts = chk_carts == false ?
    $.ajax({
        url: BASE_URL_API+PREFIX_CART+PREFIX_CART_LIST,
        type: "GET",                                         
        success: function (res) {                                                            
            if(res.success)  
            {   
                totalMoney = totalQuantity = 0;                                                   
                let data = res.data;
                let s = "";
                let boxCarts = $(".box-cart"); 

                if($("#login").length && (res.data == null || res.data.length == 0))
                    $("#box-select-login").html(htmlBoxLogin);
                else
                {
                    if($("#login").length)
                        $("#box-convert").html(htmlBoxLogin); 
                    else
                        $("#box-convert").html("")
                }     
                $("#icon-convert-login").on("click",()=>{
                    $("#box-cart").fadeOut();
                    $("#container-box-auth").fadeIn();  
                    $("#rightSideCart").html(`<img src="${URL_HOST}FE/img/core-img/right-to-bracket-solid.svg" alt="Đăng nhập"> <span></span>`)
                })                 
                if(res.data == null || res.data.length == 0)
                {
                    boxCarts.html("<center>Trống</center>");  
                    $("#btn-submit-order").remove() 
                    notificateCart.text("")                 
                }
                else
                {                                 
                    $("#box-select-login").html(ulOrderStr());                     
                    boxCarts.html(`<div class="row box-cart-all-products">
                                                <div class="box-check-all">
                                                    <input class="form-check-input custom-checkbox " title="chọn tất cả sản phẩm trong giỏ hàng" type="checkbox" role="switch" id="check-carts-all">
                                                    <label id="label-check-carts-all" for="check-carts-all"> Tất cả</label>
                                                </div>                                                            
                                                <div class="box-all-product-cart" id="box-all-product-cart"></div>
                                            </div>`);
                    let boxAllProductCart = $("#box-all-product-cart");
                    let i = 1;       
                    let list_checkbox_shop = [];
                    let countCart = 0;
                    data.forEach(shop=>{      
                        let shop_id = JsonParseStr(shop._id ?? shop.cua_hang_id);              
                        var cart_item_shop = $(`<div class="row cart-item-shop" style="padding:10px;position: relative;">
                                <button class="cart-btn-delete-shop">
                                    <a class="cart-shop-btn-delete" style="color:red;outline: none; border: none;background-color: transparent;">                                               
                                        <img src="${URL_HOST}FE/img/core-img/icon-delete.svg" alt="">                                                
                                    </a>
                                </button>                              
                                <div class="row">
                                    <div class="col-md-7 col-12 box-shop-check-all" >
                                        <input class="form-check-input custom-checkbox checkbox-cart-shop-all" title="chọn tất cả sản phẩm của shop này" type="checkbox" role="switch" id="">
                                        <a href="${URL_HOST+PREFIX_STORE+shop_id}">
                                            <img width="50" height="50" src="#">
                                            <b>${shop.ten_cua_hang}</b>
                                        </a>
                                    </div>
                                    <div class="col-md-5 col-12">
                                        <div>
                                            <a class="btn-chat-shop" style="position: relative; top: 20px; ">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chat-left-text" viewBox="0 0 16 16">
                                                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                                                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                                                </svg>
                                                Chat với shop
                                            </a>
                                        </div>
                                    </div> 
                                </div>
                                <hr>
                                <div class="item-carts" id="item-cart-products-${shop_id}"></div></div>`);  
                                boxAllProductCart.append(cart_item_shop); 
                                let item_cart_products = $(`#item-cart-products-${shop_id}`);                             
                                shop.san_phams.forEach(item=>{ 
                                    countCart++;
                                    let price = item.san_pham.gia_hien_tai ?? null;
                                    let ss = "";
                                    if(item.san_pham.phan_loai)
                                    {
                                        price = item.san_pham.phan_loai.gia_hien_tai ?? price;
                                        ss=item.san_pham.phan_loai.ten_phan_loai;                                                    
                                        if(item.san_pham.phan_loai.kich_co_phan_loais)
                                        {
                                            ss += " | "+item.san_pham.phan_loai.kich_co_phan_loais.ten_kich_co;
                                            price = item.san_pham.phan_loai.kich_co_phan_loais.gia_hien_tai ?? price;
                                        }                                            
                                    } 
                                    else if(item.san_pham.ten_phan_loai)
                                        ss= item.san_pham.ten_phan_loai + (item.san_pham.ten_kich_co ? " | "+item.san_pham.ten_kich_co : "");   
                                    let priceSale = null;                                    
                                    let htmlpriceMain = ""
                                    if(CheckSale(item.san_pham))
                                    {
                                        priceSale = parseInt((1 - item.san_pham.giam_gia)*price);  
                                        let check = item.so_luong > item.san_pham.so_luong_gioi_han;                                        
                                        htmlpriceMain = `<h6 title="Giá các sản phẩm còn khuyến mãi" style="color:crimson"><span class="price-sale">${(priceSale).toLocaleString('de-DE')}đ</span>
                                                            <span class="price-sale-quantity">${check ? "("+item.san_pham.so_luong_gioi_han+")" : ""}</span>
                                                        </h6>
                                                        <h6 title="Giá các sản phẩm không đủ để khuyến mãi" style="color:crimson"><span class="price-real">${check ? (price).toLocaleString('de-DE')+"đ" : ""}</span>
                                                            <span class="price-real-quantity">${check ? "("+(item.so_luong - item.san_pham.so_luong_gioi_han)+")" : ""}</span>
                                                        </h6>`                                                                                                                            
                                    }
                                    else
                                    {
                                        priceSale = price;    
                                        htmlpriceMain = `<h5 class="giasp" title="0.2" style="color:crimson">${(priceSale).toLocaleString('de-DE')}đ</h5>`                                      
                                    }     
                                    let san_pham_id = JsonParseStr(item.san_pham.san_pham_id)                                                                   
                                    s=`<div class="row cart-item-product" style="padding:10px;margin-bottom:0px; position: relative; ">
                                        <div class="col-lg-6 col-12">
                                            <div class="row">
                                                <div class="col-4 col-lg-4 row">
                                                    <div class="col">
                                                        <input value="${priceSale ?? price}" class="form-check-input custom-checkbox checkbox-carts-product" title="Thêm '${item.san_pham.ten_san_pham}' vào đơn hàng" type="checkbox" role="switch" >
                                                    </div>
                                                    <div class="col-12">
                                                        <div class="w-100" style=" width: 100%; height: 100px; background: url(${URL_HOST}uploads/${shop_id}/${san_pham_id}/${item.san_pham.anh_bia});  background-size:cover;"></div>
                                                    </div>
                                                </div>
                                                <div class="col-8 col-lg-8 p-2">
                                                    <h6><a href="/san-pham/${JsonParseStr(item.san_pham.san_pham_id)}"><b class="item-name-product">${item.san_pham.ten_san_pham}</b></a></h6>
                                                    <span class="item-product-cart-classify">${ss}</span>${ss != "" ? `<br>` : ""}
                                                    <span class="${priceSale != price ? "line-through" : "color-red"}">${price.toLocaleString('de-DE')}đ</span><br>
                                                    ${priceSale != price ? `<span class="color-red">${priceSale.toLocaleString('de-DE')}đ</span>` : ""}                                                    
                                                </div>
                                            </div>                                            
                                        </div>
                                        <div class="col-lg-6 col-12">
                                            <div class="row">
                                                <div class="col-sm-5 col-12">
                                                    <center>
                                                        ${htmlpriceMain}
                                                    </center>
                                                </div>
                                                <div class="col-sm-6 col-12" style="align-content:center; align-items:center; text-align:center;">
                                                    <div class="cart-box-edit-quantity" id="btn-up-quantity-${i}">
                                                        <a class="btn btn-outline-warning cart-add">+</a>
                                                        <input type="text" name="so_luong_mua" class="cart-show-quantity" />
                                                        <a class="btn btn-outline-warning cart-minus">-</a> 
                                                        <span class="item-present-quantity" ></span>
                                                        <center class="box-update-quantity">  
                                                            <span class="item-message-update-quantity" style="display: none" ><img src="${URL_HOST}FE/img/core-img/icon-warning.svg"> </span>
                                                            <button class="btn btn-outline-warning btn-update-cart-quantity">Lưu</button>                                                                                                              
                                                        </center>
                                                    </div>                                                                                                    
                                                </div>
                                                <div class="col-sm-1">
                                                </div>                                                                    
                                            </div>
                                        </div>
                                        <button class="cart-btn-delete-item">
                                            <span class="cart-btn-delete" style="color:black;outline: none; border: none;background-color: transparent;">                                               
                                                <img  src="${URL_HOST}FE/img/core-img/trash-solid.svg" alt="">                                                
                                            </span>
                                        </button>                   
                                    </div>`;        
                                    var item_product = $(s);   
                                    item_product.data("price-real",price);
                                    item_product.data("price-sale",priceSale);
                                    item_product.data("sale-quantity",item.san_pham.so_luong_gioi_han ?? 0);
                                    item_product.find(".cart-btn-delete-item").click(function(){
                                        deleteProductFromCart(item,item_product,cart_item_shop)
                                    })                         
                                    item_cart_products.append(item_product);                                                                     
                                    // var btnUpQuantity = document.getElementById(`btn-up-quantity-${i++}`);                                                                        
                                    // ValidateQuantityCart(btnUpQuantity,item,price);                                                                                                             
                                })            
                                list_checkbox_shop.push(item_cart_products);                                                                     
                            CreateEventCartShop(item_cart_products,shop.san_phams);  
                            cart_item_shop.find(".cart-btn-delete-shop").click(function(){
                                deleteProductFromCartWithShop(shop_id,cart_item_shop)
                            })              
                    })                     
                    notificateCart.text(countCart) 
                    $("#total-data").html(`<div class="total-money">
                                                <div class="row">
                                                    <div class="col-md-4 col-12">
                                                        <center><strong class="setup-total">Tổng: <span id="total-quantity">0</span></strong></center>
                                                    </div>
                                                    <div class="col-md-8 col-12">
                                                        <center><strong class="setup-total">Thành tiền: <span id="total-into-money">0</span>đ</strong></center>
                                                    </div>
                                                </div>
                                            </div>`);                     
                    loadColorCheckBox(); 
                    createEventCheckAllCarts(list_checkbox_shop);
                    OnSubmitOrder($('.cart-item-shop'),data);
                }                                                                               
                //createEventValidateQuantityCart();                
            }   
            else            
            {
                handleCreateToast("error",res.message,"error",true);                               
            }
        },
        error: function (xhr, status, error) {
            handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại",true);                                                          
        }
    }):true;
}

var deleteProductFromCartWithShop = (cua_hang_id,cart_item_shop)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_CART+PREFIX_CART_DELETE_PRODUCTS_FROM_CART_WITH_SHOP,
        type: "DELETE",   
        data:{"cua_hang_id":cua_hang_id},    
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },
        //contentType: 'application/json', 
        success: function (res) {                          
            if(res.success)  
            {                
                cart_item_shop.remove()
                if($(".cart-item-shop").length==0)
                {
                    $(".box-cart").html(`<center>Trống</center>`)
                    $("#btn-submit-order").remove()
                }                
                refreshTotal();
            }   
            else            
                handleCreateToast("error",res.message,'err',true);            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors);                     
            // if(xhr.status==404)
            //     $("body").html(error404());
        }
    });
}

var deleteProductFromCart = (item,item_product,cart_item_shop)=>{
    $.ajax({
        url: BASE_URL_API+PREFIX_CART+PREFIX_CART_DELETE_PRODUCT_FROM_CART,
        type: "DELETE",   
        data:item,    
        headers:{
            'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
            },
        //contentType: 'application/json', 
        success: function (res) {    
            console.log(res);           
            if(res.success)  
            {
                refreshTotal();
                item_product.slideUp();
                item_product.remove();
                if(cart_item_shop.find(".cart-item-product").length == 0)
                {
                    cart_item_shop.remove()
                    if($(".cart-item-shop").length==0)
                    {
                        $(".box-cart").html(`<center>Trống</center>`)
                        $("#btn-submit-order").remove()
                    }
                }
            }   
            else            
                handleCreateToast("error",res.message,'err',true);            
        },
        error: function (xhr, status, error) {
            handleCreateToast("error",xhr.responseJSON.error ?? xhr.responseJSON.errors);                     
            // if(xhr.status==404)
            //     $("body").html(error404());
        }
    });
}





var createEventCheckAllCarts = (list_checkbox_shop)=>{    
    $("#check-carts-all").on("change",()=>{        
        let status = $('#check-carts-all').is(":checked")          
        list_checkbox_shop.forEach(item => {
            let items_product = item.find(".cart-item-product");  
            setCheckAll(items_product,status) 
            let check_shop_all = item.parent().find('.checkbox-cart-shop-all'); 
            setStatusCheck(check_shop_all,status)
    })
})
}
var OnSubmitOrder = (item_shops,data)=>{
    $("#btn-submit-order").on("click",()=>{ 
        CheckValidationOrder(item_shops,data);
    });
}
var CheckValidationOrder = (item_shops,data)=>{
    let orderData = [] 
    for(let i = 0;i<item_shops.length;i++)
    {
        let san_phams = Array();
        let items_product = $(item_shops[i]).find('.cart-item-product');
        for(let j = 0;j<items_product.length;j++)
        {
            if($(items_product[j]).find(".checkbox-carts-product").is(":checked"))
            {
                let show_quantity = $(items_product[j]).find('input[name="so_luong_mua"]')
                let so_luong_mua = parseInt(show_quantity.val());
                if(isNaN(so_luong_mua))
                {
                    handleCreateToast("info","Số lượng mua không được để trống!!!","info-update-quantity",true);
                }
                else if(parseInt(show_quantity.data("present-value")) != so_luong_mua)
                {
                    $(items_product[j]).find(".item-message-update-quantity").slideDown();
                    handleCreateToast("info","Vui lòng cập nhật số lượng mới","info-update-quantity",true);                    
                }
                else
                {
                    san_phams.push({
                        "san_pham":data[i].san_phams[j].san_pham,
                        "so_luong":so_luong_mua
                    })
                }
            }
        }
        if(san_phams.length>0)
            orderData.push({
                "_id":data[i]["_id"] ?? data[i]["cua_hang_id"],
                "ten_cua_hang":data[i]["ten_cua_hang"],
                "anh_dai_dien":data[i]["anh_dai_dien"],
                "san_phams":san_phams
        });
    } 
    if(orderData.length>0)       
        CallApiCreateOrrder(orderData)         
    else
        handleCreateToast("info","Bạn chưa chọn sản phẩm nào!!!","info",true);
}

var CallApiCreateOrrder = (orderData)=>{                   
        $.ajax({
            url: BASE_URL_API+PREFIX_ORDER+PREFIX_ORDER_CHECKOUT,
            type: "POST",   
            data: JSON.stringify(orderData),
            contentType: 'application/json',                
            headers:{
                'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
                },            
            success: function (res) { 
                console.log(res)                      
                if(res.status==1)                
                {                    
                    location.replace(URL_HOST+PREFIX_ORDER+PREFIX_ORDER_CHECKOUT)
                }                                                         
                else if(res.status==0)
                {
                    handleCreateToast("success","Đã lưu đơn hàng, vui lòng đăng nhập để tiến hành thao tác tiếp theo",null,true);
                    $("#container-box-auth").slideDown(); 
                    $("#box-register").slideUp();
                }
                else
                    handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","err-call-cart",true);
            },
            error: function (xhr, status, error) {
                handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại","err-call-cart",true);                                      
            }
        });                                            
}

var CreateEventCartShop = (item_cart_products,san_phams)=>{       
    let chk_products_list = item_cart_products.find('.checkbox-carts-product');
    let chkbox_all = item_cart_products.parent().find('.checkbox-cart-shop-all'); 

    let items_product = item_cart_products.find(".cart-item-product");///đây là 1 list
    for(let i = 0;i<items_product.length;i++)
    {
        let checkbox_carts_product = $(items_product[i]).find('.checkbox-carts-product');
        ValidateQuantityCart($(items_product[i]),checkbox_carts_product,san_phams[i])
        checkbox_carts_product.on("change",()=>{
            refreshTotal()
            if(checkbox_carts_product.is(':checked'))
            {                
                // addTotal($(items_product[i]))
                if(item_cart_products.find('.checkbox-carts-product:checked').length == chk_products_list.length)
                {
                    setStatusCheck(chkbox_all);
                    if($('.checkbox-carts-product:checked').length == $('.checkbox-carts-product').length)
                        return setStatusCheck($("#check-carts-all"),true)
                }
            }
            else
            {
                // addTotal($(items_product[i]),false)
                setStatusCheck(chkbox_all,false);
                setStatusCheck($("#check-carts-all"),false)                 
            }
        })
    }    
    chkbox_all.on("change",()=>{  
        let status = chkbox_all.is(':checked')
        setCheckAll(items_product,status)
        if(status && $('.checkbox-carts-product:checked').length == $('.checkbox-carts-product').length)
            return setStatusCheck($("#check-carts-all"),true)  
        setStatusCheck($("#check-carts-all"),false)
    })
}

var setCheckAll = (items_product, status=true)=>{
    items_product.each(function() {        
        let checkbox_carts_product = $(this).find('.checkbox-carts-product');        
        // if(checkbox_carts_product.is(":checked")!=status)
        //     addTotal($(this),status)
        setStatusCheck(checkbox_carts_product,status);
    })
    refreshTotal()
}


var setStatusCheck = (btn_chk,status = true)=>{
    if(status==true)
    {
        btn_chk.prop('checked', true);
        btn_chk.addClass('checked-custom'); 
    }
    else
    {
        btn_chk.prop('checked', false);  
        btn_chk.removeClass('checked-custom')
    }    
}

// var refreshTotal = (priceSale,saleQuantity,chk_add=true,priceReal = null,quantity=null)=>{
//     let total = priceSale * saleQuantity + (priceReal != null ? priceReal*quantity : 0)
//     if(chk_add)
//     {
//         totalMoney += total
//         totalQuantity += (saleQuantity + quantity ?? 0) 
//     }
//     else
//     {
//         totalMoney -= total
//         totalQuantity -= (saleQuantity + quantity ?? 0) 
//     }
//     $("#total-quantity").text(totalQuantity);
//     $("#total-into-money").text(totalMoney.toLocaleString('de-DE'));
// }



const refreshTotal = ()=>{
    var totalMoney = 0;
    var totalQuantity = 0;
    const item_products = $(".cart-item-product")
    for (var item_product of item_products) {
        // console.log(item_product)        
        item_product = $(item_product)
        if(item_product.find(".checkbox-carts-product").is(":checked"))
        {
            let show_quantity = item_product.find('input[name="so_luong_mua"]')
            let payQuantity = parseInt(show_quantity.val());       
            let priceSale = parseInt(item_product.data('price-sale'));
            let priceReal = parseInt(item_product.data('price-real'));    
            let saleQuantity = item_product.data("sale-quantity");
            if(payQuantity > saleQuantity)
            {
                totalMoney += (priceSale * saleQuantity + priceReal*(payQuantity - saleQuantity))            
            }
            else
            {
                totalMoney += (priceSale * payQuantity) 
            }
            totalQuantity += payQuantity 
        }               
    }
    $("#total-quantity").text(totalQuantity);
    $("#total-into-money").text(totalMoney.toLocaleString('de-DE'));
}

var addTotal = (item_product, chk_add = true)=>{
    let show_quantity = item_product.find('input[name="so_luong_mua"]')
    let payQuantity = parseInt(show_quantity.val());       
    let priceSale = parseInt(show_quantity.data('current-price'));
    let priceReal = parseInt(item_product.data('price-real'));    
    let saleQuantity = item_product.data("sale-quantity");
    if(payQuantity > saleQuantity)        
    {       
        return refreshTotal(priceSale,saleQuantity,chk_add,priceReal,(payQuantity-saleQuantity));   
    }
    refreshTotal(priceSale,payQuantity,chk_add);   
}