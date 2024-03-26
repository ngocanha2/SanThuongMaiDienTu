use ThuongMaiDienTu;
db.nguoi_dung.insertOne({
    _id: ObjectId("64e585130a81481311402e00"),
    ten_dang_nhap:"datlvnttan",
    ho_ten:"Lê Phát Đạt",
    so_dien_thoai:"0387079343",
    email:"Datlvnttan@gmail.com",
    ngay_sinh: new Date("2002-04-24"),
    gioi_tinh:"Nam",
    mat_khau:"123",
    ngay_tao: new Date(),
    so_dia_chi:[
    {
        id:ObjectId(),
        ten_nguoi_nhan:"Lê Phát Đạt",
        dia_chi:"Tây Thạnh, Tân Phú, Hồ Chí Minh",
        dia_chi_cu_the:"53/19 Phạm Ngọc Thảo",
        so_dien_thoai:"0387079343",
        loai_dia_chi:"Nhà riêng"
    },
    {
        id:ObjectId(),
        ten_nguoi_nhan:"Lê Phát Đạt",
        dia_chi:"Bến tre",
        dia_chi_cu_the:"Số nhà 65",
        so_dien_thoai:"0387079343",
        loai_dia_chi:"Nhà riêng",
        mac_dinh:true
    }
    ],
    gio_hang:[
    {
        san_pham:{
            san_pham_id:ObjectId("64e5aa29b0028bed9fe92a98"),
            ten_phan_loai:"Bản 128GB",
        },
        so_luong:2                          
    },
    {
        san_pham:{
            san_pham_id:ObjectId("64e5aa29b0028bed9fe92a98"),
            ten_phan_loai:"Bản 256GB",
            ten_kich_co:"Like new 90%"        
        },
        so_luong:3                      
    },
    ],
    tuong_tacs:[
        {
            thoi_gian:new Date("2023-11-30"),            
            san_pham_id:ObjectId("64e5aa29b0028bed9fe92a98"),
            gia_thap_nhat: 120000,
            gia_cao_nhat: 220000, 
            danh_gia_hien_tai:1.2,
            so_luong_danh_gia_hien_tai:1,     
            giam_gia_hien_tai: 0.2,              
            luot_truy_cap_cua_hang_hien_tai:100
        },
        {
            thoi_gian:new Date("2023-11-30"),            
            san_pham_id:ObjectId("64e5aa29b0028bed9fe92a98"),
            gia_thap_nhat: 120000,
            gia_cao_nhat: 220000, 
            danh_gia_hien_tai:1.2,
            so_luong_danh_gia_hien_tai:1,     
            giam_gia_hien_tai: 0.2,              
            luot_truy_cap_cua_hang_hien_tai:100
        }
    ]                
})





db.nguoi_dung.insertOne({
    _id:ObjectId("64f2e403ae66307f58914da3"),
    ten_dang_nhap:"dat123",
    ho_ten:"Lê Phát Đạt",
    so_dien_thoai:"1234567890",
    email:"dat233@gmail.com",
    ngay_sinh: new Date("2002-04-24"),
    gioi_tinh:"Nam",
    mat_khau:"123",
    ngay_tao: new Date(),
})



db.nguoi_dung.insertOne({
    ten_dang_nhap:"dat111",
    ho_ten:"Lê LÊ LÊ",
    so_dien_thoai:"1234567899",
    email:"hihi@gmail.com",
    ngay_sinh: new Date("2002-04-24"),
    gioi_tinh:"Nam",
    mat_khau:"123",
    ngay_tao: new Date(),
    gio_hang:[
    {
        san_pham:{
            san_pham_id:ObjectId("64f2e5bbae66307f58914da5"),
            ten_phan_loai: 'To',
        },
        so_luong:2                          
    },   
    ]
})




db.nguoi_dung.update({'_id': ObjectId("64e585130a81481311402e00")},
{
    $addToSet: {
        gio_hang: {
            san_pham:{
            san_pham_id:ObjectId("64e5aa29b0028bed9fe92a98"),
            ten_phan_loai:"Bản 128GB",
        },
            so_luong:1 
        }
    },    
})



db.nguoi_dung.update(
{'_id': ObjectId("64e585130a81481311402e00"),
    'gio_hang': {
    $elemMatch: {
      'san_pham.san_pham_id':ObjectId("64e5aa29b0028bed9fe92a98"),
      'san_pham.ten_phan_loai': 'Bản 128GB'
    }
  }
},
{
    $set: {
    'gio_hang.$.so_luong': 10 
  }  
})





