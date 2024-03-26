using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace DTO
{
    public class Voucher
    {
        [BsonId]
        ObjectId _id { get; set; }
        public string ten_voucher { get; set; }
        public string ma_voucher { get; set; }
        public double ty_le_giam_gia { get; set; }
        public double don_hang_toi_thieu { get; set; }
        public DateTime ngay_bat_dau { get; set; }
        public DateTime ngay_ket_thuc { get; set; }
    }
}
