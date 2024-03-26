use ThuongMaiDienTu;

db.don_hang.find()




db.don_hang.aggregate([
  {
    $unwind: "$chi_tiet_don_hangs"
  },
  {
    $lookup: {
      from: "san_pham",
      localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
    }
  },
  {
    $unwind: "$san_pham_info"
  },
  {
    $match: {
     $expr: {
        $and: [
          { $gt: ["$ngay_dat_hang", "$san_pham_info.ngay_bat_dau"] },
          { $lt: ["$ngay_dat_hang", "$san_pham_info.ngay_ket_thuc"] }
        ]
      }
    }
  },
 
])

db.cua_hang.find()

db.don_hang.aggregate([
  {
    $unwind: "$chi_tiet_don_hangs"
  },
  {
    $lookup: {
      from: "san_pham",
      localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
    }
  },
  {
     $unwind: { path: "$san_pham_info", preserveNullAndEmptyArrays: true }
  },  
  {
    $lookup: {
      from: "cua_hang",
      localField: "cua_hang_id",
      foreignField: "_id",
      as: "cua_hang_info"
    }
  },
  {
     $unwind: { path: "$cua_hang_info", preserveNullAndEmptyArrays: true }
  },  
  {
    $match: {
     $expr: {
        $and: [
          { $gte: ["$ngay_dat_hang", "$san_pham_info.ngay_bat_dau"] },
          { $lte: ["$ngay_dat_hang", "$san_pham_info.ngay_ket_thuc"] },
          { $gte: ["$san_pham_info.ngay_ket_thuc", new Date()] }
        ]
      }
    }
  },
    {
    $group: {
      _id: "$san_pham_info._id",
      ten_cua_hang: {$first: "$cua_hang_info.ten_cua_hang"},
      cua_hang_id: {$first: "$cua_hang_id"},
      ten_san_pham: { $first: "$san_pham_info.ten_san_pham" },
      anh_bia: { $first: "$san_pham_info.anh_bia" },
      danh_gia: { $first: "$san_pham_info.danh_gia" },
      so_luong_danh_gia: { $first: "$san_pham_info.so_luong_danh_gia" },
      phan_loais: { $first: "$san_pham_info.phan_loais" },
      giam_gia: { $first: "$san_pham_info.giam_gia" },
      ngay_bat_dau: { $first: "$san_pham_info.ngay_bat_dau" },
      ngay_ket_thuc: { $first: "$san_pham_info.ngay_ket_thuc" },      
      so_luong_gioi_han: { $first: "$san_pham_info.so_luong_gioi_han" },
      so_luong_da_mua_khi_khuyen_mai: { $sum: "$chi_tiet_don_hangs.so_luong"} 
    }
  },
  
])





db.san_pham.aggregate([
  {
    $lookup: {
      from: "cua_hang",
      localField: "cua_hang_id",
      foreignField: "_id",
      as: "cua_hang_info"
    }
  },
  {
     $unwind: { path: "$cua_hang_info", preserveNullAndEmptyArrays: true }
  },  
  {
    $match: {
     $expr: {
        $and: [
          { $gte: ["$ngay_ket_thuc", new Date()] },
          { $lte: ["$ngay_bat_dau", new Date()] },
          {  $nin: ["$_id",ObjectId("64e5aa29b0028bed9fe92a98")] },          
        ]
      }
    }
  },
  
])







