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
using MongoDB.Driver.Linq;
using MongoDB.Driver;
using MongoDB.Bson;
using System.IO;

namespace WindowsFormsApp1
{
    public partial class frm_DanhMuc : Form
    {
        Anh_DanhMucDAL DAL_DanhMuc = new Anh_DanhMucDAL();
        DataTable dtDanhMucCha = new DataTable();
        DataTable dtDanhMucCon = new DataTable();
        DataTable dtCombobox = new DataTable();
        List<DataTable> history = new List<DataTable>();

        int flagChoose = 1;
       
        public frm_DanhMuc()
        {
            InitializeComponent();
        }

        private void frm_DanhMuc_Load(object sender, EventArgs e)
        {
            txt_MaDanhMuc.Enabled = false;
            dtDanhMucCha = loadData();
            dgv_left.DataSource = dtDanhMucCha;
            loadCombobox();
            ChosseFirstIndex();
        }

        #region binding
        public void bindingLeft() {
            int vt = dgv_left.SelectedRows[0].Index;
            txt_MaDanhMuc.Text = dgv_left.Rows[vt].Cells[0].Value.ToString();
            txt_TenDanhMuc.Text = dgv_left.Rows[vt].Cells[1].Value.ToString();
            // MessageBox.Show(dgv_left.Rows[vt].Cells[2].Value.ToString());
            if (dgv_left.Rows[vt].Cells[2].Value.ToString() == "" || dgv_left.Rows[vt].Cells[2].Value.ToString() == ObjectId.Empty.ToString())
            {
                cbo_DanhMucCha.SelectedValue = "1";
            }
            else
            {
                cbo_DanhMucCha.SelectedValue = dgv_left.Rows[vt].Cells[2].Value.ToString();
            }
            string base64image = dgv_left.Rows[vt].Cells[3].Value.ToString();
            if (base64image != null)
            {
                Image image = Base64ToImage(base64image);
                if (image != null)
                {
                    ptb_HinhAnh.Image = image;
                    ptb_HinhAnh.SizeMode = PictureBoxSizeMode.Zoom;
                    return;
                }
            }
            ptb_HinhAnh.Image = new Bitmap(ptb_HinhAnh.Width, ptb_HinhAnh.Height);
        }
       
        #endregion

        #region hàm load
        public DataTable loadData()
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Tên danh mục", typeof(string));
            dt.Columns.Add("Danh mục cha", typeof(string));
            dt.Columns.Add("Hình ảnh", typeof(string));

            List<DanhMuc> dm = DAL_DanhMuc.loadDanhMucCap1();
            foreach (var d in dm)
            {
                dt.Rows.Add(d._id, d.ten_danh_muc, d.danh_muc_cha_id, d.anh_nen);
            }
            return dt;
        }

        public DataTable loadDataDanhMucCon(string idParent)
        {
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Tên danh mục", typeof(string));
            dt.Columns.Add("Danh mục cha", typeof(string));
            dt.Columns.Add("Hình ảnh", typeof(string));

            List<DanhMuc> dm = DAL_DanhMuc.loadDanhMucChild(idParent);
            foreach (var d in dm)
            {
                dt.Rows.Add(d._id, d.ten_danh_muc, d.danh_muc_cha_id, d.anh_nen);
            }
            return dt;
        }

        public void loadCombobox()
        {
            List<DanhMuc> rs = DAL_DanhMuc.loadData();
            DataTable dt = new DataTable();
            dt.Columns.Add("ID", typeof(string));
            dt.Columns.Add("Tên danh mục", typeof(string));
            foreach (var d in rs)
            { 
                dt.Rows.Add(d._id, d.ten_danh_muc); 
            }
            dt.Rows.Add("1", "---Không có danh mục cha---");
            cbo_DanhMucCha.DataSource = dt;
            cbo_DanhMucCha.ValueMember = "ID";
            cbo_DanhMucCha.DisplayMember = "Tên danh mục";
        }