db.cua_hang.insertOne({
    nguoi_dung_id:ObjectId("64f2e403ae66307f58914da3"),
    ten_cua_hang:"Cửa hàng xịn",
    dia_chi:"Hồ Chí Minh",
    ngay_dang_ky:new Date(),
    so_dien_thoai:"1234567890",
    chu_ky:"hihi",
    luot_truy_cap:0,
    trang_thai_hoat_dong: true,
    khuyen_mais:[
    {
        ma_khuyen_mai:"okconde",
        ty_le_giam_gia:0.1,
        don_hang_toi_thieu:100000,
        so_luong:12,
        muc_giam_toi_da:50000,
        ngay_bat_dau: new Date(),
        ngay_ket_thuc: new Date("2023-09-23")
    },
    ]
})


db.cua_hang.insertOne({
    _id:ObjectId("64e58b05d91cecfb0f143089"),
    nguoi_dung_id:ObjectId("64e585130a81481311402e00"),
    ten_cua_hang:"Cửa hàng xin đẹp",
    dia_chi:"Hồ Chí Minh",
    ngay_dang_ky:new Date(),
    so_dien_thoai:"1234567890",
    chu_ky:"hihi",
    luot_truy_cap:0,
    trang_thai_hoat_dong: true,
    khuyen_mais:[
    {
        ma_khuyen_mai:"hihihi1",
        ty_le_giam_gia:0.1,
        don_hang_toi_thieu:100000,
        so_luong:12,
        muc_giam_toi_da:50000,
        ngay_bat_dau: new Date(),
        ngay_ket_thuc: new Date("2023-09-23")
    },
    {
        ma_khuyen_mai:"hihihi2",
        ty_le_giam_gia:0.3,
        don_hang_toi_thieu:9000000,
        so_luong:9,
        muc_giam_toi_da:500000,
        ngay_bat_dau: new Date(),
        ngay_ket_thuc: new Date("2023-09-23")
    },
    ]
})

db.danh_muc.insertMany([
    {
        _id:ObjectId("650561c2cadb32a9657ad23b"),
        ten_danh_muc:"Thiết bị điện tử",
    },    
    {
        _id:ObjectId("650561c2cadb32a9657ad23c"),
        ten_danh_muc:"Điện thoại"
    },
    {
        _id:ObjectId("650561c2cadb32a9657ad23d"), 
        ten_danh_muc:"Đồ gia dụng",
    }
    ])
    
    db.danh_muc.insertMany([
    {
        ten_danh_muc:"Laptop",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23b")
    },    
    {
        ten_danh_muc:"Samsung",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Apple",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Opple",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Hao wai",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Quạt hơi nước",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23d")
    },
    {
        ten_danh_muc:"Nồi nui soang chảo",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23d")
    },
    ])
    
    
    db.danh_muc.insertMany([
    {
        ten_danh_muc:"Flapship",
        danh_muc_cha_id:ObjectId("65056251cadb32a9657ad23f")
    },    
    {
        ten_danh_muc:"Tầm trung",
        danh_muc_cha_id:ObjectId("65056251cadb32a9657ad23f")
    },
    {
        ten_danh_muc:"Rẻ bèo",
        danh_muc_cha_id:ObjectId("65056251cadb32a9657ad23f")
    },
    ])
    
