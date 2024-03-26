
// const input_create_price_all = $("#input-create-price-all")
// const input_create_quantity_all = $("#input-create-quantity-all")
// const input_create_product_name = $("#input-create-product-name")
// const message_price_all = $("#message-price-all")
// const message_product_name_all =  $("#message-product-name-all")
// const message_quantity_all = $("#message-quantity-all")
// const check_create_classify =$("#check-create-classify");
// const count_classify = $("#count-classify");
// const mes_product_name_value = "Tên sản phẩm không được để trống";
// const mes_product_quantity_value = "Số lượng không được để trống";
// const mes_product_details_key = "Thuộc tính không được để trống";
// const mes_product_details_value = "Giá trị thuộc tính không được để trống";
// const mes_product_discount_ratio = "Tỷ lệ giảm giá không được để trống";
// const mes_product_discount_limited_quantity = "Số lượng giới hạn không được để trống";
// const mes_quantity = "Số lượng không được để trống";
// const mes_size_name = "Tên kích cở không được để trống"
// var key_classify = "Phân loại";
// var key_size = "Kích cở"; 
// var i = 1;

// var checkPriceAll = ()=>{
//     let box_classify_list = $(".box-classify");
//     let chk_price_all = true; 
//     if(check_create_classify.is(":checked"))
//     {
//         if(input_create_price_all.val()=="")
//         {                   
//             for(box_classify of box_classify_list)
//             {                    
//                 let classify_message_price = $(box_classify).find(".classify-message-price")        
//                 if($(box_classify).find(".input-classify-price-value").val()=="")
//                 {                
//                     if($(box_classify).find(".input-checkbox-design-size").is(":checked"))
//                     {                    
//                         if(!checkPriceBoxSizeDetailsList($(box_classify)))
//                         {
//                             classify_message_price.text("Trường hợp này giá bán không được để trống")                         
//                             messageSizeShow(message_price_all,"Giá bán hiện tại không thể để trống",input_create_price_all)
//                             chk_price_all = false;
//                         }
//                         else
//                             classify_message_price.text("")
//                     }
//                     else  
//                     {
//                         classify_message_price.text("Trường hợp này giá bán không được để trống")              
//                         chk_price_all = false;
//                     }
//                 }
//                 else
//                 {
//                     checkPriceBoxSizeDetailsList($(box_classify),true);
//                     classify_message_price.text("");
//                 }           
//             }        
//         }
//         else
//         {
//             for(box_classify of box_classify_list)
//             {
//                 let classify_message_price = $(box_classify).find(".classify-message-price")  
//                 checkPriceBoxSizeDetailsList($(box_classify),true);
//                 classify_message_price.text("");
//                 messageSizeHide(message_price_all,input_create_price_all)
//             }
//         }
//     }
//     else
//     {
//         if(input_create_price_all.val()=="")
//         {
//             messageSizeShow(message_price_all,"Giá bán không thể để trống",input_create_price_all)
//             chk_price_all = false;
//         }
//         else
//             messageSizeHide(message_price_all,input_create_price_all)
//     }
//     return chk_price_all;
// }

// input_create_price_all.blur(function(){
//     checkPriceAll();
// })

// createEventInputNotImptyCustom(input_create_product_name,message_product_name_all,mes_product_name_value);
// createEventInputNotImptyCustom(input_create_quantity_all,message_quantity_all,mes_product_quantity_value);


// var createSelectCategory = (danh_muc_id = null, level = 1)=>{    
//     getCategory(danh_muc_id,(data)=>{   
//         let item_select_category_level = $(`#item-select-category-level-${level}`);         
//         let select = null;
//         if(data.length > 0)
//         {                
//             let s = `<select name="danh_muc_id" class="item-select w-100 btn">`;
//             data.forEach(item => {
//                 s+=`<option value="${item._id}">${item.ten_danh_muc}</option> `
//             });
//             s+=`</select><div style="display:none" id="item-select-category-level-${level+1}"></div>`;
//             select = $(s);
//             //$("#ward option:selected").
//             select.on("change",function(){
//                 createSelectCategory($(this).val(),level+1);                   
//             })                                                                      
//             item_select_category_level.html(select);
//             item_select_category_level.slideDown();
//             select.change();
//         }                                                                         
//         else
//         {
//             item_select_category_level.slideUp(); 
//             item_select_category_level.html("");
//         }
//     })    
// }
// createSelectCategory();
// createInputNumber("#input-create-price-all",1,9999999999);
// createInputNumber("#input-create-quantity",0,9999999999);

// $("#check-create-classify").on("change",function(){
//     $("#item-create-quantity").slideToggle();
//     $("#box-create-classify ").slideToggle();
//     checkPriceAll();
// })

// $("#btn-create-box-classify").click(function(){
//     $("#box-design-classify").append(createBoxClassify(i++));     
//     fideInInputKeySize();    
//     count_classify.text(parseInt(count_classify.text())+1);              
// })


// var fideInInputKeySize = ()=>{          
//     if($(".input-checkbox-design-size:checked").length == 1)
//     {
//         setTimeout(function(){
//             $("#item-input-design-key-size").fadeIn();
//         },300); 
//         $("#item-input-design-key-classify").removeClass("col-12");
//         $("#item-input-design-key-classify").addClass("col-md-6");                
//     } 
// }
// var createEnvetInputSize = (dom,message_size,msg)=>{    
//     dom.blur(function(){                
//         $(this).val($(this).val().trim());
//         if($(this).val()==0)
//         {
//             message_size.text(msg);
//             $(this).addClass("border-message")

//         }
//         else
//         {
//             message_size.text("");
//             $(this).removeClass("border-message")
//         }
//     })
// }


