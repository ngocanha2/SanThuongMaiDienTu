$(()=>{
    const Loc = document.getElementById('Loc')
    const SelectSp = document.getElementById('select-sp')
    const listSanPham = document.getElementById('listSanPham')
    const formCheckInput = document.querySelectorAll('.form-check-input');
    const btnSubmit = $("#btn-submit");
    const startTime = $("#NgayBatDau")
    const endTime = $("#NgayKetThuc")
    const errorValidate = $("#error-validate")
    const checkProduct = $("#SanPham")
    btnSubmit.click(()=>{
        let start = new Date(startTime.val());
        if(start == "Invalid Date")
        {
            handleCreateToast("error","Vui lòng chọn thời gian bắt đầu","error-starttime",true)
            errorValidate.text("Vui lòng chọn thời gian bắt đầu")
            return 
        }
        let end = new Date(endTime.val());
        if(end == "Invalid Date")
        {
            errorValidate.text("Vui lòng chọn thời gian kết thúc")
            return handleCreateToast("error","Vui lòng chọn thời gian kết thúc","error-endtime",true)
        }
        if(start>end)
        {
            errorValidate.text("Ngày kết thúc phải sau ngày bắt đầu")
            return handleCreateToast("error","Ngày kết thúc phải sau ngày bắt đầu","error-endtime-2",true)
        }
        errorValidate.text("")
        let san_pham_id = checkProduct.is(":checked") ? $(SelectSp).val() : null
        loadData(san_pham_id,startTime.val(),endTime.val())
    })

    for (var i = 0; i < formCheckInput.length; i++) {
        formCheckInput[i].addEventListener('click', function () {
            let uncheck = document.querySelector('.form-check-input.bg-info');
            if (this.checked == true) {
        this.classList.add('bg-info')
                if (this.value == 3) {
            listSanPham.style.display = 'block'
                    Loc.classList.add('col-8');
        }
        else {
            listSanPham.style.display = 'none'
                    Loc.classList.remove('col-8');
            SelectSp.selectedIndex = 0;
        }
        uncheck.checked = false;
        uncheck.classList.remove('bg-info')
            }
            else
                if (uncheck == this) {
            this.checked = true;
            return;
            }
        });
    }    
    new CallApi(PREFIX_STORE+PREFIX_PRODUCT+PREFIX_PRODUCT_ALL)
        .all((res)=>{
            console.log(res)
            res.data.forEach(item => {
                $(SelectSp).append(`<option class="option" value="${JsonParseStr(item._id)}">${item.ten_san_pham}</option>`)
            });
        },(res)=>{

        })
    const api = new CallApi(PREFIX_STORE+PREEFIX_STATISTICAL);
    const loadData = (san_pham_id,ngay_bat_dau,ngay_ket_thuc)=>{
        $("#myfirstchart").html("")
        api.all((res)=>{
            console.log(res)            
            new Morris.Line({
                element: 'myfirstchart',
                // tô màu cho line
                lineColors: ['#ffc107', '#0dcaf0', '#dc3545'],
                /*        goalLineColors: ['#dc3545', '#0dcaf0'],*/
                //tô màu cho điểm
                //pointFillColors: ['#0dcaf0', '#ffc107','#dc3545'],
                //màu sắc điểm chuỗi
                /*pointStrokeColors: ['#212529', '#ffc107','#dc3545'],*/
                fillOpacity: 0.3,
                hideHover: 'auto',
                gridTextSize: 15,
                barColors: ['#0dcaf0', '#212529', '#ffc107', '#dc3545'],
                praseTime: false,
                resize: true,
                colors: ['#0dcaf0', '#212529', '#ffc107', '#dc3545'],
                data: res.data.data,
                // data: [
                //    { day: '2008', 'Lượt truy cập': 32, 'Sản phẩm': 20, 'Cửa hàng': 12 },
                //    { day: '2009', 'Lượt truy cập': 32, 'Sản phẩm': 10, 'Cửa hàng': 23 },
                //    { day: '2010', 'Lượt truy cập': 1, 'Sản phẩm': 19, 'Cửa hàng': 9 },
                //    { day: '2011', 'Lượt truy cập': 3, 'Sản phẩm': 5, 'Cửa hàng': 12 },
                //    { day: '2012', 'Lượt truy cập': 39, 'Sản phẩm': 20, 'Cửa hàng': 11 }
                // ],
                xkey: res.data.loaimoc,        
                ykeys: ['Lượt truy cập', 'Sản phẩm', 'Cửa hàng'],
                labels: ['Lượt truy cập', 'Sản phẩm', 'Cửa hàng']
            });
        },(res)=>{
            console.log(res)
        },{
            san_pham_id:san_pham_id,
            ngay_bat_dau:ngay_bat_dau,
            ngay_ket_thuc:ngay_ket_thuc
        })
    }    
    loadData()
})