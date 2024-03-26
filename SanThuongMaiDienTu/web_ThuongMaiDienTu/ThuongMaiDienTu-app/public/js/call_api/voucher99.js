
var getAllVoucher = (cua_hang_id,func_success,status = null)=>{
    url =  BASE_URL_API + PREFIX_STORE+PREFIX_VOUCHER+PREFIX_VOUCHER_ALL +"/"+(cua_hang_id ?? "")+(status !=null ? ("?status="+status):"");    
    return GET(url,func_success);
}




var getAllVouchershopbee = (func_success)=>{
    GET(BASE_URL_API + PREFIX_VOUCHER_SHOBEE,func_success);
}

var getShopbeeVouchers = (func_success)=>{
    GET(BASE_URL_API + PREFIX_SHOPBEE_VOUCHERS,func_success);
}