// var createBoxSize = (box_classify)=>{
//     let s =`<div class="box-size-details">
//             <input type="text" class=" input-create-info margin-bottom-5 input-size-name" placeholder="Tên kích cở">
//             <span class="message-size-name" style="display:none"></span>
//             <div class="item-remove-box-size" title="Click vào đây để xóa cái này">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
//                 </svg>
//             </div>
//             <div class="box-size-details-info-basic">
//                 <div class="box-input-create-size">
//                     <input type="text" class="btn input-create-info w-100 input-create-size input-size-price" placeholder="Giá bán...">
//                     <span class="message-size-price">Giá bán không được để trống</span>
//                 </div>
//                 <div class="box-input-create-size">
//                     <input type="text" class="btn input-create-info w-100 input-create-size input-size-quantity" placeholder="Số lượng tồn">
//                     <span class="message-size-quantity">Số lượng tồn không được để trống</span>
//                 </div>
//             </div>
//         </div> `;   
//     var box_size = $(s);
//     let input_size_name = box_size.find(".input-size-name");  
//     let message_size_name = box_size.find(".message-size-name");  
//     let message_size_price = box_size.find(".message-size-price");  
//     let message_size_quantity = box_size.find(".message-size-quantity");  
//     let input_size_price = box_size.find(".input-size-price");  
//     let input_size_quantity = box_size.find(".input-size-quantity");      
//     createEventInputNotImptyCustom(input_size_name,message_size_name,mes_size_name) 
//     createInputNumber(input_size_quantity,0);       
//     createInputNumber(input_size_price,0);       
    
//     let count_size = box_classify.find(".count-size"); 
//     let input_classify_price_value = box_classify.find(".input-classify-price-value")
//     let classify_message_price = box_classify.find(".classify-message-price")
//     input_size_price.blur(function(){
//         if( $(this).val() == "" && input_classify_price_value.val()==""&&input_create_price_all.val()=="")
//         {

//            return messageSizeShow(message_size_price,"Giá bán tại đây không được để trống",$(this));
//         }
//         else if($(this).val()!="")
//         {       
//             let input_size_price_list = box_classify.find(".input-size-price");
//             messageSizeHide(message_size_price,$(this));  
//             for(item_input_size_price of input_size_price_list)        
//                 if($(item_input_size_price).val()=="")                            
//                     return;                    
//             classify_message_price.text("");     
//             let message_size_price_list = $(".message-size-price");
//             for(item_message_size_price of message_size_price_list)
//                 if($(item_message_size_price).css("display")==="block")                
//                     return;                            
//             messageSizeHide(message_price_all,input_create_price_all)                
//         }                        
//     })
//     createEventInputNotImptyCustom(input_size_quantity,message_size_quantity,mes_quantity)

//     box_size.find(".item-remove-box-size").click(function(){
//         let countSize = parseInt(count_size.text());
//         if(countSize>1)
//         {
//             box_size.remove();
//             count_size.text(countSize-1)
//         }
//         else
//             handleCreateToast("info","Phải có ít nhất 1 kích cở","info-kc");
//     })
//     return box_size;
// }



// //sự kiện hình ảnh

// var showFileImageClassify = (files,input_choose_image_classify,title_choose_image,data_image)=>{
//     const file = files[0];
//     input_choose_image_classify[0].files = files;
//     const fileType = file.type;
//     const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (validExtensions.includes(fileType)) {
//         const fileReader = new FileReader();
//         fileReader.onload = function () { 
//             if(images[file.name])
//                 return handleCreateToast("info","ảnh này đã tải lên, vui lòng chọn ảnh khác");                         
//             const fileUrl = fileReader.result;                                
//             let img = $(`<div class="image classify" id="${file.name}" style="background: url(${fileUrl}); background-size:cover " title="Click vào đây để xóa cái ảnh này">
//                             <div class="item-remove-image">
//                                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                                     <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
//                                 </svg>                                                                  
//                             </div>
//                         </div>`);   
//             img.data("image-name",file.name);
//             img.find(".item-remove-image").click(function(){
//                 delete images[img.attr("id")];
//                 img.remove();                                
//             })              
//             data_image.html(img); 
//             images[file.name] = file;                                                                                                          
//         }
//         fileReader.readAsDataURL(file);          
//     } else {
//         handleCreateToast("error","Không đúng định dạng hình ảnh!!!","error-images-2")        
//     }
//     title_choose_image.text("Chọn hoặc kéo thả ảnh vào đây")
// }

// //---------------------