db.don_hang.aggregate([
  {
    $unwind: "$chi_tiet_don_hangs"
  },
  {
    $lookup: {
      from: "san_pham",
      localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
    }
  },
  {
     $unwind: { path: "$san_pham_info", preserveNullAndEmptyArrays: true }
  },
  {
    $match: {
     $expr: {
        $and: [
          { $gt: ["$ngay_dat_hang", "$san_pham_info.ngay_bat_dau"] },
          { $lt: ["$ngay_dat_hang", "$san_pham_info.ngay_ket_thuc"] },
        ]
      }
    }
  },
  {
    $group: {
      _id: "$san_pham_info._id",
      ten_san_pham: { $first: "$san_pham_info.ten_san_pham" },
      anh_bia: { $first: "$san_pham_info.anh_bia" },
      danh_gia: { $first: "$san_pham_info.danh_gia" },
      so_luong_danh_gia: { $first: "$san_pham_info.so_luong_danh_gia" },
      phan_loais: { $first: "$san_pham_info.phan_loais" },
      giam_gia: { $first: "$san_pham_info.giam_gia" },
      ngay_bat_dau: { $first: "$san_pham_info.ngay_bat_dau" },
      ngay_ket_thuc: { $first: "$san_pham_info.ngay_ket_thuc" },      
      so_luong_gioi_han: { $first: "$san_pham_info.so_luong_gioi_han" },
      so_luong_da_mua_khi_khuyen_mai: { $sum: "$chi_tiet_don_hangs.so_luong"} 
    } 
  },
  {
    $facet: {
      mainResult: [        
      ],
      additionalDocuments: [  
      {
          $addFields: {
            mainResultIds: "$mainResult._id"
          }
        },  
//      {
//        $addFields: {
//            additionalDocuments: db.san_pham.find({
//                  $and: [
//                    { ngay_bat_dau: { $lt: new Date() } },
//                    { _id: { $nin: "$additionalDocuments.mainResultIds" } }
//                  ]
//                }).toArray()
//        }
//      },                
      ]
    }
  },
  {
    $project: {
      finalResult: { $concatArrays: ["$mainResult", "$additionalDocuments.mainResultIds"] }
    }
  }
])


use ThuongMaiDienTu;

db.san_pham.find({
    _id:{
        $nin:[ObjectId("64e5aa29b0028bed9fe92a98"),ObjectId("64e5aa29b0028bed9fe92a99")]
    },
  ngay_bat_dau: { $lte: new Date() },
  ngay_ket_thuc: { $gte: new Date() }
})




db.san_pham.aggregate([
  {
    $lookup: {
      from: "don_hang",
      localField: "_id",
      foreignField: "chi_tiet_don_hangs.san_pham.san_pham_id",
      as: "don_hang_info"
    }
  },
  {
      $unwind: { path: "$don_hang_info", preserveNullAndEmptyArrays: true }
  },
  {
      $unwind: { path: "$don_hang_info.chi_tiet_don_hangs", preserveNullAndEmptyArrays: true }
  },
  {
    $match: {
     $expr: {
         $or:[
         {
              $lt: ["$ngay_bat_dau", new Date()]
         },
         {
             $and: [
              { $gt: ["$don_hang_info.ngay_dat_hang", "$ngay_bat_dau"] },
              { $lt: ["$don_hang_info.ngay_dat_hang", "$ngay_ket_thuc"] }
            ]
         }
         ]
        
      }
    }
  },
  {
      $group:{
          _id:{
              don_hang_id:"$don_hang_info._id",
              chi_tiet_don_hangs:"$don_hang_info.chi_tiet_don_hangs"
          },
          san_pham_id: { $first: "$_id" } ,          
          ten_san_pham: { $first: "$ten_san_pham" },
          anh_bia: { $first: "$anh_bia" },
          danh_gia: { $first: "$danh_gia" },
          so_luong_danh_gia: { $first: "$so_luong_danh_gia" },
          phan_loais: { $first: "$phan_loais" },
          giam_gia: { $first: "$giam_gia" },
          ngay_bat_dau: { $first: "$ngay_bat_dau" },
          ngay_ket_thuc: { $first: "$ngay_ket_thuc" },      
          so_luong_gioi_han: { $first: "$so_luong_gioi_han" },         
      }
  },
  {
      $group:{
          _id:"$san_pham_id",
          ten_san_pham: { $first: "$ten_san_pham" },
          anh_bia: { $first: "$anh_bia" },
          danh_gia: { $first: "$danh_gia" },
          so_luong_danh_gia: { $first: "$so_luong_danh_gia" },
          phan_loais: { $first: "$phan_loais" },
          giam_gia: { $first: "$giam_gia" },
          ngay_bat_dau: { $first: "$ngay_bat_dau" },
          ngay_ket_thuc: { $first: "$ngay_ket_thuc" },      
          so_luong_gioi_han: { $first: "$so_luong_gioi_han" },
          so_luong_da_mua_khi_khuyen_mai: { $sum: "$_id.chi_tiet_don_hangs.so_luong"} 
      }
  },
])


use ThuongMaiDienTu;

db.san_pham.aggregate([
  {
    $lookup: {
      from: "cua_hang",
      localField: "cua_hang_id",
      foreignField: "_id",
      as: "cua_hang_info"
    }
  }, 
  {
    $unwind: "$cua_hang_info"
  },
 
])

