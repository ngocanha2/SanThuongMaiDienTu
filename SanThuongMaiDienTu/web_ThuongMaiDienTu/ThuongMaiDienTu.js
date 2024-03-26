


db.createCollection('nguoi_dung',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Thông tin về tài khoản của người dùng',
            required: ["ten_dang_nhap", "ho_ten","mat_khau","ngay_tao"],
            properties:{
                ten_dang_nhap:{
                    bsonType: 'string',
                    description: 'Tên đăng nhập của tài khoản, kiểu chuỗi',
                    minLength: 5,
                    maxLength: 20
                },
                ho_ten:{
                    bsonType: 'string',
                    description: 'Họ tên người dùng',
                    minLength: 5,
                    maxLength: 50
                },
                so_dien_thoai:{
                    bsonType: 'string',
                    description: 'Số điện thoại phải đúng 10 ký tự số',
                    minLength: 10,
                    maxLength: 10,
                    pattern: "^[0-9]{10}$"
                },
                email:{
                    bsonType: 'string',
                    description: 'Địa chỉ email không được để trống',
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                },
                anh_dai_dien:{
                    bsonType: 'string',
                },
                ngay_sinh:{
                    bsonType: ['date','string'],
                    description: 'Ngày sinh có thể là kiểu date hoặc string'
                },
                gioi_tinh:{
                    bsonType: 'string',
                    description: 'Giới tính: Nam, Nữ, Khác',
                    pattern: "^(Nam|Nữ|Khác)$"
                },
                mat_khau:{
                    bsonType: 'string',
                    description: 'Mật khẩu là kiểu chuỗi'
                },
                ngay_tao:{
                    bsonType: 'date',
                    description: 'Ngày đăng ký tài khoản'
                },
                bi_khoa:{
                    bsonType: 'bool',
                    description: 'Tên đăng nhập phải là kiểu chuỗi'
                }, 
                so_dia_chi:{
                    bsonType:"array",
                    description: 'Danh sách các địa chỉ giao hàng của người dùng',
                    items:{
                        bsonType:'object',
                        required: ["id","ten_nguoi_nhan","dia_chi","dia_chi_cu_the","so_dien_thoai","loai_dia_chi"],
                        properties:{
                            id:{
                                bsonType:'objectId',
                                description: 'Id để nhận dạng địa chỉ giao hàng',                  
                            },
                            ten_nguoi_nhan:{
                                bsonType: 'string',
                                description: 'Họ tên người nhận là kiểu string',
                                minLength: 5,
                                maxLength: 50
                            },
                            dia_chi:{
                                bsonType: 'string', 
                                description: 'Địa chỉ giao hàng',                 
                            },
                            dia_chi_cu_the:{
                                bsonType: 'string',
                                description: 'Số nhà, tên đường cục thể',
                            },
                            so_dien_thoai:{
                                bsonType: 'string',
                                description: 'Số điện thoại phải đúng 10 ký tự số',
                                minLength: 10,
                                maxLength: 10,
                                pattern: "^[0-9]{10}$"
                            },                
                            loai_dia_chi:{
                                enum: ["Nhà riêng", "Văn phòng"],
                                description: "Loại địa chỉ chỉ có các giá trị: 'Nhà riêng','Văn phòng'",
                                pattern: "^(Nhà riêng|Văn phòng)$"
                            },
                        }
                    }
                },            
                gio_hang:{
                    bsonType:'array',
                    description:"Danh sách các sản phẩm mà người dùng cho vào giỏ hàng",
                    items:{
                        bsonType: 'object',
                        required: ["san_pham","so_luong"],
                        properties:{
                            san_pham:{
                                bsonType: 'object',
                                description:"Tham chiếu đến id của sản phẩm hoặc sẽ là id sản phẩm tên phân loại hoặc bao gồm cả kích cở nếu sản phẩm đó nếu có",
                                required: ["san_pham_id"],
                                properties:{
                                    san_pham_id:{
                                        bsonType:'objectId',
                                        description:"Tham chiếu đến id của sản phẩm",
                                    },
                                    ten_phan_loai:{
                                        bsonType:'string',
                                        description:"Tên phân loại của sản phẩm",
                                    },
                                    ten_kich_co:{
                                        bsonType:'string',
                                        description:"Tên kích cở phân loại của sản phẩm",
                                    },                                   
                                }
                            },    
                            so_luong:{
                                bsonType: 'int', 
                                minimun:1,                               
                                description:"Số lượng tồn kho của kích cở phân loại sản phẩm này"
                            },                            
                        }
                    }                    
                },               
            }
        }
    },
    validationAction: "error",
})