// var createBoxClassify = (i)=>{
//     let s=`<div class="box-classify">
//                 <input type="text" class="input-classify-name input-create-info" placeholder="Tên phân loại...">
//                 <span class="message-classify-name" style="display:none"><span title="Tên phân loại không được để trống">*</span></span>
//                 <div class="item-remove-box-classify" title="click vào đây để xóa cái phân loại này">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
//                     </svg>
//                 </div>
//                 <div class="input-check-design-size">
//                     <label for="input-checkbox-design-size-${i}">Bật "<span class="size-rename">kích cở</span>"</label>
//                     <input type="checkbox" class="input-checkbox-design-size" id="input-checkbox-design-size-${i}" checked>
//                 </div>                
//                 <div class="box-classify-details">
//                     <div class="row box-classify-details-info-basic">
//                         <div class="col-12 input-classify-price">
//                             <input type="text" class="btn w-100 input-create-info margin-bottom-10 input-classify-price-value" placeholder="Giá bán">                            
//                             <span class="classify-message classify-message-price"></span>
//                         </div> 
//                         <div class="col-md-6 col-lg-6 input-classify-quantity">
//                             <input type="text" class="btn w-100 input-create-info margin-bottom-10 input-classify-quantity-value" placeholder="Số lượng tồn">
//                             <span class="classify-message classify-message-quantity"></span>
//                         </div>                                                                                          
//                     </div>                    
//                     <div class="product-classify-images row">
//                         <div class="col-6">
//                             <div class="box-add-image classify">
//                                 <span class="title-choose-image">Chọn hoặc kéo thả ảnh vào đây</span>
//                                 <a class="btn-choose-image">Chọn</a>
//                                 <input type="file" class="input-choose-image" hidden>                                
//                             </div>                            
//                         </div>
//                         <div class="col-6" >
//                             <div class="data-image" >                                
//                             </div>
//                         </div>                                                          
//                     </div>  
//                     <div class="box-design-sizes"> 
//                         <div class="line-margin-left-right-20">
//                             <div class="line">
//                                 <span class="item-title-design-size">"<input type="text" class="classify-size-rename input-create-info" title="Khóa kích cở tùy chỉnh" placeholder="Khóa kích cở tùy chỉnh">":</span>                                
//                                 <span class="item-count-size" title="Số lượng kích cở" >(<span class="count-size">1</span>)</span>
//                                 <button class="btn btn-outline-dark btn-add-size">
//                                     <svg style="margin-top:-5px!important; position:relative" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-plus-square-dotted" viewBox="0 0 16 16">
//                                         <path d="M2.5 0c-.166 0-.33.016-.487.048l.194.98A1.51 1.51 0 0 1 2.5 1h.458V0H2.5zm2.292 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zm1.833 0h-.916v1h.916V0zm1.834 0h-.917v1h.917V0zm1.833 0h-.917v1h.917V0zM13.5 0h-.458v1h.458c.1 0 .199.01.293.029l.194-.981A2.51 2.51 0 0 0 13.5 0zm2.079 1.11a2.511 2.511 0 0 0-.69-.689l-.556.831c.164.11.305.251.415.415l.83-.556zM1.11.421a2.511 2.511 0 0 0-.689.69l.831.556c.11-.164.251-.305.415-.415L1.11.422zM16 2.5c0-.166-.016-.33-.048-.487l-.98.194c.018.094.028.192.028.293v.458h1V2.5zM.048 2.013A2.51 2.51 0 0 0 0 2.5v.458h1V2.5c0-.1.01-.199.029-.293l-.981-.194zM0 3.875v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 5.708v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zM0 7.542v.916h1v-.916H0zm15 .916h1v-.916h-1v.916zM0 9.375v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .916v.917h1v-.917H0zm16 .917v-.917h-1v.917h1zm-16 .917v.458c0 .166.016.33.048.487l.98-.194A1.51 1.51 0 0 1 1 13.5v-.458H0zm16 .458v-.458h-1v.458c0 .1-.01.199-.029.293l.981.194c.032-.158.048-.32.048-.487zM.421 14.89c.183.272.417.506.69.689l.556-.831a1.51 1.51 0 0 1-.415-.415l-.83.556zm14.469.689c.272-.183.506-.417.689-.69l-.831-.556c-.11.164-.251.305-.415.415l.556.83zm-12.877.373c.158.032.32.048.487.048h.458v-1H2.5c-.1 0-.199-.01-.293-.029l-.194.981zM13.5 16c.166 0 .33-.016.487-.048l-.194-.98A1.51 1.51 0 0 1 13.5 15h-.458v1h.458zm-9.625 0h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zm1.834-1v1h.916v-1h-.916zm1.833 1h.917v-1h-.917v1zm1.833 0h.917v-1h-.917v1zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z" />
//                                     </svg>
//                                     "<span class="title-size-rename">Kích cở</span>" mới
//                                 </button>
//                             </div>
//                         </div>                                                                                                                        
//                         <div class="padding-left-right"><div class="box-size"></div></div>
//                     </div>                                        
//                 </div>
//             </div>`
    
//     let box_classify = $(s);    
//     let classify_size_rename = box_classify.find(".classify-size-rename");    
//     let title_size_rename = box_classify.find(".title-size-rename");   
//     let item_remove_box_classify = box_classify.find(".item-remove-box-classify"); 
//     item_remove_box_classify.click(function(){
//         let count = parseInt(count_classify.text());
//         if(count>1)
//         {
//             count_classify.text(count-1);
//             box_classify.remove()        
//         }                
//         else
//         handleCreateToast("info","Phải có ít nhất 1 phân loại khi bạn bật tính năng tạo phân loại","info-classify");
//     })
    
//     createEventSelect(classify_size_rename);
//     classify_size_rename.blur(function(){
//         let key = classify_size_rename.val() != "" ? classify_size_rename.val() : key_size;
//         $(box_classify).find(".input-size-name").each(function(){
//             $(this).attr('placeholder',`Tên ${key}`)
//         })
//         title_size_rename.text(key);
//     })     
//     let box_design_sizes = box_classify.find(".box-design-sizes");
//     let input_classify_price = box_classify.find(".input-classify-price");
//     let input_classify_quantity = box_classify.find(".input-classify-quantity");    
//     let classify_message_price = box_classify.find(".classify-message-price")       
//     let classify_message_quantity = box_classify.find(".classify-message-quantity")       
//     let input_checkbox_design_size = box_classify.find(".input-checkbox-design-size")       
//     input_checkbox_design_size.on("change",function(){ 
//         input_classify_price_value.blur();     
//         input_classify_price.blur()
//         box_design_sizes.slideToggle();        
//         if($(this).is(":checked"))
//         {
//             input_classify_quantity.hide();
            