db.san_pham.insertOne({
    cua_hang_id: ObjectId("64f2e47bae66307f58914da4"),
    ten_san_pham: "Ổi trái bi",
    anh_bia: "oiioi.jpg",
    danh_muc_id: ObjectId('65056251cadb32a9657ad240'),
    mo_ta:"Ổi này bền lắm, xài 6 năm trời rồi chạy còn mượt vãi",
    thong_tin_chi_tiet:{
        "Ngang":"12",
        "Rộng":"32",
        "Nặng":"233g",
        "Màu sắc": "Xanh, đỏ",
    },
    danh_gia:1.2,
    so_luong_danh_gia:1,
    doi_ten_phan_loai: "Kích cở",
    doi_ten_kich_co:"Màu sắc",    
    gia_hien_tai:5000,
    phan_loais:[
        {
            ten_phan_loai:"To",
            so_luong_ton:42,
            gia_hien_tai:7000,            
        },  
        {
            ten_phan_loai:"Nhỏ",
            so_luong_ton:12,
            gia_hien_tai:3000,
            kich_co_phan_loais:[
            {
                ten_kich_co:"Màu đen",
                so_luong_ton:5,
            },
            {
                ten_kich_co:"Màu hồng",
                so_luong_ton:3,
                gia_hien_tai:2000
            },
            ]              
        },  
        {
            ten_phan_loai:"Vừa",   
            doi_ten_kich_co: "loại",
            kich_co_phan_loais:[
            {
                ten_kich_co:"Loại nữa trái",
                so_luong_ton:234,
                gia_hien_tai:1000
            },
            {
                ten_kich_co:"Cắn dở",
                so_luong_ton:99,
                gia_hien_tai:500
            },
            ]         
        }   
        ],
    giam_gia: 0.35 , 
    ngay_bat_dau: new Date("2023-09-01"),
    ngay_ket_thuc: new Date("2024-10-02"),
    so_luong_gioi_han:99,   
})




db.san_pham.insertOne({
    _id:ObjectId("64e5aa29b0028bed9fe92a98"),
    cua_hang_id: ObjectId("64e58b05d91cecfb0f143089"),
    ten_san_pham: "Samsung galaxy j7 pro",
    anh_bia: "samsungj7pro.jpg",
    danh_muc_id: ObjectId('65056251cadb32a9657ad23f'),
    mo_ta:"Điện thoại này bền lắm, xài 6 năm trời rồi chạy còn mượt vãi",
    thong_tin_chi_tiet:{
        "Màn hình":"Full HD",
        "Pin":"3650",
        "Nặng":"750g",
        "Kích thước":"750mm x 250mm",
        "Ram":"4GB"
    },
    danh_gia:1.2,
    so_luong_danh_gia:1,
    doi_ten_phan_loai: "Phiên bản",
    doi_ten_kich_co:"Hàng",    
    phan_loais:[
        {
            ten_phan_loai:"Bản 128GB",
            so_luong_ton:12,
            gia_hien_tai:7000000,            
        },  
        {
            ten_phan_loai:"Bản 256GB",   
            kich_co_phan_loais:[
            {
                ten_kich_co:"Like new 90%",
                so_luong_ton:5,
                gia_hien_tai:4000000
            },
            {
                ten_kich_co:"Like new 70%",
                so_luong_ton:3,
                gia_hien_tai:2000000
            },
            ]         
        }   
        ],
    giam_gia: 0.5 , 
    ngay_bat_dau: new Date("2023-08-02"),
    ngay_ket_thuc: new Date("2024-09-02"),
    so_luong_gioi_han:33,   
})




db.san_pham.insertOne({
    cua_hang_id: ObjectId("64e58b05d91cecfb0f143089"),
    ten_san_pham: "Khăn giấy",
    anh_bia: "khan_giay.jpg",
    danh_muc_id: ObjectId('65056251cadb32a9657ad23f'),
    mo_ta:"Khăn giấy này bền lắm, xài 6 năm trời rồi chạy còn mượt vãi",
    thong_tin_chi_tiet:{
       "cao":"cao"
    },
    so_luong_ton:99,
    gia_hien_tai:200000,
    danh_gia:1.2,
    so_luong_danh_gia:1,     
    giam_gia: 0.2 , 
    ngay_bat_dau: new Date("2023-08-02"),
    ngay_ket_thuc: new Date("2024-09-02"),
    so_luong_gioi_han:33,   
})