// db.nguoi_dung.createIndex({ "so_dien_thoai": 1}, { unique: true })
// db.nguoi_dung.createIndex({ "email":1}, { unique: true })
db.nguoi_dung.createIndex({ "`ten_dang_nhap`":1 }, { unique: true })
//db.nguoi_dung.createIndex({ "dia_chi_giao_hangs.id":1 }, { unique: true })



db.createCollection('cua_hang',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Đại diện cho cửa hàng của tải khoản đó đăng ký bán hàng trên hệ thống',
            required: ["nguoi_dung_id","ten_cua_hang","dia_chi","ngay_dang_ky","luot_truy_cap","trang_thai_hoat_dong"],
            properties:{  
                nguoi_dung_id:{
                    bsonType:"objectId",
                    description: "Tham chiếu đến id của người dùng đăng ký bán hàng",                    
                },          
                ten_cua_hang:{
                    bsonType: 'string',
                    description: 'Họ tên người nhận là kiểu string',
                    minLength: 5,
                    maxLength: 50
                },
                anh_dai_dien:{
                    bsonType: 'string',
                    description: 'Ảnh đại diện của cửa hàng',
                },
                dia_chi:{
                    bsonType: 'string',
                    description: 'Địa chỉ thực của cửa hàng',                  
                },
                ngay_dang_ky:{
                    bsonType: 'date',
                    description: 'Ngày của hàng được đăng ký trên hệ thống',
                },
                so_dien_thoai:{
                    bsonType: 'string',
                    description: 'Số điện thoại phải đúng 10 ký tự số',
                    minLength: 10,
                    maxLength: 10,
                    pattern: "^[0-9]{10}$"
                },                
                chu_ky:{
                    bsonType: 'string',
                    description: "Chữ ký có tối đa 100 ký tự",
                    maxLength: 100,
                },        
                luot_truy_cap:{
                    bsonType:"int",
                    minimum:0,
                },
                trang_thai_hoat_dong:{
                    bsonType:["bool","date"],
                    description: "Trạng thái hoạt động (true) hoặc là thời gian hoạt động gần nhất",
                },
                khuyen_mais:{
                    bsonType:"array",
                    description:"Danh sách tất cả khuyến mãi của cửa hàng",
                    items:{
                        bsonType:"object",
                        required: ["ma_khuyen_mai","ty_le_giam_gia","don_hang_toi_thieu","so_luong","muc_giam_toi_da","ngay_bat_dau","ngay_ket_thuc"],
                        properties:{
                            ma_khuyen_mai:{
                                bsonType:"string",
                                description:"Mã voucher mà người mua nhập vào để giảm giá",
                                                              
                            },
                            ten_khuyen_mai:{
                                bsonType:"string",
                                description:"Tên của voucher",
                                                              
                            },
                            ty_le_giam_gia:{
                                bsonType:"double",
                                description:"Tỷ lệ giảm giá của voucher này",                                
                                minimum:0,
                                maximum:1,
                                                              
                            },
                            don_hang_toi_thieu:{
                                bsonType:"int",
                                description:"Giá trị đơn hàng tối thiếu để cho phép sử dụng voucher này",                                
                                minimum:0,                                                              
                            },
                            so_luong:{
                                bsonType:"int",
                                description:"Số lượng voucher",                                
                                minimum:0,                                                              
                            },
                            muc_giam_toi_da:{
                                bsonType:"int",
                                description:"Hạn mức tiền tối đa được giảm của một đơn hàng",                                
                                minimum:0,                                                              
                            },
                            ngay_bat_dau:{
                                bsonType:"date",
                                description:"Ngày mà voucher này bắt đầu",                                                                                          
                            },
                            ngay_ket_thuc:{
                                bsonType:"date",
                                description:"Ngày mà voucher này kết thúc",                                
                            },
                        }
                    }
                }                     
            }
        }
    },
    validationAction: "error",
})



// db.createCollection('danh_muc',{
//     validator:{
//         $jsonSchema:{
//             bsonType:'object',
//             title:'Quản lý các danh mục sản phẩm, có thể chứa các danh mục con nếu có cấp nhỏ hơn',
//             required: ["ten_danh_muc"],
//             properties:{
//                 _id:{
//                     bsonType: 'objectId',  
//                     description: "Id của danh mục",
//                 },
//                 ten_danh_muc:{
//                     bsonType: 'string',  
//                     description: "Tên của danh mục",
//                     minLength: 5,
//                     maxLength: 100,                                  
//                 },                 
//                 danh_muc_cons:{
//                     bsonType: 'array',  
//                     description: "Danh sách chứa các danh mục con, có thể chứa thêm các danh mục con nhỏ hơn và nhỏ hơn nữa bên trong",
//                     items:{
//                         bsonType:'object',
//                         required: ["_id","ten_danh_muc"],
//                         properties:{
//                             _id:{
//                                 bsonType: 'objectId',  
//                                 description: "Id của danh mục",
//                             },
//                             ten_danh_muc:{
//                                 bsonType:"string",
//                                 description:"Tên của danh mục con",
//                             },
//                             danh_muc_cons:{
//                                 bsonType:"array",
//                                 description:"Danh sách các danh mục con nhỏ hơn và nhỏ hơn nữa nếu có",
//                                 items:{
//                                     bsonType:'object',
//                                     required: ["_id","ten_danh_muc"],                                    
//                                 }
//                             }
//                         },   
//                     }                         
//                 }                                                
//             }
//         }
//     },
//     validationAction: "error",
// })