db.san_pham.find()

use ThuongMaiDienTu;







db.nguoi_dung.aggregate([
   {
    $unwind: "$gio_hang"
  },
  {
    $lookup: {
      from: "san_pham",
      localField: "gio_hang.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
    }
  }, 
  {
    $unwind: "$san_pham_info"
  },
  {
    $match: {
        "_id":ObjectId("64e585130a81481311402e00"),     
    }
  },
  {
    $lookup: {
      from: "cua_hang",
      localField: "san_pham_info.cua_hang_id",
      foreignField: "_id",
      as: "cua_hang_info"
    }
  }, 
  {
    $unwind: "$cua_hang_info"
  },
  {
      $group:{
          _id:"$san_pham_info.cua_hang_id",
          ten_cua_hang: { $first: "$cua_hang_info.ten_cua_hang" },
          anh_dai_dien: { $first: "$cua_hang_info.anh_dai_dien" },
          san_phams:{
              $push:{
                  san_pham : {
                        san_pham_id : "$gio_hang.san_pham.san_pham_id",
                        ten_san_pham:"$san_pham_info.ten_san_pham",
                        ten_phan_loai : "$gio_hang.san_pham.ten_phan_loai",
                        ten_kich_co : "$gio_hang.san_pham.ten_kich_co",
                        anh_bia: "$san_pham_info.anh_bia",                                                                        
                    },                    
                    so_luong : "$gio_hang.so_luong"
              }         
          }
      }
  },
])






// truy vấn lấy ra danh sách giỏ hàng của người dùng theo cấu trúc từng cửa hàng
//đầy đủ nó nằm ở trong function getCarts của model nguoi_dung
db.nguoi_dung.aggregate([
   {
    $unwind: "$gio_hang"
  },
  {
    $lookup: {
      from: "san_pham",
      localField: "gio_hang.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
    }
  }, 
  {
    $unwind: "$san_pham_info"
  },
  {
    $match: {
        "_id":ObjectId("64e585130a81481311402e00"),     
    }
  },
  {
     $unwind: { path: "$san_pham_info.phan_loais", preserveNullAndEmptyArrays: true }
  },
  {
    $match: {
     $expr: {
       $or: [      
      {
       
          $eq: ["$san_pham_info.phan_loais.ten_phan_loai", null]        
      },
      {
          $eq: ["$san_pham_info.phan_loais.ten_phan_loai", "$gio_hang.san_pham.ten_phan_loai"]        
      }
    ]    
    }
    }
  },
  {
     $unwind: { path: "$san_pham_info.phan_loais.kich_co_phan_loais", preserveNullAndEmptyArrays: true }
  },
  {
    $match: {
     $expr: {
       $or: [      
          {
           
              $eq: ["$san_pham_info.phan_loais.kich_co_phan_loais", null]        
          },
          {
              $eq: ["$san_pham_info.phan_loais.kich_co_phan_loais.ten_kich_co", "$gio_hang.san_pham.ten_kich_co"]        
          }
        ]    
       }
    }
  },
  {
    $lookup: {
      from: "cua_hang",
      localField: "san_pham_info.cua_hang_id",
      foreignField: "_id",
      as: "cua_hang_info"
    }
  }, 
  {
    $unwind: "$cua_hang_info"
  },
  {
      $group:{
          _id:"$san_pham_info.cua_hang_id",
          ten_cua_hang: { $first: "$cua_hang_info.ten_cua_hang" },
          anh_dai_dien: { $first: "$cua_hang_info.anh_dai_dien" },
          san_phams:{
              $push:{
                  san_pham : {
                        san_pham_id : "$gio_hang.san_pham.san_pham_id",                        
                        ten_san_pham : "$san_pham_info.ten_san_pham",
                        danh_muc_id : '$san_pham_info.danh_muc_id',
                        anh_bia: "$san_pham_info.anh_bia",  
                        so_luong_ton: "$san_pham_info.so_luong_ton",
                        ten_phan_loai: '$gio_hang.san_pham.ten_phan_loai',
                        ten_kich_co: '$gio_hang.san_pham.ten_kich_co',
                        gia_hien_tai: {
                          $cond: {
                              if: "$san_pham_info.phan_loais.kich_co_phan_loais.gia_hien_tai",
                              then: "$san_pham_info.phan_loais.kich_co_phan_loais.gia_hien_tai",
                              else: {
                                  $cond: {
                                      if: "$san_pham_info.phan_loais.gia_hien_tai",
                                      then: "$san_pham_info.phan_loais.gia_hien_tai",
                                      else: "$san_pham_info.gia_hien_tai"
                                  }
                              }
                          }
                        },                        
                        giam_gia:"$san_pham_info.giam_gia",
                        ngay_bat_dau:"$san_pham_info.ngay_bat_dau",
                        ngay_ket_thuc:"$san_pham_info.ngay_ket_thuc", 
                        so_luong_gioi_han: "$san_pham_info.so_luong_gioi_han",                                                                                                                                                                
                    },                    
                    so_luong : "$gio_hang.so_luong"
              }         
          }
      }
  },
])