db.san_pham.insertMany([{
    cua_hang_id: ObjectId("64e58b05d91cecfb0f143089"),
    ten_san_pham: "Lap top gaming ",
    anh_bia: "laptop.jpg",
    danh_muc_id: ObjectId('65056251cadb32a9657ad23f'),
    mo_ta:"Laptop này bền lắm, xài 6 năm trời rồi chạy còn mượt vãi",
    thong_tin_chi_tiet:{
        "Màn hình":"Full HD",
        "Pin":"3650",
        "Nặng":"750g",
        "Kích thước":"750mm x 250mm",
        "Ram":"4GB"
    },
    danh_gia:1.2,
    so_luong_danh_gia:1,
    doi_ten_phan_loai: "Ram",
    doi_ten_kich_co:"Màu sắc",    
    phan_loais:[
        {
            ten_phan_loai:"12GB Ram",
            so_luong_ton:120,
            gia_hien_tai:12000000,            
        },  
        {
            ten_phan_loai:"64GB Ram",
            so_luong_ton:89,
            gia_hien_tai:29000000,            
        },
        {
            ten_phan_loai:"24GB Ram",   
            kich_co_phan_loais:[
            {
                ten_kich_co:"Đen",
                so_luong_ton:15,
                gia_hien_tai:10000000
            },
            {
                ten_kich_co:"Hồng like new 70%",
                so_luong_ton:99,
                gia_hien_tai:8000000
            },
            {
                ten_kich_co:"Hồng fullbox",
                so_luong_ton:45,
                gia_hien_tai:11000000
            },
            ]         
        }   
        ],
     giam_gia: 0.5 , 
     ngay_bat_dau: new Date("2023-08-02"),
     ngay_ket_thuc: new Date("2024-09-02"),
     so_luong_gioi_han:23,
},
{
    cua_hang_id: ObjectId("64e58b05d91cecfb0f143089"),
    ten_san_pham: "Bàn phím giả cơ",
    anh_bia: "banphim.jpg",
    danh_muc_id: ObjectId('65056251cadb32a9657ad23f'),
    mo_ta:"Bàn phím full màu sắc, tùy ý lựa chọn",
    thong_tin_chi_tiet:{
        "Số nút":80,
        "Chất liệu":"Mũ nguyên khối",
        "Âm thanh":"Cà lọc, cà lọc, cà lọc"
    },
    danh_gia:4,
    so_luong_danh_gia:1,
    doi_ten_phan_loai: "Số key",
    doi_ten_kich_co:"Màu sắc",    
    phan_loais:[        
        {
            ten_phan_loai:"120 key",   
            gia_hien_tai:230000,
            kich_co_phan_loais:[
            {
                ten_kich_co:"Đen",
                so_luong_ton:15,
            },
            {
                ten_kich_co:"Hồng",
                so_luong_ton:99,
            },
            {
                ten_kich_co:"Hồng mộng mơ",
                so_luong_ton:40,
            },
            {
                ten_kich_co:"Hồng mộng mơ",
                so_luong_ton:23,
            },
            ]         
        },
        {
            ten_phan_loai:"87 key",  
            gia_hien_tai:200000,             
            kich_co_phan_loais:[
            {
                ten_kich_co:"Đen",
                so_luong_ton:52
            },
            {
                ten_kich_co:"Trắng tinh tươm",
                so_luong_ton:44,
            },
            {
                ten_kich_co:"Hồng",
                so_luong_ton:999,
            },
            {
                ten_kich_co:"Xanh lam",
                so_luong_ton:4,
            },
            ]         
        }    
        ],
    giam_gia: 0.6, 
    ngay_bat_dau: new Date("2023-08-02"),
    ngay_ket_thuc: new Date("2024-10-10"),
    so_luong_gioi_han:98,  
}
])




db.vouchers.insertOne({
    ten_voucher:"MiMieexphis vận chuyển",
    ma_voucher:"freeshiponly",
    ty_le_giam_gia:1,
    don_hang_toi_thieu:0,
    so_luong:999,
    muc_giam_toi_da:50000,
    ngay_bat_dau: new Date(),
    ngay_ket_thuc: new Date("2023-09-23")
})