db.createCollection('danh_muc',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Quản lý các danh mục sản phẩm, có thể chứa các danh mục con nếu có cấp nhỏ hơn',
            required: ["ten_danh_muc"],
            properties:{                
                ten_danh_muc:{
                    bsonType: 'string',  
                    description: "Tên của danh mục",
                    minLength: 5,
                    maxLength: 100,                                  
                },
                icon:{
                    bsonType: 'string',  
                    description: "Chuỗi lưu giữ icon",
                },   
                danh_muc_cha_id:{
                    bsonType: 'objectId',  
                    description: "Tham chiếu đến id của danh mục cha",
                }                                                                                           
            }
        }
    },
    validationAction: "error",
})



db.createCollection('san_pham',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Quản lý sản phẩm',
            required: ["cua_hang_id","ten_san_pham","anh_bia","danh_muc_id","mo_ta","danh_gia","so_luong_danh_gia"],
            properties:{
                cua_hang_id:{
                    bsonType:'objectId',
                    description: "Tham chiếu đến id của cửa hàng",
                },
                ten_san_pham:{
                    bsonType: 'string',  
                    minLength: 3,
                    maxLength: 200,                                  
                },
                anh_bia:{
                    bsonType: 'string',                                                   
                },  
                anh_san_phams:{
                    bsonType:'array',
                    description:"Danh sách các ảnh của sản phẩm",
                    items:{
                        bsonType: "string"
                    }                    
                },
                danh_muc_id:{
                    bsonType: 'objectId',
                    description:"Tham chiếu đến 'id' của danh mục(customs)"                                                   
                },   
                mo_ta:{
                    bsonType: 'string',
                    description:"Mô tả sản phẩm, là 1 đoạn định dạng html"                                                   
                }, 
                thong_tin_chi_tiet:{
                    bsonType: 'object',
                    description:"Thông tin chi tiết về các đặc điểm của sản phẩm"                                                   
                },
                so_luong_ton:{
                    bsonType: 'int',
                    minimum: 0,
                    description:"Số lượng tồn kho của sản phẩm này, sẽ được sử dụng nếu sản phẩm không có phân loại"
                },
                gia_hien_tai:{
                    bsonType: 'int',
                    minimum: 0,
                    description:"Giá bán hiện tại của sản phẩm này, sẽ được sử dụng nếu sản phẩm không có phân loại"
                },                
                phan_loais:{
                    bsonType:"array",
                    description:"Danh sách tất cả các phân loại của sản phẩm nếu có",
                    items:{
                        
                        bsonType:'object',
                        required: ["ten_phan_loai"],                            
                        properties:{      
                            ten_phan_loai:{
                                bsonType: 'string',  
                                description:"Tên phân loại của sản phẩm",
                            },    
                            so_luong_ton:{
                                bsonType: 'int',
                                minimum: 0,
                                description:"Số lượng tồn kho của phân loại sản phẩm, sẽ được sử dụng nếu phân loại này không có kích cở"
                            },
                            gia_hien_tai:{
                                bsonType: 'int',
                                minimum: 0,
                                description:"Giá bán hiện tại của phân loại sản phẩm, sẽ được sử dụng nếu phân loại này không có kích cở"
                            },            
                            kich_co_phan_loais:{
                                bsonType:'array',
                                description:"Danh sách các kích cở của từng phần loại nếu có",
                                items:{
                                    bsonType: "object",
                                    required: ["ten_kich_co","so_luong_ton"],
                                    properties:{
                                        ten_kich_co:{
                                            bsonType: 'string',  
                                            description:"Tên kích cở phân loại của sản phẩm này",
                                        },    
                                        so_luong_ton:{
                                            bsonType: 'int',
                                            minimum: 0,
                                            description:"Số lượng tồn kho của kích cở phân loại sản phẩm này"
                                        },
                                        gia_hien_tai:{
                                            bsonType: 'int',
                                            minimum: 0,
                                            description:"Giá bán hiện tại của kích cở phân loại sản phẩm này"
                                        }, 
                                    }
                                }                    
                            },                  
                        }                                                  
                    }
                },                            
                danh_gia:{
                    bsonType: ['double','int'],
                    minimum: 0,      
                    maximum: 5,
                    description:"Trung bình đánh giá của tất cả các đánh giá về sản phẩm này"
                },   
                so_luong_danh_gia:{
                    bsonType: 'int',
                    minimum: 0,
                    description:"Số lượng của tất cả đánh giá về sản phẩm này"
                },  
                giam_gia:{
                    bsonType: 'double',
                    minimum: 0,      
                    maximum: 1,
                    description:"Mức giảm giá của sản phẩm có miền giá trị [0,1]"
                },
                ngay_bat_dau:{
                    bsonType: 'date',                    
                    description:"Thời gian bắt đầu giảm giá"
                },
                ngay_ket_thuc:{
                    bsonType: 'date',                    
                    description:"Thời hạn cho phép mức giam_gia của hiệu lực của sản phẩm này"
                },
                so_luong_gioi_han:{
                    bsonType: 'int', 
                    minimum: 0,                    
                    description:"Số lượng giới hạn mà sản phẩm được giảm giá"
                },
                bi_an:{
                    bsonType: 'bool',       
                    description:"Hiển trị trạng thái sản phẩm có thể tạm thời bị ẩn"
                },
                bi_xoa:{
                    bsonType: 'bool',
                    description:"Sản phẩm không thể xóa chính thức mà chỉ được quản lý xóa ngầm định"
                },                                         
            }
        }
    },
    validationAction: "error",
})