//truy vấn sản phẩm với từng phân loại tách ra
db.san_pham.aggregate([
  {
     $unwind: { path: "$phan_loais", preserveNullAndEmptyArrays: true }
  },
  {
     $unwind: { path: "$phan_loais.kich_co_phan_loais", preserveNullAndEmptyArrays: true }
  },
  {
    $match: {
       $and: [  
          {
          "_id": ObjectId("64e5aa29b0028bed9fe92a98")
            },
            {
              "phan_loais.ten_phan_loai": "Bản 256GB"
            },
            {
              "phan_loais.kich_co_phan_loais.ten_kich_co": "Like new 70%"
            }      
        ]    

    }
  },
])















db.san_pham.aggregate([
  {
      $project:{
          "san_pham_id":{
                $toString: "$_id"
            },
           "cua_hang_id":{
                $toString: "$cua_hang_id"
            },
      }
            
  },  
    {
    $lookup: {
      from: "nguoi_dung",
      localField: "san_pham_id",
      foreignField: "gio_hang.san_pham.san_pham_id",
      as: "nguoi_dung_info"
    }
  }, 
  {
    $unwind: "$nguoi_dung_info"
  },
  {
    $unwind: "$nguoi_dung_info.gio_hang"
  },
  {
    $project: {
        "nguoi_dung_id":{
                $toString: "$nguoi_dung_info._id"
            },
        "san_pham_id":1,
        "cua_hang_id":1,
        "gio_hang":"$nguoi_dung_info.gio_hang"
             
    }
  },
   {
    $match: {
        "nguoi_dung_id":"64e585130a81481311402e00",     
    }
  },
  {
    $lookup: {
      from: "cua_hang",
      localField: "cua_hang_id",
      foreignField: "_id",
      as: "cua_hang_info"
    }
  }, 
])



use ThuongMaiDienTu;
//truy vấn sản phẩm với từng phân loại tách ra
db.cua_hang.aggregate([
  {
     $unwind: "$khuyen_mais"
  },
  {
    $match: {  "khuyen_mais.ma_khuyen_mai": "hihihi1"}
  },
  {
      $project:{
          "khuyen_mais":1
      }
  }
])


db.cua_hang.find({khuyen_mais:{$elemMatch:{ma_khuyen_mai:"hihihi1"}}},{"khuyen_mais.$":1})



//lấy nhiều đơn hàng cho người mua
db.don_hang.aggregate([
  {
      $match:{
        nguoi_dung_id:ObjectId("64e585130a81481311402e00")
      }
  },
  {
      $unwind:"$chi_tiet_don_hangs"
  },
  {
      $lookup: {
        from: "san_pham",
        localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
        foreignField: "_id",
        as: "san_pham_info"
      }
  },
  {
      $unwind:"$san_pham_info"
  },
  {
      $lookup: {
        from: "cua_hang",
        localField: "cua_hang_id",
        foreignField: "_id",
        as: "cua_hang_info"
      }
  },
  {
      $unwind:"$cua_hang_info"
  },
   {
      $group:{
          _id:"$_id",
          cua_hang_id:{$first:"$cua_hang_id"},
          ten_cua_hang:{$first:"$cua_hang_info.ten_cua_hang"},
          ngay_dat_hang:{$first:"$ngay_dat_hang"},            
          thanh_tien:{$first:"$thanh_tien"},
          trang_thai:{$first:"$trang_thai"},
          chi_tiet_don_hangs:{$push:{
              san_pham:{
                  san_pham_id:"$chi_tiet_don_hangs.san_pham.san_pham_id",
                  ten_san_pham:"$san_pham_info.ten_san_pham",
                  anh_bia:"$san_pham_info.anh_bia",
                  ten_phan_loai:"$chi_tiet_don_hangs.san_pham.ten_phan_loai",
                  ten_kich_co:"$chi_tiet_don_hangs.san_pham.ten_kich_co",
              },
              don_gia:"$chi_tiet_don_hangs.don_gia",
              so_luong:"$chi_tiet_don_hangs.so_luong",                
          }},
      }
  },
  {
      $match:{
           $and:[
           {"trang_thai.Chờ xác nhận":{$ne:null}},
           {"trang_thai.Đang xử lý":{$eq:null}}             
           ]
      }
  }
])



