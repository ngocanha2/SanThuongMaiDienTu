using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using DAL;
using DTO;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using MongoDB.Bson;
namespace WindowsFormsApp1
{
    public partial class frm_Store : Form
    {
        StoreDAL storeDAL = new StoreDAL();
        DataTable dtChiTiet = new DataTable();
        public frm_Store()
        {
            InitializeComponent();
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            dtChiTiet = get_Store();
            data_CuaHang.DataSource = dtChiTiet;
            data_Binding();
        }

        #region Lấy danh sách cửa hàng
        public DataTable get_Store()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Tên cửa hàng", typeof(string));
            dt.Columns.Add("Địa chỉ", typeof(string));
            dt.Columns.Add("Ngày đăng ký", typeof(DateTime));
            dt.Columns.Add("Số điện thoại", typeof(string));
            dt.Columns.Add("Chữ ký", typeof(string));
            dt.Columns.Add("Lượt truy cập", typeof(int));
            dt.Columns.Add("Hoạt động", typeof(bool));
            dt.Columns.Add("Khóa", typeof(bool));
            IMongoQueryable<Store> stores = storeDAL.load_Store();
            foreach (var s in stores)
            {
                dt.Rows.Add(s.Id, s.ten_cua_hang, s.dia_chi,
                    s.ngay_dang_ky, s.so_dien_thoai,s.chu_ky,
                    s.luot_truy_cap,s.trang_thai_hoat_dong, s.khoa);
            }         
            return dt;
        }
        #endregion

        private void dataGridView1_CellClick(object sender, DataGridViewCellEventArgs e)
        {
            //string id = data_CuaHang.CurrentRow.Cells[0].Value.ToString();
            //string ten = data_CuaHang.CurrentRow.Cells[1].Value.ToString();
            //string diaChi = data_CuaHang.CurrentRow.Cells[2].Value.ToString();
            //string ngayDK = data_CuaHang.CurrentRow.Cells[3].Value.ToString();
            //string sdt = data_CuaHang.CurrentRow.Cells[4].Value.ToString();
            //string chuKy = data_CuaHang.CurrentRow.Cells[5].Value.ToString();
            //string truyCap = data_CuaHang.CurrentRow.Cells[6].Value.ToString();
            //string hoatDong = data_CuaHang.CurrentRow.Cells[7].Value.ToString();
            //txt_ID.Text = id;
            //txt_TenCH.Text = ten;
            //txt_DiaChi.Text = diaChi;
            //txt_NgayDK.Text = ngayDK;
            //txt_SDT.Text = sdt;
            //txt_ChuKy.Text = chuKy;
            //txt_TruyCap.Text = truyCap;
            //txt_HD.Text = hoatDong;
        }
        
        #region Binding
        public void data_Binding()
        {
            txt_ID.DataBindings.Clear();
            Binding bd = new Binding("Text", dtChiTiet, "ID", true, DataSourceUpdateMode.Never);
            txt_ID.DataBindings.Add(bd);

            txt_TenCH.DataBindings.Clear();
            Binding bd1 = new Binding("Text", dtChiTiet, "Tên cửa hàng", true, DataSourceUpdateMode.Never);
            txt_TenCH.DataBindings.Add(bd1);

            txt_DiaChi.DataBindings.Clear();
            Binding bd2 = new Binding("Text", dtChiTiet, "Địa chỉ", true, DataSourceUpdateMode.Never);
            txt_DiaChi.DataBindings.Add(bd2);

            txt_NgayDK.DataBindings.Clear();
            Binding bd3 = new Binding("Text", dtChiTiet, "Ngày đăng ký", true, DataSourceUpdateMode.Never);
            txt_NgayDK.DataBindings.Add(bd3);

            txt_SDT.DataBindings.Clear();
            Binding bd4 = new Binding("Text", dtChiTiet, "Số điện thoại", true, DataSourceUpdateMode.Never);
            txt_SDT.DataBindings.Add(bd4);

            txt_ChuKy.DataBindings.Clear();
            Binding bd5 = new Binding("Text", dtChiTiet, "Chữ ký", true, DataSourceUpdateMode.Never);
            txt_ChuKy.DataBindings.Add(bd5);

            txt_TruyCap.DataBindings.Clear();
            Binding bd6 = new Binding("Text", dtChiTiet, "Lượt truy cập", true, DataSourceUpdateMode.Never);
            txt_TruyCap.DataBindings.Add(bd6);

            txt_HD.DataBindings.Clear();
            Binding bd7 = new Binding("Text", dtChiTiet, "Hoạt động", true, DataSourceUpdateMode.Never);
            txt_HD.DataBindings.Add(bd7);

            txt_Khoa.DataBindings.Clear();
            Binding bd8 = new Binding("Text", dtChiTiet, "Khóa", true, DataSourceUpdateMode.Never);
            txt_Khoa.DataBindings.Add(bd8);


        }
        #endregion

        #region Nút lưu
        private void btn_Luu_Click(object sender, EventArgs e)
        {
            if(check_HoatDong())
            {     
                storeDAL.update_Store(ObjectId.Parse(txt_ID.Text), true,"_id","trang_thai_hoat_dong");
            }
            else
            {
                storeDAL.update_Store(ObjectId.Parse(txt_ID.Text), false, "_id", "trang_thai_hoat_dong");
            }    
        }
        #endregion

        #region Kiểm tra trạng thái hoạt động
        private bool check_HoatDong()
        {
            string hoatDong = data_CuaHang.CurrentRow.Cells[7].Value.ToString();
            if (hoatDong.Equals("True"))
                return true;
            return false;
        }
        #endregion

        #region Kiểm tra khóa
        private bool check_Khoa()
        {
            string khoa = data_CuaHang.CurrentRow.Cells[8].Value.ToString();
            if (khoa.Equals("True"))
                return true;
            return false;
        }
        #endregion

        #region Nút xóa
        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            if (check_Khoa())
            {
                storeDAL.update_Store(ObjectId.Parse(txt_ID.Text), true, "_id", "khoa");
            }
            else
            {
                storeDAL.update_Store(ObjectId.Parse(txt_ID.Text), false, "_id", "khoa");
            }
        }
        #endregion
    }
}