//cái này nếu kịp sẽ làm theo kiểu phân từng loại voucher, hệ thống sẽ có những loại voucher như: free ship, voucher toàn hệ thống, voucher được cửa hàng đăng ký,...,
//Vì thế nếu xây dựng phần này, cần xây thêm các colection: thể loại voucher, danh sách các cửa hàng đăng ký cho phép áp dụng voucher đó, những voucher chỉ được sử dụng khi thực hiện phương thức thanh toán cụ thể nào đó




// db.createCollection('vouchers',{
//     validator:{
//         $jsonSchema:{
//             bsonType:'object',
//             title:'Quản lý các voucher của website',
//             bsonType:"object",
//             //required: ["ma_voucher","ten_voucher","the_loai_ap_dung"],
//             required: ["ma_voucher","ten_voucher"],
//             properties:{
//                 ma_voucher:{
//                     bsonType:"string",
//                     description:"Mã voucher mà người mua nhập vào để giảm giá",
                                                  
//                 },
//                 ten_voucher:{
//                     bsonType:"string",
//                     description:"Tên của chương trình khuyến mãi này",
                                                  
//                 },
//                 ty_le_giam_gia:{
//                     bsonType:["double","int"],
//                     description:"Tỷ lệ giảm giá của voucher này",                                
//                     minimum:0,
//                     maximum:1,
                                                  
//                 },
//                 don_hang_toi_thieu:{
//                     bsonType:"int",
//                     description:"Giá trị đơn hàng tối thiếu để cho phép sử dụng voucher này",                                
//                     minimum:0,                                                              
//                 },
//                 so_luong:{
//                     bsonType:"int",
//                     description:"Số lượng voucher",                                
//                     minimum:0,                                                              
//                 },
//                 muc_giam_toi_da:{
//                     bsonType:"int",
//                     description:"Hạn mức tiền tối đa được giảm của một đơn hàng",                                
//                     minimum:0,                                                              
//                 },
//                 ngay_bat_dau:{
//                     bsonType:"date",
//                     description:"Ngày mà voucher này bắt đầu",                                                                                          
//                 },
//                 ngay_ket_thuc:{
//                     bsonType:"date",
//                     description:"Ngày mà voucher này kết thúc",                                
//                 },
//             }                    
//         }
//     },
//     validationAction: "error",
// })
// db.vouchers.createIndex({ ma_voucher: 1 }, { unique: true })