//lấy 1 đơn hàng cho người mua
db.don_hang.aggregate([
  {
      $match:{
          _id:ObjectId("656d9c5bf5b15703a40e1810"),
          nguoi_dung_id:ObjectId("64e585130a81481311402e00"),
      }
  },
  {
      $unwind:"$chi_tiet_don_hangs"
  },
  {
      $lookup: {
        from: "san_pham",
        localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
        foreignField: "_id",
        as: "san_pham_info"
      }
  },
  {
      $unwind:"$san_pham_info"
  },
  {
      $lookup: {
        from: "cua_hang",
        localField: "cua_hang_id",
        foreignField: "_id",
        as: "cua_hang_info"
      }
  },
  {
      $unwind:"$cua_hang_info"
  },  
   {
      $group:{
          _id:"$_id",
          cua_hang_id:{$first:"$cua_hang_id"},
          ten_cua_hang:{$first:"$cua_hang_info.ten_cua_hang"},
          ngay_dat_hang:{$first:"$don_hang_info.ngay_dat_hang"},                        
          chi_tiet_don_hangs:{$push:{
              san_pham:{
                  san_pham_id:"$chi_tiet_don_hangs.san_pham.san_pham_id",
                  ten_san_pham:"$san_pham_info.ten_san_pham",
                  anh_bia:"$san_pham_info.anh_bia",
                  ten_phan_loai:"$chi_tiet_don_hangs.san_pham.ten_phan_loai",
                  ten_kich_co:"$chi_tiet_don_hangs.san_pham.ten_kich_co",
              },
              don_gia:"$chi_tiet_don_hangs.don_gia",
              so_luong:"$chi_tiet_don_hangs.so_luong",  
              danh_gia:"$chi_tiet_don_hangs.danh_gia",               
          }},                        
          ma_voucher_cua_hang:{$first:"$ma_voucher_cua_hang"},
          vouchers:{$first:"$vouchers"},
          phuong_thuc_van_chuyen:{$first:"$phuong_thuc_van_chuyen"}, 
          phuong_thuc_thanh_toan:{$first:"$phuong_thuc_thanh_toan"},
          dia_chi_giao_hang:{$first:"$dia_chi_giao_hang"},
          trang_thai:{$first:"$trang_thai"},
          thanh_tien:{$first:"$thanh_tien"},
      }
  },    
])


//lấy nhiều đơn hàng cho người bán

db.don_hang.aggregate([
  {
      $match:{
          cua_hang_id:ObjectId("64e58b05d91cecfb0f143089")
      }
  },
  {
      $unwind:"$chi_tiet_don_hangs"
  },
  {
      $lookup: {
      from: "san_pham",
      localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
  }
  },
  {
      $unwind:"$san_pham_info"
  },
  {
    $group:{
        _id:"$_id",
        cua_hang_id:{$first:"$cua_hang_id"},
        ngay_dat_hang:{$first:"$ngay_dat_hang"},            
        thanh_tien:{$first:"$thanh_tien"},
        trang_thai:{$first:"$trang_thai"},
        chi_tiet_don_hangs:{$push:{
            san_pham:{
                san_pham_id:"$chi_tiet_don_hangs.san_pham.san_pham_id",
                ten_san_pham:"$san_pham_info.ten_san_pham",
                anh_bia:"$san_pham_info.anh_bia",
                ten_phan_loai:"$chi_tiet_don_hangs.san_pham.ten_phan_loai",
                ten_kich_co:"$chi_tiet_don_hangs.san_pham.ten_kich_co",
            },
            don_gia:"$chi_tiet_don_hangs.don_gia",
            so_luong:"$chi_tiet_don_hangs.so_luong",                
        }},
    }
  },
    {
    $match:{
         $and:[
         {"trang_thai.Chờ xác nhận":{$ne:null}},
         {"trang_thai.Đang xử lý":{$eq:null}}             
         ]
    }
}
])