//             input_classify_price.removeClass("col-md-6 col-lg-6");
//             input_classify_price.addClass("col-12");                          
//             fideInInputKeySize()
//         }
//         else
//         {
//             setTimeout(function(){
//                 input_classify_quantity.slideDown();
//             },300); 
//             if($(".input-checkbox-design-size:checked").length == 0)
//             {
//                 $("#item-input-design-key-size").hide()   
//                 $("#item-input-design-key-classify").addClass("col-12");
//                 $("#item-input-design-key-classify").removeClass("col-md-6");             
//             }
//             input_classify_price.addClass("col-md-6 col-lg-6");
//         }
//     })
//     let message_classify_name  = box_classify.find(".message-classify-name ");  
//     box_classify.find(".input-classify-name").on("blur",function(){
//         checkValidateClassifyName($(this),message_classify_name)        
//     })
//     let input_classify_price_value = box_classify.find(".input-classify-price-value")
//     let input_classify_quantity_value = box_classify.find(".input-classify-quantity-value")

    
//     createInputNumber(input_classify_price_value,1,9999999999);
//     createInputNumber(input_classify_quantity_value,0,9999999999);

//     input_classify_price_value.blur(function(){
//         if(input_checkbox_design_size.is(":checked"))
//         {
//             if($(this).val()=="" && input_create_price_all.val()=="")
//             {
//                 if(!checkPriceBoxSizeDetailsList(box_classify))
//                     classify_message_price.text("Trường hợp này giá bán không được để trống")                         
//                 else
//                 {
//                     classify_message_price.text("")                
//                 }
//             }
//             else 
//             {
//                 checkPriceBoxSizeDetailsList(box_classify,true)            
//                 classify_message_price.text("")      

//             }s
//         }
//         else
//         {
//             if($(this).val()=="")
//                 classify_message_price.text("Giá bán không được để trống")
//             else
//                 classify_message_price.text("") 
//         }  
//         if($(this).val()!="")
//         {                        
//             let classify_message_price_list = $(".classify-message-price");
//             for(var item_classify_message_price of classify_message_price_list)            
//                 if($(item_classify_message_price).text()!="")
//                     return;   
//             messageSizeHide(message_price_all,input_create_price_all)         
//         }      
//     })
    

//     createEventInputNotImptyCustom(input_classify_quantity_value,classify_message_quantity,mes_quantity);

//     let box_size = box_classify.find(".box-size");
//     let count_size = box_classify.find(".count-size");    
//     box_size.append(createBoxSize(box_classify));
//     box_classify.find(".btn-add-size").click(function(){
//         box_size.append(createBoxSize(box_classify));
//         count_size.text(parseInt(count_size.text())+1);
//     })
    
//     let box_add_image_classify = box_classify.find(".box-add-image")
//     let btn_choose_image_classify = box_classify.find(".btn-choose-image")
//     let title_choose_image_classify = box_classify.find(".title-choose-image")
//     let input_choose_image_classify = box_classify.find(".input-choose-image")
//     let data_image = box_classify.find(".data-image")

//     createEventClickChooseImage(btn_choose_image_classify,input_choose_image_classify)
//     createEventDragoverImage(box_add_image_classify,title_choose_image_classify)
//     createEventDragleaveImage(box_add_image_classify,title_choose_image_classify)
//     box_add_image_classify.on('drop', function (ev) {
//         ev.preventDefault();
//         const files = ev.originalEvent.dataTransfer.files;
//         showFileImageClassify(files,input_choose_image_classify,title_choose_image_classify,data_image)
//     })

//     input_choose_image_classify.on("change",function(ev){
//         showFileImageClassify(this.files,input_choose_image_classify,title_choose_image_classify,data_image)
//     })

//     return box_classify;
// }

// var checkValidateClassifyName = (element,message_classify_name)=>{
//     if(element.val()=="")
//     {
//         message_classify_name.slideDown();
//         element.addClass("border-name-red");
//         return false;
//     }
//     else
//     {
//         element.removeClass("border-name-red");
//         message_classify_name.slideUp();
//         return true;
//     }
// }


// var checkPriceBoxSizeDetailsList = (box_classify,chk_classify_price = false)=>{
//     let box_size_details_list = box_classify.find(".box-size-details");
//     let chk = true;
//     for(var box_size_details of box_size_details_list)
//     {
//         let input_size_price = $(box_size_details).find(".input-size-price"); 
//         let message_size_price = $(box_size_details).find(".message-size-price"); 
//         if(input_size_price.val()=="")
//         {
//             if(!chk_classify_price)
//             {
//                 messageSizeShow(message_size_price,"Giá không được để trống",input_size_price)                
//                 chk = false;
//             }
//             else
//             {
//                 messageSizeHide(message_size_price,input_size_price)               
//             }
//         }
//     }
//     return chk;
// }


// $("#box-design-classify").append(createBoxClassify(i++));
// let input_design_key_classify = $(".input-design-key-classify")
// let input_design_key_size = $(".input-design-key-size")
// createEventSelect(input_design_key_classify);
// input_design_key_classify.blur(function(){    
//     key_classify = $(this).val() != "" ? $(this).val() : `Phân loại`;
//     $(".input-classify-name").each(function(){
//         $(this).attr('placeholder',`Tên ${key_classify}`)
//     })    
// });
// createEventSelect(input_design_key_size);
// input_design_key_size.blur(function(){
//     key_size = $(this).val() != "" ? $(this).val() : `Kích cở`;
//     let box_classify_list = $(".box-classify")
//     for(box_classify of box_classify_list)
//     {   
//         let classify_size_rename = $(box_classify).find(".classify-size-rename")
//         let size_rename = $(box_classify).find(".size-rename")
//         let title_size_rename = $(box_classify).find(".title-size-rename");        
//         if(classify_size_rename.val()=="")
//         {            
//             title_size_rename.text(key_size);                                    
//             $(box_classify).find(".input-size-name").each(function(){
//                 $(this).attr('placeholder',`Tên ${key_size}`)
//             })
//         }
//         classify_size_rename.attr('title',`Khóa ${key_size} tùy chỉnh`)
//         classify_size_rename.attr('placeholder',`Khóa ${key_size} tùy chỉnh`)
//         size_rename.text(key_size);
//     }
// })
// createInputNumber(input_create_price_all,1,9999999999);