db.createCollection('shopbee_vouchers',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Quản lý các voucher của website',
            bsonType:"object",
            required: ["loai_voucher","loai_chi_phi_ap_dung","vouchers"],
            properties:{
                loai_voucher:{
                    bsonType:"string",
                    description:"Tên của loại hình voucher này",
                },       
                loai_chi_phi_ap_dung:{
                    enum:["phuong_thuc_van_chuyen","don_hang"],
                    description:"Loại chi phí nào để sử dụng loại voucher này (phuong_thuc_giao_hang,don_hang)",
                },   
                vouchers:{
                    bsonType:'array',
                    description:"Danh sách các voucher",
                    items:{
                        bsonType:'object', 
                        required: ["ma_voucher","ty_le_giam_gia","don_hang_toi_thieu","so_luong","muc_giam_toi_da","ngay_bat_dau","ngay_ket_thuc"],
                        properties:{                            
                            ma_voucher:{
                                bsonType:"string",
                                description:"Mã voucher mà người mua nhập vào để giảm giá",
                                                              
                            },
                            ten_voucher:{
                                bsonType:"string",
                                description:"Tên của chương trình khuyến mãi này",
                                                              
                            },
                            ty_le_giam_gia:{
                                bsonType:["double","int"],
                                description:"Tỷ lệ giảm giá của voucher này",                                
                                minimum:0,
                                maximum:1,
                                                              
                            },
                            don_hang_toi_thieu:{
                                bsonType:"int",
                                description:"Giá trị đơn hàng tối thiếu để cho phép sử dụng voucher này",                                
                                minimum:0,                                                              
                            },
                            so_luong:{
                                bsonType:"int",
                                description:"Số lượng voucher",                                
                                minimum:0,                                                              
                            },
                            muc_giam_toi_da:{
                                bsonType:"int",
                                description:"Hạn mức tiền tối đa được giảm của một đơn hàng",                                
                                minimum:0,                                                              
                            },
                            ngay_bat_dau:{
                                bsonType:"date",
                                description:"Ngày mà voucher này bắt đầu",                                                                                          
                            },
                            ngay_ket_thuc:{
                                bsonType:"date",
                                description:"Ngày mà voucher này kết thúc",                                
                            },
                            doi_tuong_tham_chieu:{//doi_tuong_tham_chieu: danh mục, phương thức vận chuyển, phương thức thanh toán, cửa hàng đăng ký, không có gì là dành cho tất cả
                                bsonType:"array",
                                description:"Danh sách tên các đối tượng collection khác tham gia ảnh hưởng đến khả năng sử dụng của voucher",
                                items:{
                                    enum:["danh_muc","phuong_thuc_van_chuyen","phuong_thuc_thanh_toan","cua_hang"]                        
                                }
                            },
                            danh_mucs:{
                                bsonType:"array",
                                description:"Danh sách id các danh mục sẽ có thể áp dụng voucher",
                                items:{
                                    bsonType:'objectId',                        
                                }       
                            },
                            phuong_thuc_thanh_toans:{
                                bsonType:"array",
                                description:"Danh sách id các phương thức thanh toán sẽ có thể áp dụng voucher",
                                items:{
                                    bsonType:'objectId',                        
                                } 
                            },
                            phuong_thuc_van_chuyens:{
                                bsonType:"array",
                                description:"Danh sách id các phương thức vận chuyển sẽ có thể áp dụng voucher",
                                items:{
                                    bsonType:'objectId',                        
                                } 
                            },
                            cua_hangs:{
                                bsonType:"array",
                                description:"Danh sách id các cửa hàng đăng ký áp dụng voucher",
                                items:{
                                    bsonType:'objectId',                        
                                } 
                            }
                            
                        }                        
                    }
                }
            }                                        
        }
    },
    validationAction: "error",
})
db.shopbee_vouchers.createIndex({ 'vouchers.ma_voucher': 1 }, { unique: true })
db.shopbee_vouchers.createIndex({ loai_chi_phi_ap_dung: -1 }, { unique: true })



db.createCollection('phuong_thuc_van_chuyen',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Quản lý các phương thức vận chuyển của hệ thống',
            bsonType:"object",
            required: ["ten_phuong_thuc_van_chuyen","chi_phi","thoi_gian_uoc_tinh"],
            properties:{
                ten_phuong_thuc_van_chuyen:{
                    bsonType:"string",
                    description:"Tên của phương thức vận chuyển này",
                                                  
                },                
                thoi_gian_uoc_tinh:{
                    bsonType:"int",
                    description:"Ước tính thời gian giao hàng của phương thức vận chuyển này",
                },
                chi_phi:{
                    bsonType:"int",
                    description:"Chi phí bỏ ra khi sử dụng phương thức vận chuyển này",
                                                  
                },                
            }                    
        }
    },
    validationAction: "error",
})

db.createCollection('phuong_thuc_thanh_toan',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Quản lý các phương thức thanh toán của hệ thống',
            bsonType:"object",
            required: ["ten_phuong_thuc_thanh_toan"],
            properties:{
                ten_phuong_thuc_thanh_toan:{
                    bsonType:"string",
                    description:"Tên của phương thức thanh toán",
                                                  
                },  
                logo:{
                    bsonType:"string",
                    description:"Lưu giữ tên file logo của phương thức thanh toán",
                                                  
                },                             
            }                    
        }
    },
    validationAction: "error",
})