//Lấy 1 đơn hàng cho người bán:


db.don_hang.aggregate([
  {       
     $match:{
        $and:[
            {_id:ObjectId("656d888af5b15703a40e180a")},
            {cua_hang_id:ObjectId('64e58b05d91cecfb0f143089')}
        ]
    } 
  },
{
    $lookup: {
      from: "san_pham",
      localField: "chi_tiet_don_hangs.san_pham.san_pham_id",
      foreignField: "_id",
      as: "san_pham_info"
    }
},
{
    $unwind:"$san_pham_info"
},
   {
    $group:{
        _id:"$_id",
        ngay_dat_hang:{$first:"$ngay_dat_hang"},                        
        chi_tiet_don_hangs:{$push:{
            san_pham:{
                san_pham_id:"$chi_tiet_don_hangs.san_pham.san_pham_id",
                ten_san_pham:"$san_pham_info.ten_san_pham",
                anh_bia:"$san_pham_info.anh_bia",
                ten_phan_loai:"$chi_tiet_don_hangs.san_pham.ten_phan_loai",
                ten_kich_co:"$chi_tiet_don_hangs.san_pham.ten_kich_co",
            },
            don_gia:"$chi_tiet_don_hangs.don_gia",
            so_luong:"$chi_tiet_don_hangs.so_luong",  
            danh_gia:"$chi_tiet_don_hangs.danh_gia",               
        }},                        
        ma_voucher_cua_hang:{$first:"$ma_voucher_cua_hang"},
        vouchers:{$first:"$vouchers"},
        phuong_thuc_van_chuyen:{$first:"$phuong_thuc_van_chuyen"}, 
        phuong_thuc_thanh_toan:{$first:"$phuong_thuc_thanh_toan"},
        dia_chi_giao_hang:{$first:"$dia_chi_giao_hang"},
        trang_thai:{$first:"$trang_thai"},
        thanh_tien:{$first:"$thanh_tien"},
    }
},
])





//load đánh giá sản phẩm
db.don_hang.aggregate([
  {
      $unwind:"$chi_tiet_don_hangs"        
  }, 
  {
      $match:{
          $and:[
              {"chi_tiet_don_hangs.san_pham.san_pham_id":ObjectId("64e5aa29b0028bed9fe92a98")},
              {"chi_tiet_don_hangs.danh_gia":{$ne:null}}
          ]
      }
  },
  {
      $lookup: {
        from: "nguoi_dung",
        localField: "nguoi_dung_id",
        foreignField: "_id",
        as: "nguoi_danh_gia"
      }
},
{
      $unwind:"$nguoi_danh_gia"        
  },
{
    $project:{
        nguoi_dung_id:"$nguoi_danh_gia._id",
        ten_dang_nhap:"$nguoi_danh_gia.ten_dang_nhap",
        ho_ten:"$nguoi_danh_gia.ho_ten",
        anh_dai_dien:"$nguoi_danh_gia.anh_dai_dien",
        danh_gia:"$chi_tiet_don_hangs.danh_gia"  
    }
}
])


//truy vấn shopbee voucher 

