// var tinh = document.getElementById("province");
// var provinceValue = districtValue = wardValue = null;
// if (tinh != null) {
//     var quan = document.getElementById("district");
//     var xa = document.getElementById("ward");
//     provinceValue = tinh.value;
//     districtValue = quan.value;
//     wardValue = xa.value;
// }
// const host_address = "https://provinces.open-api.vn/api/";
// var callApiProvince = (url) => {
//     $.ajax({
//         url: host_address + url,
//         type: 'GET',                    
//         success: function (res) {                                                 
//             renderDataShow(res, "province", provinceValue);
//             callApiDistrict("p/" + $("#province").val() + "?depth=2");                                              
//         }        
//     });  
// }
// var callApiDistrict = (url) => {
//     $.ajax({
//         url: host_address + url,
//         type: 'GET',                    
//         success: function (res) {                                       
//             renderDataShow(res.districts, "district", districtValue);
//             callApiWard("d/" + $("#district").val() + "?depth=2");                                              
//         }        
//     }); 
// }
// var callApiWard = (url) => {
//     $.ajax({
//         url: host_address + url,
//         type: 'GET',                    
//         success: function (res) {                                       
//             renderDataShow(res.wards, "ward", wardValue);
//             //provinceValue = districtValue = wardValue = null;                                              
//         }        
//     });    
// }

// var renderDataShow = (array, select, value = undefined) => {
//     let rows = '<option value=""> Chọn </option>';    
//     if (array != null)
//         array.forEach(element => {
//                 rows += `<option ${element.name == value ? "selected" : ""} value="${element.code}">${element.name}</option>`
//         });
//     document.querySelector("#" + select).innerHTML = rows
//     if(select == 'district' && value != undefined)        
//         callApiWard("d/" + $("#district").val() + "?depth=2");                
// }
// callApiProvince('?depth=1');
// $("#province").change(() => {    
//     callApiDistrict("p/" + $("#province").val() + "?depth=2");    
//     $("#result-address").val()
// });
// $("#district").change(() => {
//     callApiWard("d/" + $("#district").val() + "?depth=2");
//     $("#result-address").val()
// });
// $("#ward").change(() => {
//     printResult();
// })
// var printResult = () => {
//     if ($("#ward").val() != "") {
//         let s = $("#ward option:selected").text() + ", "
//             + $("#district option:selected").text() + ", "
//             + $("#province option:selected").text();
//         $("#result-address").val(s)
//         console.log(s)
//     }

// }


////https://vn-public-apis.fpo.vn/provinces/getAll?limit=-1
////https://vn-public-apis.fpo.vn/districts/getByProvince?provinceCode=72&limit=-1
////https://vn-public-apis.fpo.vn/wards/getByDistrict?districtCode=712&limit=-1


var tinh = document.getElementById("province");
var provinceValue = districtValue = wardValue = null;
if (tinh != null) {
    var quan = document.getElementById("district");
    var xa = document.getElementById("ward");
    provinceValue = tinh.value;
    districtValue = quan.value;
    wardValue = xa.value;
}
// const host_address = "https://provinces.open-api.vn/api/";
// const host_address = "https://vn-public-apis.fpo.vn/";
const host_address = "https://online-gateway.ghn.vn/shiip/public-api/master-data/";
var callApiProvince = (url) => {
    $.ajax({
        url: host_address + url,
        type: 'GET',
        headers:{
            'token':'407e57c5-d91b-11ee-a2c1-ca2feb4b63fa' 
            },                    
        success: function (res) {                                                 
            renderDataShow(res.data, "province", provinceValue,"ProvinceID","ProvinceName");
            // callApiDistrict("district?province_id=" + $("#province").val());                                              
        }        
    });  
}
var callApiDistrict = (url) => {
    $.ajax({
        url: host_address + url,
        type: 'GET',
        headers:{
            'token':'407e57c5-d91b-11ee-a2c1-ca2feb4b63fa' 
            },                         
        success: function (res) {   
                                             
            renderDataShow(res.data, "district", districtValue,"DistrictID","DistrictName");
            // callApiWard("ward?district_id=" + $("#district").val());                                              
        }        
    }); 
}
var callApiWard = (url) => {
    $.ajax({
        url: host_address + url,
        type: 'GET',
        headers:{
            'token':'407e57c5-d91b-11ee-a2c1-ca2feb4b63fa' 
            },                         
        success: function (res) {                                       
            renderDataShow(res.data, "ward", wardValue,"WardID","WardName");
            //provinceValue = districtValue = wardValue = null;                                              
        }        
    });    
}

var renderDataShow = (array, select, value = undefined,paramId,paramName) => {
    console.log(array)
    let rows = '<option value=""> Chọn </option>';    
    if (array != null)
        array.forEach(element => {
                rows += `<option ${element[paramName] == value ? "selected" : ""} value="${element[paramId]}">${element[paramName]}</option>`
        });
    document.querySelector("#" + select).innerHTML = rows
    if(select == 'district' && value != undefined)        
        callApiWard("ward?district_id=" + $("#district").val());                
}
callApiProvince('province');
$("#province").change(() => { 
    if($("#province").val() == ""){
        $("#district").html('<option value=""> Chọn </option>')
        $("#ward").html('<option value=""> Chọn </option>')
        return;
    }
    callApiDistrict("district?province_id=" + $("#province").val());    
    $("#result-address").val()
});
$("#district").change(() => {
    if($("#district").val() == ""){
        $("#ward").html('<option value=""> Chọn </option>')
        return;
    }
    callApiWard("ward?district_id=" + $("#district").val());
    $("#result-address").val()
});
$("#ward").change(() => {
    printResult();
})
var printResult = () => {
    if ($("#ward").val() != "") {
        let s = $("#ward option:selected").text() + ", "
            + $("#district option:selected").text() + ", "
            + $("#province option:selected").text();
        $("#result-address").val(s)
        console.log(s)
    }

}
var selectedAddress = (id,name)=>{    
    var optionToSelect = $(`#${id} option`).filter(function() {
        return $(this).text() === name;
    });    
    optionToSelect.prop('selected', true);
    $(`#${id}`).trigger('change')
}