db.createCollection('don_hang',{
    validator:{
        $jsonSchema:{
            bsonType:'object',
            title:'Quản lý đơn hàng',
            bsonType:"object",
            required: ["cua_hang_id","nguoi_dung_id","dia_chi_giao_hang","ngay_dat_hang","chi_tiet_don_hangs"
                        ,"phuong_thuc_van_chuyen","phuong_thuc_thanh_toan","trang_thai","phi_van_chuyen","thanh_tien"],
            properties:{
                cua_hang_id:{
                    bsonType:"objectId",
                    description:"Tham chiếu đến id của cửa hàng",
                },
                nguoi_dung_id:{
                    bsonType:"objectId",
                    description:"Tham chiếu đến id của người dùng",
                },
                dia_chi_giao_hang:{
                    bsonType:"object",
                    description:"Địa chỉ giao hàng",                    
                    required: ["ten_nguoi_nhan","dia_chi","dia_chi_cu_the","so_dien_thoai","loai_dia_chi"],
                    properties:{                        
                        ten_nguoi_nhan:{
                            bsonType: 'string',
                            description: 'Họ tên người nhận là kiểu string',
                            minLength: 5,
                            maxLength: 50
                        },
                        dia_chi:{
                            bsonType: 'string', 
                            description: 'Địa chỉ giao hàng',                 
                        },
                        dia_chi_cu_the:{
                            bsonType: 'string',
                            description: 'Số nhà, tên đường cục thể',
                        },
                        so_dien_thoai:{
                            bsonType: 'string',
                            description: 'Số điện thoại phải đúng 10 ký tự số',
                            minLength: 10,
                            maxLength: 10,
                            pattern: "^[0-9]{10}$"
                        },                
                        loai_dia_chi:{
                            enum: ["Nhà riêng", "Văn phòng"],
                            description: "Loại địa chỉ chỉ có các giá trị: 'Nhà riêng','Văn phòng'",
                            pattern: "^(Nhà riêng|Văn phòng)$"
                        },
                    }
                },
                ngay_dat_hang:{
                    bsonType:"date",
                    description:"Ngày đặt đơn hàng này",                                                              
                },
                chi_tiet_don_hangs:{
                    bsonType:"array",
                    description:"Thông tin danh sách các sản phẩm của đơn hàng này",
                    items:{
                        bsonType: "object",
                        required: ["san_pham","so_luong","don_gia"],
                        properties:{
                            san_pham:{
                                bsonType: 'object',  
                                description:"id của sản phẩm hoặc sẽ là id sản phẩm tên phân loại hoặc bao gồm cả kích cở nếu sản phẩm đó nếu có",
                                required: ["san_pham_id"],
                                properties:{
                                    san_pham_id:{
                                        bsonType:'objectId',
                                        description:"Tham chiếu đến id của sản phẩm",
                                    },
                                    ten_phan_loai:{
                                        bsonType:'string',
                                        description:"Tên phân loại của sản phẩm",
                                    },
                                    ten_kich_co:{
                                        bsonType:'string',
                                        description:"Tên kích cở phân loại của sản phẩm",
                                    },                                   
                                }
                            },  
                            don_gia:{
                                bsonType: 'int',
                                minimum: 0,
                                description:"Đơn giá của sản phẩm"
                            },  
                            so_luong:{
                                bsonType: 'int',
                                minimum: 0,
                                description:"Số lượng tồn kho của kích cở phân loại sản phẩm này"
                            }, 
                            don_gia_phu:{
                                bsonType: 'int',
                                minimum: 0,
                                description:"Đơn giá của sản phẩm"
                            },  
                            so_luong_phu:{
                                bsonType: 'int',
                                minimum: 0,
                                description:"Số lượng tồn kho của kích cở phân loại sản phẩm này"
                            }, 
                            danh_gia:{
                                bsonType:"object",
                                description:"Thông tin đánh giá về sản phẩm",                                
                                required: ["ngay_danh_gia","muc_do_hai_long","noi_dung"],
                                properties:{                                      
                                    ngay_danh_gia:{
                                        bsonType: 'date',
                                        description:"Ngày tạo đánh giá này"
                                    },  
                                    muc_do_hai_long:{
                                        bsonType: 'int',
                                        minimum: 0,
                                        maximum: 5,
                                        description:"Mức độ hài lòng của người mua về sản phẩm này"
                                    },  
                                    noi_dung:{
                                        bsonType: 'string',
                                        description:"Trình bài nội dung của bình phẩm về sản phẩm"
                                    }, 
                                    anh_danh_gias:{
                                        bsonType: 'array',
                                        description:"Danh sách ảnh đánh giá",
                                        items:{
                                            bsonType: "string"
                                        }
                                    }, 
                                    an_danh:{
                                        bsonType: 'bool',
                                        description:"Được phép đánh giá ẩn danh"
                                    },                                                    
                                }                                                                           
                            },                                                                                      
                        }
                    }                                            
                },
                ma_voucher_cua_hang:{
                    bsonType:"string",
                    description:"Mã voucher của cửa hàng",                                             
                },                
                vouchers:{
                    bsonType:"array",
                    description:"Các voucher của hệ thống được sử dụng cho đơn hàng này",      
                    items:{
                        bsonType:"string"
                    }                                                                                    
                },
                phuong_thuc_van_chuyen:{
                    bsonType:"object",
                    description:"Phương thức vận chuyển",    
                    required: ["ten_phuong_thuc_van_chuyen","chi_phi","thoi_gian_uoc_tinh"],
                    properties:{
                        ten_phuong_thuc_van_chuyen:{
                            bsonType:"string",
                            description:"Tên phương thức vận chuyển",
                                                        
                        },                
                        thoi_gian_uoc_tinh:{
                            bsonType:"int",
                            description:"Ước tính thời gian giao hàng",
                        },
                        chi_phi:{
                            bsonType:"int",
                            description:"Chi phí áo dụng",
                                                        
                        },                
                    }                      
                },
                phuong_thuc_thanh_toan:{
                    bsonType:"string",
                    description:"Tên phương thức thanh toán",                                
                },
                trang_thai:{
                    bsonType:"object",
                    description:"Thông tin vể thời gian, trạng thái đơn hàng(7 trạng thái): Chờ xác nhận, Đang xử lý, Đang giao, Đã giao, Xác nhận đã nhận, Đã hủy, Bị từ chối",
                },
                loi_nhan:{
                    bsonType:"string",
                    description:"Lời nhắn của người mua gửi đến cửa hàng",                                
                },                               
                phi_van_chuyen:{
                    bsonType:"int",
                    description:"Chi phí vận chuyển của đơn hàng",
                },
                giam_gia:{
                    bsonType:"object",
                    description:"Chi tiết các loại giảm giá",                                                                                                          
                },
                thanh_tien:{
                    bsonType:"int",
                    description:"Tổng thành tiên của đơn hàng này",
                }, 
                
            }                    
        }
    },
    validationAction: "error",
})