db.shopbee_vouchers.aggregate([
  {
      $unwind:"$vouchers"
  }, 
  {
      $match:{
          $and:[
              {
                  "vouchers.ngay_ket_thuc":{
                  $gt:new Date()
                  }
              },
              {
                  $or:[
                      {
                          "vouchers.cua_hangs":{
                              $eq:null
                          }
                      },
                      {
                        "vouchers.cua_hangs":{
                            $size:0
                        }
                      },
                      {
                           "vouchers.cua_hangs":{
                                $in:[ObjectId("64e58b05d91cecfb0f143089"),ObjectId("64f2e47bae66307f58914da4"),ObjectId("64f2e47bae66307f58914da5")]
                           }  
                      },                        
                  ]
              }         
          ]            
      }
  },       
  {
      $lookup: {
          from: "danh_muc", // Tên của collection bạn muốn kết nối
          localField: "vouchers.danh_mucs",
          foreignField: "_id", // Trường trong collection_name để so sánh
          as: "danh_mucs"
      }
  },
  {
      $unwind: { path: "$danh_mucs", preserveNullAndEmptyArrays: true }
  },
  {
      $graphLookup: {
        from: "danh_muc",
        startWith: "$danh_mucs.danh_muc_cha_id",
        connectFromField: "danh_muc_cha_id",
        connectToField: "_id",
        as: "danh_muc_cha",
        depthField: "depth",
      }
  },
  {
      $lookup: {
          from: "phuong_thuc_van_chuyen", 
          localField: "vouchers.phuong_thuc_van_chuyens",
          foreignField: "_id", 
          as: "phuong_thuc_van_chuyens"
      }
  },
  {
      $lookup: {
          from: "phuong_thuc_thanh_toan", 
          localField: "vouchers.phuong_thuc_thanh_toans",
          foreignField: "_id", 
          as: "phuong_thuc_thanh_toans"
      }
  },
  {
    $unwind: { path: "$phuong_thuc_van_chuyens", preserveNullAndEmptyArrays: true }
},
{
  $unwind: { path: "$phuong_thuc_thanh_toans", preserveNullAndEmptyArrays: true }
},
  {
      $group:{
          _id:"$vouchers.ma_voucher",
           loai_voucher_id:{
               $first:"$_id"
           },
           loai_voucher:{
              $first:"$loai_voucher"
          },
          loai_chi_phi_ap_dung:{
              $first:"$loai_chi_phi_ap_dung"
          },
          vouchers:{
              $first:"$vouchers"
          },
          danh_mucs:{
              $push:"$danh_mucs"
          },
          danh_muc_cha:{
              $push:"$danh_muc_cha"
          },
          phuong_thuc_van_chuyens:{
              $addToSet:"$phuong_thuc_van_chuyens"
          },
          phuong_thuc_thanh_toans:{
              $addToSet:"$phuong_thuc_thanh_toans"
          },
      }       
  },
  {
      $project:{
          loai_voucher_id:1,
          loai_voucher:1,
          loai_chi_phi_ap_dung:1,
          vouchers:{
              ma_voucher:"$vouchers.ma_voucher",
              ten_voucher:"$vouchers.ten_voucher",
              ty_le_giam_gia:"$vouchers.ty_le_giam_gia",
              don_hang_toi_thieu:"$vouchers.don_hang_toi_thieu",
              so_luong:"$vouchers.so_luong",
              muc_giam_toi_da:"$vouchers.muc_giam_toi_da",
              ngay_bat_dau:"$vouchers.ngay_bat_dau",
              ngay_ket_thuc:"$vouchers.ngay_ket_thuc",
              doi_tuong_tham_chieu:"$vouchers.doi_tuong_tham_chieu",
              cua_hangs:"$vouchers.cua_hangs",
              danh_mucs:"$danh_mucs",
              danh_muc_cha:"$danh_muc_cha",
              phuong_thuc_van_chuyens:"$phuong_thuc_van_chuyens",
              phuong_thuc_thanh_toans:"$phuong_thuc_thanh_toans",
          }
      }
  },
  {
      $group:{
          _id:"$loai_voucher_id",
          loai_voucher:{
              $first:"$loai_voucher"
          },
          loai_chi_phi_ap_dung:{
              $first:"$loai_chi_phi_ap_dung"
          },
          vouchers:{
              $push:"$vouchers"
          }            
      }
  }
])



//Lấy những sản phẩm trong giỏ hàng của người dùng thuộc về 1 của hàng nào đó
db.nguoi_dung.aggregate([
  {
      $match:{
          _id:ObjectId("64e585130a81481311402e00")
      }        
  },
  {
      $unwind:"$gio_hang"
  },
   {
  $lookup: {
    from: "san_pham",
    localField: "gio_hang.san_pham.san_pham_id",
    foreignField: "_id",
    as: "san_pham_info"
  }
}, 
{
  $unwind: "$san_pham_info"
},
{
    $match:{
        "san_pham_info.cua_hang_id":ObjectId("64f2e47bae66307f58914da4")
    }
},
{
    $group:{
        _id:"$san_pham_info.cua_hang_id",
        san_phams:{
            $addToSet:"$san_pham_info._id"
        }
    }
}
])