db.shopbee_vouchers.insertMany([
    {
        loai_voucher:"Ưu đãi phí vận chuyển",
        loai_chi_phi_ap_dung:"phuong_thuc_van_chuyen",
        vouchers:[
            {
                ma_voucher:"hihi1",
                ten_voucher:"Free ship",
                ty_le_giam_gia:0.3,
                don_hang_toi_thieu:0,
                so_luong:99,
                muc_giam_toi_da:100000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/11/07")
            },
            {
                ma_voucher:"hihi2",
                ten_voucher:"Free ship",
                ty_le_giam_gia:1,
                don_hang_toi_thieu:0,
                so_luong:245,
                muc_giam_toi_da:200000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/12/07"),
                doi_tuong_tham_chieu:["danh_muc"],
                danh_mucs:[
                    ObjectId("650561c2cadb32a9657ad23b")            
                ]          
            },
            {
                ma_voucher:"hihi3",
                ten_voucher:"Free ship",
                ty_le_giam_gia:1,
                don_hang_toi_thieu:0,
                so_luong:123,
                muc_giam_toi_da:250000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2024/01/07"),
                doi_tuong_tham_chieu:["danh_muc","phuong_thuc_van_chuyen"],
                danh_mucs:[
                    ObjectId("650561c2cadb32a9657ad23b")            
                ],
                phuong_thuc_van_chuyens:[
                    ObjectId("64e5f63b0a18df59e9f83ddf"),
                    ObjectId("64e5f63b0a18df59e9f83de0"),
                    ObjectId("64e5f63b0a18df59e9f83de2")                                      
                ]    
            },
            {
                ma_voucher:"hihi4",
                ten_voucher:"Free ship",
                ty_le_giam_gia:1,
                don_hang_toi_thieu:0,
                so_luong:123,
                muc_giam_toi_da:50000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/12/01"),
                doi_tuong_tham_chieu:["cua_hang"],            
                cua_hangs:[
                    ObjectId("64e58b05d91cecfb0f143089"),
                    ObjectId("64f2e47bae66307f58914da4"),                                    
                ]    
            }        
        ]
    },
    {
        loai_voucher:"Mã giảm giá",
        loai_chi_phi_ap_dung:"don_hang",
        vouchers:[
            {
                ma_voucher:"discount1",
                ty_le_giam_gia:0.3,
                don_hang_toi_thieu:0,
                so_luong:99,
                muc_giam_toi_da:100000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/11/07")
            },
            {
                ma_voucher:"discount2",
                ten_voucher:"Ưu đãi xịn xò con bò",
                ty_le_giam_gia:0.2,
                don_hang_toi_thieu:100000,
                so_luong:250,
                muc_giam_toi_da:200000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/11/07"),
                doi_tuong_tham_chieu:["danh_muc"],
                danh_mucs:[
                    ObjectId("650561c2cadb32a9657ad23c")            
                ]          
            },
            {
                ma_voucher:"discount3",
                ten_voucher:"Hấp dẫn ưu đãi khi sử dụng ship hỏa tốc",
                ty_le_giam_gia:0.1,
                don_hang_toi_thieu:0,
                so_luong:123,
                muc_giam_toi_da:250000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2024/01/07"),
                doi_tuong_tham_chieu:["phuong_thuc_van_chuyen"],            
                phuong_thuc_van_chuyens:[
                    ObjectId("64e5f63b0a18df59e9f83de0"),                                                   
                ]    
            },
            {
                ma_voucher:"discount4",
                ty_le_giam_gia:0.1,
                don_hang_toi_thieu:50000,
                so_luong:136,
                muc_giam_toi_da:200000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/12/25"),
                doi_tuong_tham_chieu:["cua_hang"],            
                cua_hangs:[
                    ObjectId("64e58b05d91cecfb0f143089"),
                    ObjectId("64f2e47bae66307f58914da4"),                                    
                ]    
            },
            {
                ma_voucher:"discount4",
                ten_voucher:"Hấp dẫn ưu đãi khi thanh toán qua ví momo",            
                ty_le_giam_gia:0.1,
                don_hang_toi_thieu:100000,
                so_luong:1367,
                muc_giam_toi_da:300000,
                ngay_bat_dau: new Date(),
                ngay_ket_thuc: new Date("2023/11/20"),
                doi_tuong_tham_chieu:["phuong_thuc_thanh_toan"],            
                phuong_thuc_thanh_toans:[
                    ObjectId("64e5f68b0a18df59e9f83de5"),                                   
                ]    
            }       
        ]
    }
    ])
    




db.phuong_thuc_van_chuyen.insertMany([
{
    _id:ObjectId("64e5f63b0a18df59e9f83ddf"),
    ten_phuong_thuc_van_chuyen:"Nhanh",
    chi_phi:15000,
    thoi_gian_uoc_tinh:2,
    dong_kiem:true,
    mac_dinh:true      
},
{
    _id:ObjectId("64e5f63b0a18df59e9f83de0"),
    ten_phuong_thuc_van_chuyen:"Hỏa tốc",
    chi_phi:30000,      
    thoi_gian_uoc_tinh:3
},
{
    _id:ObjectId("64e5f63b0a18df59e9f83de1"),
    ten_phuong_thuc_van_chuyen:"Tiết kiệm",
    chi_phi:20000,      
    thoi_gian_uoc_tinh:4
},
{
    _id:ObjectId("64e5f63b0a18df59e9f83de2"),
    ten_phuong_thuc_van_chuyen:"Ninja lít",
    chi_phi:50000,      
    thoi_gian_uoc_tinh:1,
    dong_kiem:true,
},
])