// db.createCollection('don_hang',{
//     validator:{
//         $jsonSchema:{
//             bsonType:'object',
//             title:'Quản lý đơn hàng',
//             bsonType:"object",
//             required: ["cua_hang_id","nguoi_dung_id","dia_chi_giao_hang","ngay_dat_hang","chi_tiet_don_hangs"
//                         ,"phuong_thuc_van_chuyen","phuong_thuc_thanh_toan","trang_thai","phi_van_chuyen","thanh_tien"],
//             properties:{
//                 cua_hang_id:{
//                     bsonType:"objectId",
//                     description:"Tham chiếu đến id của cửa hàng",
//                 },
//                 nguoi_dung_id:{
//                     bsonType:"objectId",
//                     description:"Tham chiếu đến id của người dùng",
//                 },
//                 dia_chi_giao_hang:{
//                     bsonType:"object",
//                     description:"Địa chỉ giao hàng",                    
//                     required: ["ten_nguoi_nhan","dia_chi","dia_chi_cu_the","so_dien_thoai","loai_dia_chi"],
//                     properties:{                        
//                         ten_nguoi_nhan:{
//                             bsonType: 'string',
//                             description: 'Họ tên người nhận là kiểu string',
//                             minLength: 5,
//                             maxLength: 50
//                         },
//                         dia_chi:{
//                             bsonType: 'string', 
//                             description: 'Địa chỉ giao hàng',                 
//                         },
//                         dia_chi_cu_the:{
//                             bsonType: 'string',
//                             description: 'Số nhà, tên đường cục thể',
//                         },
//                         so_dien_thoai:{
//                             bsonType: 'string',
//                             description: 'Số điện thoại phải đúng 10 ký tự số',
//                             minLength: 10,
//                             maxLength: 10,
//                             pattern: "^[0-9]{10}$"
//                         },                
//                         loai_dia_chi:{
//                             enum: ["Nhà riêng", "Văn phòng"],
//                             description: "Loại địa chỉ chỉ có các giá trị: 'Nhà riêng','Văn phòng'",
//                             pattern: "^(Nhà riêng|Văn phòng)$"
//                         },
//                     }
//                 },
//                 ngay_dat_hang:{
//                     bsonType:"date",
//                     description:"Ngày đặt đơn hàng này",                                                              
//                 },
//                 chi_tiet_don_hangs:{
//                     bsonType:"array",
//                     description:"Thông tin danh sách các sản phẩm của đơn hàng này",
//                     items:{
//                         bsonType: "object",
//                         required: ["san_pham","so_luong","don_gia"],
//                         properties:{
//                             san_pham:{
//                                 bsonType: 'object',  
//                                 description:"id của sản phẩm hoặc sẽ là id sản phẩm tên phân loại hoặc bao gồm cả kích cở nếu sản phẩm đó nếu có",
//                                 required: ["san_pham_id"],
//                                 properties:{
//                                     san_pham_id:{
//                                         bsonType:'objectId',
//                                         description:"Tham chiếu đến id của sản phẩm",
//                                     },
//                                     ten_phan_loai:{
//                                         bsonType:'string',
//                                         description:"Tên phân loại của sản phẩm",
//                                     },
//                                     ten_kich_co:{
//                                         bsonType:'string',
//                                         description:"Tên kích cở phân loại của sản phẩm",
//                                     },                                   
//                                 }
//                             },  
//                             don_gia:{
//                                 bsonType: 'int',
//                                 minimum: 0,
//                                 description:"Đơn giá của sản phẩm"
//                             },  
//                             so_luong:{
//                                 bsonType: 'int',
//                                 minimum: 0,
//                                 description:"Số lượng tồn kho của kích cở phân loại sản phẩm này"
//                             },  
//                             danh_gia:{
//                                 bsonType:"object",
//                                 description:"Thông tin đánh giá về sản phẩm",                                
//                                 required: ["ngay_danh_gia","muc_do_hai_long","noi_dung"],
//                                 properties:{                                      
//                                     ngay_danh_gia:{
//                                         bsonType: 'date',
//                                         description:"Ngày tạo đánh giá này"
//                                     },  
//                                     muc_do_hai_long:{
//                                         bsonType: 'int',
//                                         minimum: 0,
//                                         maximum: 5,
//                                         description:"Mức độ hài lòng của người mua về sản phẩm này"
//                                     },  
//                                     noi_dung:{
//                                         bsonType: 'string',
//                                         description:"Trình bài nội dung của bình phẩm về sản phẩm"
//                                     }, 
//                                     anh_danh_gias:{
//                                         bsonType: 'array',
//                                         description:"Danh sách ảnh đánh giá",
//                                         items:{
//                                             bsonType: "string"
//                                         }
//                                     }, 
//                                     an_danh:{
//                                         bsonType: 'bool',
//                                         description:"Được phép đánh giá ẩn danh"
//                                     },                                                    
//                                 }                                                                           
//                             },                                                                                      
//                         }
//                     }                                            
//                 },
//                 ma_voucher_cua_hang:{
//                     bsonType:"string",
//                     description:"Mã voucher của cửa hàng",                                             
//                 },                
//                 vouchers:{
//                     bsonType:"array",
//                     description:"Các voucher của hệ thống được sử dụng cho đơn hàng này",      
//                     items:{
//                         bsonType:"string"
//                     }                                                                                    
//                 },
//                 phuong_thuc_van_chuyen:{
//                     bsonType:"object",
//                     description:"Phương thức vận chuyển",    
//                     required: ["ten_phuong_thuc_van_chuyen","chi_phi","thoi_gian_uoc_tinh"],
//                     properties:{
//                         ten_phuong_thuc_van_chuyen:{
//                             bsonType:"string",
//                             description:"Tên phương thức vận chuyển",
                                                        