//đang diễn ra
db.cua_hang.aggregate([
  {
      $match:{
          _id:ObjectId("64e58b05d91cecfb0f143089")
      }
  },
  {
      $unwind:"$khuyen_mais"
  },
  {
      $match:{
          $and:[
              {
                  "khuyen_mais.ngay_bat_dau":{
                      $lte:new Date()
                  }
              },
              {
                  "khuyen_mais.ngay_ket_thuc":{
                      $gte:new Date()
                  }
              }
          ]
      }
  },
  {
      $project:{
          ma_khuyen_mai:"$khuyen_mais.ma_khuyen_mai",
          ty_le_giam_gia:"$khuyen_mais.ty_le_giam_gia",
          don_hang_toi_thieu:"$khuyen_mais.don_hang_toi_thieu",
          so_luong:"$khuyen_mais.so_luong",
          muc_giam_toi_da:"$khuyen_mais.muc_giam_toi_da",
          ngay_bat_dau:"$khuyen_mais.ngay_bat_dau",
          ngay_ket_thuc:"$khuyen_mais.ngay_ket_thuc",                                                                        
      }
  }    
])




//sắp diễn ra
db.cua_hang.aggregate([
  {
      $match:{
          _id:ObjectId("64e58b05d91cecfb0f143089")
      }
  },
  {
      $unwind:"$khuyen_mais"
  },
  {
      $match:{
          $and:[
              {
                  "khuyen_mais.ngay_bat_dau":{
                      $gt:new Date()
                  }
              },                
          ]
      }
  },   
  {
      $project:{
          ma_khuyen_mai:"$khuyen_mais.ma_khuyen_mai",
          ty_le_giam_gia:"$khuyen_mais.ty_le_giam_gia",
          don_hang_toi_thieu:"$khuyen_mais.don_hang_toi_thieu",
          so_luong:"$khuyen_mais.so_luong",
          muc_giam_toi_da:"$khuyen_mais.muc_giam_toi_da",
          ngay_bat_dau:"$khuyen_mais.ngay_bat_dau",
          ngay_ket_thuc:"$khuyen_mais.ngay_ket_thuc",                                                                        
      }
  }    
])





//đã kết thúc
db.cua_hang.aggregate([
  {
      $match:{
          _id:ObjectId("64e58b05d91cecfb0f143089")
      }
  },
  {
      $unwind:"$khuyen_mais"
  },
  {
      $match:{
          $and:[
              {
                  "khuyen_mais.ngay_ket_thuc":{
                      $lt:new Date()
                  }
              },                
          ]
      }
  },   
  {
      $project:{
          ma_khuyen_mai:"$khuyen_mais.ma_khuyen_mai",
          ty_le_giam_gia:"$khuyen_mais.ty_le_giam_gia",
          don_hang_toi_thieu:"$khuyen_mais.don_hang_toi_thieu",
          so_luong:"$khuyen_mais.so_luong",
          muc_giam_toi_da:"$khuyen_mais.muc_giam_toi_da",
          ngay_bat_dau:"$khuyen_mais.ngay_bat_dau",
          ngay_ket_thuc:"$khuyen_mais.ngay_ket_thuc",                                                                        
      }
  }    
])

db.don_hang.aggregate([
  {
      $match:{
          $and:[
               {
                   cua_hang_id:ObjectId("64e58b05d91cecfb0f143089")
               },
               {
                   ngay_dat_hang:{
                      $gte:new Date("08-24-2023")                
                  }, 
               },
               {
                   ngay_dat_hang:{
                      $lte:new Date("09-23-2023")                
                  }, 
               }
          ]
      }  
  },
//    {
//        $group:{
//            _id:"$cua_hang_id",            
//            tong_thanh_tien:{
//                $sum:"$thanh_tien"
//            }
//        }        
//    }
])

db.don_hang.aggregate([
  {
      $unwind:"$chi_tiet_don_hangs"        
  },
  {
      $match:{
          $and:[
               {
                   cua_hang_id:ObjectId("64e58b05d91cecfb0f143089")
               },
               {
                   'chi_tiet_don_hangs.san_pham.san_pham_id':ObjectId("650fd233e31fbec7c7fb3be4"),
               },
               {
                   ngay_dat_hang:{
                      $gte:new Date("08-24-2023")                
                  }, 
               },
               {
                   ngay_dat_hang:{
                      $lte:new Date("12-23-2023")                
                  }, 
               }
          ]
      }  
  },
  {
      $group:{
          _id:"$cua_hang_id",            
          tong_thanh_tien:{
              $sum:{
                  $multiply:['$chi_tiet_don_hangs.don_gia','$chi_tiet_don_hangs.so_luong']
              }
          }
      }        
  }
])