// //sử lí add images:
// var max_image = 20;
// var count_image = 0;
// var id_image = 0;
// var images = {};
// const btn_choose_image = $("#btn-choose-image");
// const title_choose_image = $("#title-choose-image");
// const input_choose_image = $("#input-choose-image");
// const box_add_image = $("#box-add-image");
// const list_data_image = $("#list-data-image")

// // btn_choose_image.click(function(){
// //     input_choose_image.click()
// // })
// // box_add_image.on('dragover', function (envent) {
// //     envent.preventDefault();
// //     title_choose_image.text("Thả để tải ảnh lên")
// // })
// // box_add_image.on('dragleave', function (envent) {
// //     envent.preventDefault();
// //     title_choose_image.text("Kéo và thả để tải ảnh lên")
// // })
// createEventClickChooseImage(btn_choose_image,input_choose_image)
// createEventDragoverImage(box_add_image,title_choose_image)
// createEventDragleaveImage(box_add_image,title_choose_image)



// box_add_image.on('drop', function (ev) {
//     ev.preventDefault();
//     const files = ev.originalEvent.dataTransfer.files;
//     loadFileImages(files)
// })

// input_choose_image.on("change",function(ev){
//     loadFileImages(this.files);
// })



// var loadFileImages = (files)=>{
//     // if(files.length + images.length > max_image)
//     // {
//     //     handleCreateToast("info","Số lượng ảnh vượt quá quy định (tối đa 20 ảnh)!!!","info-images")
//     //     return;
//     // }
//     for(var file of files)
//         showFileImage(file);
//     console.log(images);
// }

// // function createInputFile(files)
// // {
// //     const newInput = document.createElement("input");
// //     newInput.type = "file";                            
// //     newInput.className = "input-file-image";                            
// //     newInput.files = files;
// //     newInput.files = files;    
// //     newInput = $(newInput);
// //     list_data_image.append(newInput);
// // }


// var createEventConvertCoverImage = (cover_image,img,box_cover_image,file)=>{

//     cover_image.click(function(){  
//         let img_old = $("#cover-image")                                              
//         let box_cover_image_old = img_old.find(".box-cover-image");
//         let cover_image_old = $(`<div class="cover-image convert-cover-image">
//                                     <span class="title-cover-image">Đặt làm ảnh bìa</span> 
//                                 </div>`)
//         createEventConvertCoverImage(cover_image_old,img_old,box_cover_image_old,images["cover-image"])
//         box_cover_image_old.html("")
//         box_cover_image_old.append(cover_image_old)

//         let file_name = img_old.data("file-name");
//         img_old.attr("id",file_name)
//         images[file_name] = images["cover-image"];
//         images["cover-image"] = file;
//         img.attr("id","cover-image")
//         box_cover_image.html(`<div class="cover-image">
//                                 <span class="title-cover-image">Ảnh bìa</span>        
//                             </div>`)
        
//     })
// }

// function showFileImage(file) {            
//     const fileType = file.type;
//     const validExtensions = ['image/jpeg', 'image/jpg', 'image/png'];
//     if (validExtensions.includes(fileType)) {
//         const fileReader = new FileReader();
//         fileReader.onload = function () {  
//             if(images[file.name] || (images["cover-image"] && images["cover-image"].name == file.name))
//                     return;
//             if(count_image+1<=max_image)
//             {
//                 count_image++;
//                 const fileUrl = fileReader.result;                                
//                 let img = $(`<div class="image" id="${file.name}" style="background: url(${fileUrl}); background-size:cover ">
//                                 <div class="item-remove-image"  title="Click vào đây để xóa cái ảnh này">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
//                                     </svg>                                                                  
//                                 </div>
//                                 <div class="box-cover-image">

//                                 </div>                                
//                             </div>`); 
//                 img.data("file-name",file.name);  
//                 let box_cover_image = img.find(".box-cover-image");
//                 let cover_image = $(`<div class="cover-image">                                            
//                                     </div>`)
//                 if(count_image == 1)
//                 {
//                     img.attr("id","cover-image");                    
//                     cover_image.append($(`<span class="title-cover-image">Ảnh bìa</span>`))                    
//                 }       
//                 else
//                 {
//                     cover_image.addClass("convert-cover-image")
//                     cover_image.append($(`<span class="title-cover-image">Đặt làm ảnh bìa</span>`)) 
//                     createEventConvertCoverImage(cover_image,img,box_cover_image,file)
//                 }                                                                   
//                 box_cover_image.append(cover_image);
//                 img.find(".item-remove-image").click(function(){
//                     let id = img.attr("id")
//                     if( id == "cover-image")                    
//                         $($(".convert-cover-image")[0]).click();                    
//                     delete images[id];
//                     img.remove();
//                     count_image--;
//                 })              
//                 list_data_image.append(img); 
//                 images[img.attr("id")] = file;
//                 $("#error-validate-image").slideUp()
//             } 
//             else
//             {
//                 handleCreateToast("error","Số lượng ảnh vượt quá quy định (tối đa 20 ảnh)!!!","error-images")
//                 return;
//             }                                                                                   
//         }
//         fileReader.readAsDataURL(file);          
//     } else {
//         handleCreateToast("error","Không đúng định dạng hình ảnh!!!","error-images-2")        
//     }
//     title_choose_image.text("Chọn hoặc kéo thả ảnh vào đây")
// }