//                         },                
//                         thoi_gian_uoc_tinh:{
//                             bsonType:"int",
//                             description:"Ước tính thời gian giao hàng",
//                         },
//                         chi_phi:{
//                             bsonType:"int",
//                             description:"Chi phí áo dụng",
                                                        
//                         },                
//                     }                      
//                 },
//                 phuong_thuc_thanh_toan:{
//                     bsonType:"string",
//                     description:"Tên phương thức thanh toán",                                
//                 },
//                 trang_thai:{
//                     bsonType:"object",
//                     description:"Thông tin vể thời gian, trạng thái đơn hàng(7 trạng thái): Chờ xác nhận, Đang xử lý, Đang giao, Đã giao, Xác nhận đã nhận, Đã hủy, Bị từ chối",
//                 },
//                 loi_nhan:{
//                     bsonType:"string",
//                     description:"Lời nhắn của người mua gửi đến cửa hàng",                                
//                 },                               
//                 phi_van_chuyen:{
//                     bsonType:"int",
//                     description:"Chi phí vận chuyển của đơn hàng",
//                 },
//                 giam_gia:{
//                     bsonType:"object",
//                     description:"Chi tiết các loại giảm giá",                                                                                                          
//                 },
//                 thanh_tien:{
//                     bsonType:"int",
//                     description:"Tổng thành tiên của đơn hàng này",
//                 }, 
                
//             }                    
//         }
//     },
//     validationAction: "error",
// })