db.phuong_thuc_thanh_toan.insertMany([
{
    _id:ObjectId("64e5f68b0a18df59e9f83de3"),
    ten_phuong_thuc_thanh_toan:"Thanh toán khi nhận hàng",    
},
{
    _id:ObjectId("64e5f68b0a18df59e9f83de4"),
    ten_phuong_thuc_thanh_toan:"Thanh toán bằng thẻ tín dụng",    
},
{
    _id:ObjectId("64e5f68b0a18df59e9f83de5"),
    ten_phuong_thuc_thanh_toan:"Thanh toán qua MOMO",    
},
])



db.don_hang.insertMany([
{
    cua_hang_id:ObjectId('64e58b05d91cecfb0f143089'),
    dia_chi_giao_hang_id:ObjectId('64e5890fd91cecfb0f143085'),
    ngay_dat_hang: new Date(),
    chi_tiet_don_hangs:[
    {
        san_pham:{
            san_pham_id: ObjectId('64e5aa29b0028bed9fe92a98'),
            ten_phan_loai:'Bản 128GB'
        },
        don_gia:7000000,
        so_luong:3,
        danh_gia:{
            ngay_danh_gia:new Date("2023-09-01"),
            muc_do_hai_long:5,
            noi_dung:"Sản phẩm chất lượng",
            
        }
    },
    {
        san_pham:{
            san_pham_id: ObjectId('64e5aa29b0028bed9fe92a98'),
            ten_phan_loai: 'Bản 256GB',
            ten_kich_co:'Like new 70%',            
        },
        don_gia:2000000,
        so_luong:1,
        danh_gia:{
            ngay_danh_gia:new Date("2023-10-01"),
            muc_do_hai_long:1,
            noi_dung:"Sản phẩm không đúng như ảnh",
            
        }
    }],
    ma_voucher_cua_hang:"hihihi1",
    vouchers:["freeshiponly"],
    phuong_thuc_van_chuyen:ObjectId('64e5f63b0a18df59e9f83ddf'),
    phuong_thuc_thanh_toan:ObjectId('64e5f68b0a18df59e9f83de3'),
    trang_thai:{
            "Chờ xác nhận": new Date("2023-09-22")
        },    
    loi_nhan:"Giao nhanh giúp mình nha shop",
    phi_van_chuyen:20000,
    giam_gia:{
            phuong_thuc_van_chuyen:10000,
            don_hang:50000
    },    
    thanh_tien:23000000,
},
])




db.danh_muc.insertMany([
    {
        ten_danh_muc:"Thiết bị điện tử",
    },    
    {ten_danh_muc:"Điện thoại"},
    {
        ten_danh_muc:"Đồ gia dụng",
    }
    ])
    
    db.danh_muc.insertMany([
    {
        ten_danh_muc:"Laptop",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23b")
    },    
    {
        ten_danh_muc:"Samsung",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Apple",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Opple",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Hao wai",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23c")
    },
    {
        ten_danh_muc:"Quạt hơi nước",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23d")
    },
    {
        ten_danh_muc:"Nồi nui soang chảo",
        danh_muc_cha_id:ObjectId("650561c2cadb32a9657ad23d")
    },
    ])
    
    
    db.danh_muc.insertMany([
    {
        ten_danh_muc:"Flapship",
        danh_muc_cha_id:ObjectId("65056251cadb32a9657ad23f")
    },    
    {
        ten_danh_muc:"Tầm trung",
        danh_muc_cha_id:ObjectId("65056251cadb32a9657ad23f")
    },
    {
        ten_danh_muc:"Rẻ bèo",
        danh_muc_cha_id:ObjectId("65056251cadb32a9657ad23f")
    },
    ])
    


db.danh_muc.aggregate([
  {
    $graphLookup: {
      from: "danh_muc",
      startWith: "$danh_muc_con",
      connectFromField: "danh_muc_con",
      connectToField: "_id",
      as: "subcategories",
      maxDepth: 10 // Số cấp đệ quy tối đa, điều chỉnh nếu cần thiết
    }
  },
]);




