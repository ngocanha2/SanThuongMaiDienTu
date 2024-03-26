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
    public partial class frm_Shipp : Form
    {
        ShippDAL shipDAL = new ShippDAL();
        DataTable dtChiTiet = new DataTable();
        bool flag = true;
        string dongKiem = "";
        public frm_Shipp()
        {
            InitializeComponent();
        }

        private void frm_Voucher_Load(object sender, EventArgs e)
        {
            get_GridviewShipp();
        }
        public void get_GridviewShipp()
        {
            dtChiTiet = get_Shipp();
            data_Shipp.DataSource = dtChiTiet;

            foreach (DataGridViewRow r in data_Shipp.Rows)
            {
                if (r.Cells["Đồng kiểm"].Value != null)
                {
                    dongKiem = r.Cells["Đồng kiểm"].Value.ToString();
                }
                data_Binding();
            }
        }
        public DataTable get_Shipp()
        {
                DataTable dt = new DataTable();
                dt.Columns.Add("ID", typeof(string));
                dt.Columns.Add("Tên phương thức", typeof(string));
                dt.Columns.Add("Thời gian", typeof(int));
                dt.Columns.Add("Chi phí", typeof(double));
                dt.Columns.Add("Mặc định", typeof(bool));
                dt.Columns.Add("Đồng kiểm", typeof(bool));
                dt.Columns.Add("Khóa", typeof(bool));
                IMongoQueryable<Shipp> shipps = shipDAL.load_Shipp();
                foreach (var s in shipps)
                {
                    dt.Rows.Add(s._id, s.ten_phuong_thuc_van_chuyen, s.thoi_gian_uoc_tinh,
                        s.chi_phi, s.mac_dinh, s.dong_kiem, s.khoa);
                }
                return dt;
        }

        #region Binding
        public void data_Binding()
        {
            txt_ID.DataBindings.Clear();
            Binding bd = new Binding("Text", dtChiTiet, "ID", true, DataSourceUpdateMode.Never);
            txt_ID.DataBindings.Add(bd);

            txt_TenPT.DataBindings.Clear();
            Binding bd1 = new Binding("Text", dtChiTiet, "Tên phương thức", true, DataSourceUpdateMode.Never);
            txt_TenPT.DataBindings.Add(bd1);

            txt_TG.DataBindings.Clear();
            Binding bd2 = new Binding("Text", dtChiTiet, "Thời gian", true, DataSourceUpdateMode.Never);
            txt_TG.DataBindings.Add(bd2);

            txt_ChiPhi.DataBindings.Clear();
            Binding bd3 = new Binding("Text", dtChiTiet, "Chi phí", true, DataSourceUpdateMode.Never);
            txt_ChiPhi.DataBindings.Add(bd3);

            txt_MacDinh.DataBindings.Clear();
            Binding bd4 = new Binding("Text", dtChiTiet, "Mặc định", true, DataSourceUpdateMode.Never);
            txt_MacDinh.DataBindings.Add(bd4);
        }
        #endregion

        #region Nút thêm
        private void btn_Them_Click(object sender, EventArgs e)
        {
            flag = true;
            txt_ID.Clear();
            txt_TenPT.Clear();
            txt_TG.Clear();
            txt_ChiPhi.Clear();
            txt_MacDinh.Clear();
        }
        #endregion

        #region Nút lưu
        private void btn_Luu_Click(object sender, EventArgs e)
        {
            string tenPT = "";
            //Check chưa nhập
            if (txt_TenPT.Text == "" || txt_TG.Text == "" || txt_ChiPhi.Text == ""
                || txt_MacDinh.Text == "")
            {
                MessageBox.Show("Vui lòng nhập đầy đủ thông tin");
                return;
            }
            //Combobox đồng kiểm => true/false
            bool dongKiem;
            if (cbo_DongKiem.SelectedItem.ToString() == "Được đồng kiểm")
            {
                dongKiem = true;
            }
            else
            {
                dongKiem = false;
            }

            //Thêm
            if (flag)
            {
                //check trùng tên PT
                foreach (DataGridViewRow r in data_Shipp.Rows)
                {
                    if (r.Cells["Tên phương thức"].Value != null)
                    {
                        tenPT = r.Cells["Tên phương thức"].Value.ToString();
                    }
                    if (tenPT == txt_TenPT.Text)
                    {
                        MessageBox.Show("Tên phương thức đã tồn tại");
                        return;
                    }
                }
                shipDAL.insert_Shipp(txt_TenPT.Text, int.Parse(txt_TG.Text),
                    int.Parse(txt_ChiPhi.Text), bool.Parse(txt_MacDinh.Text),
                    dongKiem);
                MessageBox.Show("Thêm thành công");
            }
            if(!flag)
            {
                
                shipDAL.update_Ship(ObjectId.Parse(txt_ID.Text), txt_TenPT.Text,
                int.Parse(txt_TG.Text), dongKiem,int.Parse(txt_ChiPhi.Text),
                bool.Parse(txt_MacDinh.Text));
                MessageBox.Show("Cập nhật thành công");
                //shipDAL.update_Ship(ObjectId.Parse(txt_ID.Text), txt_TenPT.Text,
                //int.Parse(txt_TG.Text), bool.Parse(txt_DongKiem.Text));
            }    
            get_GridviewShipp();
        }
        #endregion

        #region Nút sửa
        private void btn_Sua_Click(object sender, EventArgs e)
        {
            flag = false;
            MessageBox.Show("Vui lòng chọn dòng để sửa");
        }
        #endregion

        #region Binding bool đồng kiểm
        private void data_Shipp_CellFormatting(object sender, DataGridViewCellFormattingEventArgs e)
        {
            if (e.ColumnIndex == 5 && e.RowIndex >= 0) // Thay yourBoolColumnIndex bằng chỉ số của cột bool trong DataGridView
            {
                DataGridViewCell cell = data_Shipp.Rows[e.RowIndex].Cells[e.ColumnIndex];
                if (cell.Value != null && cell.Value is bool)
                {
                    bool value = (bool)cell.Value;
                    if (value)
                    {
                        cbo_DongKiem.Text = "Được đồng kiểm";
                    }
                    else
                    {
                        cbo_DongKiem.Text = "Không đồng kiểm";
                    }
                }
            }
        }
        #endregion

        #region Nút xóa
        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            DialogResult r = MessageBox.Show("Bạn có muốn xóa?", "Thông báo", MessageBoxButtons.YesNo);
            if (r == DialogResult.Yes)
            {
                shipDAL.delete_Ship(ObjectId.Parse(txt_ID.Text.Trim()), true);
                get_GridviewShipp();
            }
            else
                return;
        }
        #endregion 
    }
}