// //<img  src="${URL_HOST}FE/img/core-img/icon-delete.svg" alt="Click vào đây để xóa ảnh này">


// //xử lí video

// const btn_choose_video = $("#btn-choose-video");
// const title_choose_video = $("#title-choose-video");
// const input_choose_video = $("#input-choose-video");
// const box_add_video = $("#box-add-video");
// var video = null;
// //const video_show = $("#video-show");
// //const video_show_source = $("#video-show-source");



// btn_choose_video.click(function(){
//     input_choose_video.click()
// })
// box_add_video.on('dragover', function (envent) {
//     envent.preventDefault();
//     title_choose_video.text("Thả để tải video lên")
// })
// box_add_video.on('dragleave', function (envent) {
//     envent.preventDefault();
//     title_choose_video.text("Kéo và thả để tải video lên")
// })
// box_add_video.on('drop', function (envent) {
//     envent.preventDefault();
//     const files = envent.originalEvent.dataTransfer.files;
//     for(var file of files)
//         showFileVideo(file);    
// })

// input_choose_video.on("change",function(){
//     const file = this.files[0];
//     showFileVideo(file);                               
// })



// function showFileVideo(file)
// {
//     const fileType = file.type; 
//     if(file.size/1048576>5)
//     {
//         input_choose_video.val("");
//         return handleCreateToast("error","Chỉ được chọn video dưới 5MB","error-video-1") 
//     }
//     const validVideoExtensions = ['video/mp4', 'video/mpeg', 'video/ogg', 'video/webm'];
//     if (validVideoExtensions.includes(fileType)) {
//         const videoURL = URL.createObjectURL(file);        
//         let box_video = $(`<div id="box-video">
//                                 <video class="video" id="video-show" controls>
//                                     <source id="video-show-source" src="${videoURL}" type="video/mp4" autoplay>
//                                 </video>
//                                 <div class="item-remove-video" title="click vào đây để xóa cái video này">
//                                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
//                                     </svg>
//                                 </div>
//                             </div>`)  
//         box_video.find(".item-remove-video").click(function(){
//             box_video.remove();
//             video = null;
//         })  
//         box_video.data("video-name",file.name) 
//         video = file                      
//         $("#data-video").html(box_video)
//     } else {
//         handleCreateToast("error","Không đúng định dạng video!","error-video-2")        
//     }
//     title_choose_video.text("Chọn hoặc kéo thả video vào đây")
    
// }

// var createProductInfoDetails = ()=>{
//     var s =`<div class="box-product-input-details row">
//                 <div class="col-md-6 box-input-create-info-details">
//                     <input class="input-create-info input-create-info-details input-create-info-details-key" type="text" placeholder="Tên thuộc tính">
//                     <span class="message-validate-info-details message-validate-info-details-key"></span>
//                 </div>                    
//                 <div class="col-md-6 box-input-create-info-details">
//                     <input class="input-create-info input-create-info-details input-create-info-details-value" type="text" placeholder="Giá trị">
//                     <span class="message-validate-info-details message-validate-info-details-value"></span>
//                 </div> 
//                 <div class="item-remove-product-details" title="click vào đây để xóa cái thuộc tính này này">
//                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
//                         <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
//                     </svg>
//                 </div> 
//             </div>   `    
//     let product_info_detail = $(s);
//     let input_create_info_details_key = product_info_detail.find(".input-create-info-details-key");
//     let message_validate_info_details_key = product_info_detail.find(".message-validate-info-details-key");
//     let input_create_info_details_value = product_info_detail.find(".input-create-info-details-value");
//     let message_validate_info_details_value = product_info_detail.find(".message-validate-info-details-value");    
//     input_create_info_details_key.blur(function(){
//         createEventInputNotImptyCustom(input_create_info_details_key,message_validate_info_details_key,mes_product_details_key);
//         createEventInputNotImptyCustom(input_create_info_details_value,message_validate_info_details_value,mes_product_details_value);

//     });
//     let item_remove_product_details = product_info_detail.find(".item-remove-product-details");
//     item_remove_product_details.click(function(){
//         let count_info_details = parseInt(count_product_info_details.text());
//         if(count_info_details==1)
//             return handleCreateToast("info","Phải có ít nhất một chi tiết sản phẩm","info-product-info=details");
//         product_info_detail.remove();
//         count_product_info_details.text(count_info_details-1);
//     })
//     return product_info_detail;
// }

// const count_product_info_details = $("#count-product-info-details")
// var addItemProductInfoDetails = () =>{
//     $("#box-create-product-details").append(createProductInfoDetails());
//     count_product_info_details.text(parseInt(count_product_info_details.text())+1);
// }
// $("#btn-add-details-product").click(function(){
//     addItemProductInfoDetails();
// })

// addItemProductInfoDetails();

// var checkCountImage = ()=>{
//     console.log(images)
//     if(Object.keys(images).length == 0)
//     {
//         $("#error-validate-image").slideDown();
//         return false;
//     }
//     else
//         $("#error-validate-image").slideUp();
//     return true;
    
// }





// const input_create_product_discount_start_day = $("#input-create-product-discount-start-day");
// const input_create_product_discount_end_day = $("#input-create-product-discount-end-day");
// const input_create_product_discount_ratio = $("#input-create-product-discount-ratio");
// const input_create_product_discount_limited_quantity = $("#input-create-product-discount-limited-quantity");
// const message_product_discount_limited_quantity = $("#message-product-discount-limited-quantity");
// const message_product_discount_limited_ratio = $("#message-product-discount-limited-ratio");