        public void ChosseFirstIndex()
        {
            if(dgv_left.Rows.Count > 0)
            {
                txt_MaDanhMuc.Text = dgv_left.Rows[0].Cells[0].Value.ToString();
                txt_TenDanhMuc.Text = dgv_left.Rows[0].Cells[1].Value.ToString();
                if (dgv_left.Rows[0].Cells[2].Value.ToString() == "" || dgv_left.Rows[0].Cells[2].Value.ToString() == ObjectId.Empty.ToString())
                {
                    cbo_DanhMucCha.SelectedValue = "1";
                }
                else
                {
                    cbo_DanhMucCha.SelectedValue = dgv_left.Rows[0].Cells[2].Value.ToString();
                }
                string base64image = dgv_left.Rows[0].Cells[3].Value.ToString();
                if (base64image != null)
                {
                    Image image = Base64ToImage(base64image);
                    if (image != null)
                    {
                        ptb_HinhAnh.Image = image;
                        ptb_HinhAnh.SizeMode = PictureBoxSizeMode.Zoom;
                        return;
                    }
                }
                ptb_HinhAnh.Image = new Bitmap(ptb_HinhAnh.Width, ptb_HinhAnh.Height);

                string idParent = dgv_left.Rows[0].Cells[0].Value.ToString();
                if (idParent != null)
                {
                    dtDanhMucCon = loadDataDanhMucCon(idParent);
                    dgv_right.DataSource = dtDanhMucCon;
                }
            }
        }

        public void reloadData()
        {
          
            dtDanhMucCha =  loadData();
            history = new List<DataTable>();
            loadCombobox();
            dgv_left.DataSource = dtDanhMucCha;
            dgv_right.Refresh();
            ptb_HinhAnh.Tag = null;
            ChosseFirstIndex();
            bindingLeft();
        }
        #endregion

