using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class Sale
    {
        public string ten_khuyen_mai { get; set; }
        public string ma_khuyen_mai { get; set; }
        public double ty_le_giam_gia { get; set; }
        public double don_hang_toi_thieu { get; set; }
        public int so_luong { get; set; }
        public double muc_giam_toi_da { get; set; }
        public DateTime ngay_bat_dau { get; set; }
        public DateTime ngay_ket_thuc { get; set; }
    }
}