// const check_create_discount = $("#check-create-discount");
// var disabledInputDiscount = (chk)=>{
//     input_create_product_discount_start_day.attr("disabled",chk)
//     input_create_product_discount_end_day.attr("disabled",chk)
//     input_create_product_discount_ratio.attr("disabled",chk)
//     input_create_product_discount_limited_quantity.attr("disabled",chk)
// }
// check_create_discount.on("change",function(){
//     disabledInputDiscount(!$(this).is(":checked"));  
// })
// const message_product_discount_start_day = $('#message-product-discount-start-day');
// const message_product_discount_end_day = $('#message-product-discount-end-day');

// input_create_product_discount_start_day.blur(function(){
//     checkVaidateProductSaleTime();
// })
// input_create_product_discount_end_day.blur(function(){
//     checkVaidateProductSaleTime();
// })


// var checkVaidateProductSaleTime = ()=>{
//     var startDay = new Date(input_create_product_discount_start_day.val())    
//     var endDay = new Date(input_create_product_discount_end_day.val())  
//     if(startDay<TODAY)    
//     {
//         messageSizeShow(message_product_discount_start_day,"Ngày bắt đầu không được nhỏ hơn ngày hiện tại!",input_create_product_discount_start_day); 
//         messageSizeHide(message_product_discount_end_day,input_create_product_discount_end_day)               
//     }
//     else if(endDay == "Invalid Date")    
//     {
//         messageSizeShow(message_product_discount_end_day,"Vui lòng chọn ngày kết thúc!",input_create_product_discount_end_day); 
//         messageSizeHide(message_product_discount_start_day,input_create_product_discount_start_day)
//     }
//     else if(endDay <= TODAY)
//     {
//         messageSizeShow(message_product_discount_end_day,"Ngày kết thúc không được nhỏ hơn ngày hiện tại!",input_create_product_discount_end_day); 
//         messageSizeHide(message_product_discount_start_day,input_create_product_discount_start_day)
//     }
//     else if(startDay>=endDay)
//     {
//         messageSizeShow(message_product_discount_end_day,"Ngày kết thúc phải lớn hơn ngày hiện tại",input_create_product_discount_end_day); 
//         messageSizeShow(message_product_discount_start_day,"Ngày bắt đầu phải nhỏ hơn ngày kết thúc",input_create_product_discount_start_day);          
//     }
//     else
//     {
//         messageSizeHide(message_product_discount_start_day,input_create_product_discount_start_day)
//         messageSizeHide(message_product_discount_end_day,input_create_product_discount_end_day)
//         return true;
//     }
//     return false;
// }
// createInputNumber(input_create_product_discount_ratio,1,100)
// createInputNumber(input_create_product_discount_limited_quantity,1,999999999)
// createEventInputNotImptyCustom(input_create_product_discount_ratio,message_product_discount_limited_ratio,mes_product_discount_ratio)
// createEventInputNotImptyCustom(input_create_product_discount_limited_quantity,message_product_discount_limited_quantity,mes_product_discount_limited_quantity)


// $("#btn-submit-add-product").click(function(){    
//     let chk_validate = [checkPriceAll(),
//                         checkCountImage(),                       
//                         checkInputNotImptyCusTom(input_create_product_name,message_product_name_all,mes_product_name_value)]                        
//     const item_selects = $(".item-select");
//     const san_pham = {
//         "ten_san_pham":input_create_product_name.val(),
//         "danh_muc_id":$(item_selects[item_selects.length-1]).val(),                
//     };
//     if(input_create_price_all.val()!="")
//         san_pham["gia_hien_tai"] = parseInt(input_create_price_all.val())
//     if(check_create_classify.is(":checked"))
//     {
//         if(input_design_key_classify.val()!="")
//             san_pham["doi_ten_phan_loai"] = input_design_key_classify.val();                
//         var phan_loais = new Array();
//         var box_classifys = $(".box-classify");
//         var chk_size = false;
//         for(var box_classify of box_classifys)
//         {
//             box_classify = $(box_classify);
//             var input_classify_name = box_classify.find(".input-classify-name");
//             var message_classify_name  = box_classify.find(".message-classify-name");
//             chk_validate.push(checkValidateClassifyName(input_classify_name,message_classify_name));

//             phan_loai={
//                 "ten_phan_loai":input_classify_name.val(),                        
//             }
//             let input_classify_price_value = box_classify.find(".input-classify-price-value");  

//             let input_checkbox_design_size = box_classify.find(".input-checkbox-design-size");
//             let image = box_classify.find(".image");
//             if(image.length)
//                 phan_loai["anh_phan_loai"] = image.data("image-name");        
//             if(input_classify_price_value.val()!="")
//                 phan_loai["gia_hien_tai"] = parseInt(input_classify_price_value.val())
//             if(input_checkbox_design_size.is(":checked"))
//             {                        
//                 chk_size = true;                                                                                             
//                 var classify_size_rename = box_classify.find("classify-size-rename");
//                 if(classify_size_rename.val()!="")                        
//                     phan_loai["doi_ten_kich_co"] = classify_size_rename.val();                      