        #region sự kiện
        private void dgv_left_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            string idParent = dgv_left.CurrentRow.Cells[0].Value.ToString();
            if(idParent != null)
            {
                dtDanhMucCon = loadDataDanhMucCon(idParent);
                dgv_right.DataSource = dtDanhMucCon;

            }
            bindingLeft();
        }

        private void dgv_right_CellContentClick(object sender, DataGridViewCellEventArgs e)
        {
            string idParent = dgv_right.CurrentRow.Cells[0].Value.ToString();
            if (idParent != null)
            {
                //đưa bên cha vô stack
                history.Add(dtDanhMucCha);
                dtDanhMucCha = dtDanhMucCon;
                dgv_left.DataSource = dtDanhMucCha;

                dtDanhMucCon = loadDataDanhMucCon(idParent);
                dgv_right.DataSource = dtDanhMucCon;
            }
            bindingLeft();
        }

        private void btn_GoBack_Click(object sender, EventArgs e)
        {
            
            string id = dgv_left.Rows[0].Cells[2].Value.ToString();
            List<DanhMuc> rs = DAL_DanhMuc.loadDanhMucByID(id);
            if(rs.Count> 0)
            {
                string kq = rs[0]._id.ToString();
                if (history.Count > 0)
                {
                    dtDanhMucCon = dtDanhMucCha;
                    dgv_right.DataSource = dtDanhMucCon;
                    dtDanhMucCha = history[history.Count - 1];
                    dgv_left.DataSource = dtDanhMucCha;
                    history.RemoveAt(history.Count - 1);

                    foreach (DataGridViewRow row in dgv_left.Rows)
                    {
                        if (dgv_left.Columns.Count > 0)
                        {
                            if (row.Cells[0].Value != null)
                            {
                                if (row.Cells[0].Value.ToString() == kq)
                                {
                                    row.Selected = true;
                                    break;
                                }
                            }
                        }
                    }

                }
                else
                {
                    dtDanhMucCha = loadData();
                    dtDanhMucCon = null;
                    foreach (DataGridViewRow row in dgv_left.Rows)
                    {
                        if (dgv_left.Columns.Count > 0)
                        {
                            if (row.Cells[0].Value != null)
                            {
                                if (row.Cells[0].Value.ToString() == kq)
                                {
                                    row.Selected = true;
                                    break;
                                }
                            }
                        }
                    }

                }
            }
        }
        #endregion

        private void btn_Them_Click(object sender, EventArgs e)
        {
            string ten = txt_TenDanhMuc.Text;
            string idCha = "";
            if(cbo_DanhMucCha.SelectedValue.ToString() != "1")
            {
                idCha = cbo_DanhMucCha.SelectedValue.ToString();
            }
            string anhNen = (string)ptb_HinhAnh.Tag;
            DanhMuc newDM = new DanhMuc(ten, idCha, anhNen);
            
            int kq = DAL_DanhMuc.InserDanhMuc(newDM);
            if(kq == 1)
            {
                MessageBox.Show("Thêm thành công");
                reloadData();
            }
            else
            {
                MessageBox.Show("Thêm thất bại");
            }

        }

        private void btn_Xoa_Click(object sender, EventArgs e)
        {
            string id = txt_MaDanhMuc.Text;
            int kq = DAL_DanhMuc.DeleteDanhMuc(id);
            if (kq == 1)
            {
                MessageBox.Show("Xóa thành công");
                reloadData();
            }
            else if(kq ==0)
            {
                MessageBox.Show("Xóa thất bại");
            }
            else
            {
                MessageBox.Show("danh mục không thể xóa");
            }
        }

        private void btn_Sua58_Click(object sender, EventArgs e)
        {
            string id = txt_MaDanhMuc.Text;
            string ten = txt_TenDanhMuc.Text;
            string idCha = "";
            if (cbo_DanhMucCha.SelectedValue.ToString() != "1" || cbo_DanhMucCha.SelectedValue.ToString() == ObjectId.Empty.ToString())
            {
                idCha = cbo_DanhMucCha.SelectedValue.ToString();
            }
            string anhNen = (string)ptb_HinhAnh.Tag;
            DanhMuc updateDM = new DanhMuc(id,ten, idCha, anhNen);
            int kq = DAL_DanhMuc.UpdateDanhMuc(updateDM);
            if(kq == 1)
            {
                MessageBox.Show("Cập nhật thành công");
                reloadData();
            }
            else
            {
                MessageBox.Show("Cập nhật thất bại");
            }

        }

        private void btn_ChonAnh_Click(object sender, EventArgs e)
        {
            using (OpenFileDialog openFileDialog = new OpenFileDialog())
            {
                openFileDialog.Filter = "Image files (*.jpg, *.jpeg, *.png) | *.jpg; *.jpeg; *.png";
                if (openFileDialog.ShowDialog() == DialogResult.OK)
                {
                    ptb_HinhAnh.Image = Image.FromFile(openFileDialog.FileName);
                    ptb_HinhAnh.SizeMode = PictureBoxSizeMode.Zoom;
                    
                    //mã hóa
                    string base64string = ImageToBase64(openFileDialog.FileName);
                    ptb_HinhAnh.Tag = base64string;
                    //giải mã
                    ptb_HinhAnh.Image = Base64ToImage(base64string);
                    ptb_HinhAnh.SizeMode = PictureBoxSizeMode.Zoom;
                    Console.WriteLine();
                }
            }
        }
        string ImageToBase64(string imagePath)
        {
            try
            {
                byte[] imageBytes = File.ReadAllBytes(imagePath);
                string base64String = Convert.ToBase64String(imageBytes);
                return base64String;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Lỗi: " + ex.Message);
                return null;
            }
        }
        Image Base64ToImage(string base64String)
        {
            try
            {
                byte[] imageBytes = Convert.FromBase64String(base64String);
                using (MemoryStream memoryStream = new MemoryStream(imageBytes))
                {
                    Image image = Image.FromStream(memoryStream);
                    return image;
                }
            }
            catch
            {
                return null;
            }
        }

        private void dgv_left_SelectionChanged(object sender, EventArgs e)
        {

        }
    }

}