//                 var kich_co_phan_loais = new Array();   
//                 var box_size_details_list = box_classify.find(".box-size-details");
//                 for(var box_size_details of box_size_details_list)
//                 {
//                     box_size_details = $(box_size_details);
//                     let input_size_name = box_size_details.find(".input-size-name");  
//                     let message_size_name = box_size_details.find(".message-size-name");  
//                     chk_validate.push(checkInputNotImptyCusTom(input_size_name,message_size_name,mes_size_name))                                                                                  
//                     let input_size_quantity = box_size_details.find(".input-size-quantity");
//                     let message_size_quantity = box_size_details.find(".message-size-quantity");
//                     chk_validate.push(checkInputNotImptyCusTom(input_size_quantity,message_size_quantity,mes_quantity))  
//                     var kich_co = {
//                         "ten_kich_co":box_size_details.find(".input-size-name").val(),
//                         "so_luong_ton":parseInt(box_size_details.find(".input-size-quantity").val())
//                     }
//                     let input_size_price = box_size_details.find(".input-size-price");                    
//                     if(input_size_price.val()!="")
//                         kich_co["gia_hien_tai"] = parseInt(input_size_price.val())
//                     kich_co_phan_loais.push(kich_co)
//                 }
//                 phan_loai["kich_co_phan_loais"] = kich_co_phan_loais;
//             }
//             else
//             {
//                 let input_classify_quantity_value = box_classify.find(".input-classify-quantity-value");
//                 let classify_message_quantity = box_classify.find(".classify-message-quantity");   
//                 chk_validate.push(checkInputNotImptyCusTom(input_classify_quantity_value,classify_message_quantity,mes_quantity));
//                 phan_loai["so_luong_ton"] = parseInt(input_classify_quantity_value.val())
//             }  
//             phan_loais.push(phan_loai)                   
//         }                
//         san_pham["phan_loais"]=phan_loais;
//         if(chk_size && input_design_key_size.val()!="")                
//             san_pham["doi_ten_kich_co"] = input_design_key_size.val()                                
//     }
//     else
//     {
//         chk_validate.push(checkInputNotImptyCusTom(input_create_quantity_all,message_quantity_all,mes_product_quantity_value));
//         san_pham["so_luong_ton"] = parseInt(input_create_quantity_all.val());
//     }
            
//     var input_create_info_details_keys = $(".input-create-info-details-key");
//     var input_create_info_details_values = $(".input-create-info-details-value");
//     var message_validate_info_details_key = $(".message-validate-info-details-key");
//     var message_validate_info_details_value = $(".message-validate-info-details-value");
//     var thong_tin_chi_tiet = {};
//     for(var i = 0 ; i<input_create_info_details_keys.length ; i++)
//     {
//         chk_validate.push(checkInputNotImptyCusTom($(input_create_info_details_keys[i]),$(message_validate_info_details_key[i]),mes_product_details_key))
//         chk_validate.push(checkInputNotImptyCusTom($(input_create_info_details_values[i]),$(message_validate_info_details_value[i]),mes_product_details_value))        
//         thong_tin_chi_tiet[$(input_create_info_details_keys[i]).val()]=$(input_create_info_details_values[i]).val()
//     }
//     san_pham["thong_tin_chi_tiet"] = thong_tin_chi_tiet;
//     if(check_create_discount.is(":checked"))
//     {        
//         chk_validate.push(checkVaidateProductSaleTime());
//         chk_validate.push(checkInputNotImptyCusTom(input_create_product_discount_ratio,message_product_discount_limited_ratio,mes_product_discount_ratio))
//         chk_validate.push(checkInputNotImptyCusTom(input_create_product_discount_limited_quantity,message_product_discount_limited_quantity,mes_product_discount_limited_quantity))             
//         san_pham["giam_gia"] = parseInt(input_create_product_discount_ratio.val())/100;
//         san_pham["so_luong_gioi_han"] = parseInt(input_create_product_discount_limited_quantity.val());
//         san_pham["ngay_ket_thuc"]=input_create_product_discount_end_day.val()
//         if(input_create_product_discount_start_day.val()!="")
//             san_pham["ngay_bat_dau"] = input_create_product_discount_start_day.val();
//     }        
//     if(chk_validate.indexOf(false)==-1)        
//         showMessage("Thông báo","Xác nhận tạo sản phẩm",function(){ 

//             let file_name = images["cover-image"].name
//             san_pham["anh_bia"] = file_name; 
//             san_pham["anh_san_phams"] = Object.keys(images);  
//             san_pham["anh_san_phams"].push(file_name);
//             san_pham["anh_san_phams"].splice(san_pham["anh_san_phams"].indexOf("cover-image"),1);         
//             console.log(images);
//             var formData = new FormData();            
//             for(var key in images)            
//                 formData.append("images[]",images[key]);            
//             formData.append("san_pham", JSON.stringify(san_pham));                        
//             if(video!=null)
//                 formData.append("video",video);
//             $("#btn-submit-add-product").attr("disabled",true)
//             $.ajax({
//                 url: BASE_URL_API+PREFIX_STORE+PREFIX_PRODUCT+PREFIX_PRODUCT_CREATE,
//                 type: "POST",   
//                 data:formData,    
//                 contentType: false,
//                 processData: false,
//                 headers:{
//                     'X-CSRF-TOKEN':$('meta[name="csrf-token"]').attr('content') 
//                     }, 
//                 success: function (res) {  
//                     console.log(res)             
//                     if(res.success)
//                     {
//                         handleCreateToast("success","Thêm sản phẩm thành công");
//                         setTimeout(()=>location.reload(),2500);
//                     }
//                     else
//                     {
//                         handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại");                    
//                         $("#btn-submit-add-product").attr("disabled",false)
//                     }
//                 },
//                 error: function (xhr, status, error) {
//                     handleCreateToast("error","Đã xãy ra lỗi, vui lòng thử lại");                      
//                     if(xhr.status==404)
//                         $("body").html(error404());
//                 }
//             });           
//         });
//     else
//         handleCreateToast("error","Bạn chưa cập nhật đủ dữ liệu, vui lòng xem lại","error-validate-all")
// })
// $("#menu-product-create").addClass("active")
// $("#menu-product").addClass("active")