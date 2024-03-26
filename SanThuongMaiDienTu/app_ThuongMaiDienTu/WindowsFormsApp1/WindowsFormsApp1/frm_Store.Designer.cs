
namespace WindowsFormsApp1
{
    partial class frm_Store
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.data_CuaHang = new System.Windows.Forms.DataGridView();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.label7 = new System.Windows.Forms.Label();
            this.label8 = new System.Windows.Forms.Label();
            this.txt_ID = new System.Windows.Forms.TextBox();
            this.txt_TenCH = new System.Windows.Forms.TextBox();
            this.txt_DiaChi = new System.Windows.Forms.TextBox();
            this.txt_NgayDK = new System.Windows.Forms.TextBox();
            this.txt_SDT = new System.Windows.Forms.TextBox();
            this.txt_ChuKy = new System.Windows.Forms.TextBox();
            this.txt_TruyCap = new System.Windows.Forms.TextBox();
            this.txt_HD = new System.Windows.Forms.TextBox();
            this.btn_Luu = new DevExpress.XtraEditors.SimpleButton();
            this.label9 = new System.Windows.Forms.Label();
            this.txt_Khoa = new System.Windows.Forms.TextBox();
            this.btn_Xoa = new DevExpress.XtraEditors.SimpleButton();
            ((System.ComponentModel.ISupportInitialize)(this.data_CuaHang)).BeginInit();
            this.SuspendLayout();
            // 
            // data_CuaHang
            // 
            this.data_CuaHang.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.data_CuaHang.Location = new System.Drawing.Point(29, 368);
            this.data_CuaHang.Name = "data_CuaHang";
            this.data_CuaHang.RowHeadersWidth = 62;
            this.data_CuaHang.RowTemplate.Height = 28;
            this.data_CuaHang.Size = new System.Drawing.Size(1259, 285);
            this.data_CuaHang.TabIndex = 0;
            this.data_CuaHang.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridView1_CellClick);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(123, 37);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(26, 20);
            this.label1.TabIndex = 1;
            this.label1.Text = "ID";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(123, 115);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(106, 20);
            this.label2.TabIndex = 2;
            this.label2.Text = "Tên cửa hàng";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(123, 196);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(57, 20);
            this.label3.TabIndex = 3;
            this.label3.Text = "Địa chỉ";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(123, 290);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(104, 20);
            this.label4.TabIndex = 4;
            this.label4.Text = "Ngày đăng ký";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(670, 37);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(102, 20);
            this.label5.TabIndex = 5;
            this.label5.Text = "Số điện thoại";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(670, 115);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(57, 20);
            this.label6.TabIndex = 6;
            this.label6.Text = "Chữ ký";
            // 
            // label7
            // 
            this.label7.AutoSize = true;
            this.label7.Location = new System.Drawing.Point(670, 196);
            this.label7.Name = "label7";
            this.label7.Size = new System.Drawing.Size(101, 20);
            this.label7.TabIndex = 7;
            this.label7.Text = "Lượt truy cập";
            // 
            // label8
            // 
            this.label8.AutoSize = true;
            this.label8.Location = new System.Drawing.Point(670, 283);
            this.label8.Name = "label8";
            this.label8.Size = new System.Drawing.Size(84, 20);
            this.label8.TabIndex = 8;
            this.label8.Text = "Hoạt động";
            // 
            // txt_ID
            // 
            this.txt_ID.Location = new System.Drawing.Point(266, 30);
            this.txt_ID.Multiline = true;
            this.txt_ID.Name = "txt_ID";
            this.txt_ID.Size = new System.Drawing.Size(292, 40);
            this.txt_ID.TabIndex = 9;
            // 
            // txt_TenCH
            // 
            this.txt_TenCH.Location = new System.Drawing.Point(266, 95);
            this.txt_TenCH.Multiline = true;
            this.txt_TenCH.Name = "txt_TenCH";
            this.txt_TenCH.Size = new System.Drawing.Size(292, 40);
            this.txt_TenCH.TabIndex = 10;
            // 
            // txt_DiaChi
            // 
            this.txt_DiaChi.Location = new System.Drawing.Point(266, 176);
            this.txt_DiaChi.Multiline = true;
            this.txt_DiaChi.Name = "txt_DiaChi";
            this.txt_DiaChi.Size = new System.Drawing.Size(292, 68);
            this.txt_DiaChi.TabIndex = 11;
            // 
            // txt_NgayDK
            // 
            this.txt_NgayDK.Location = new System.Drawing.Point(266, 280);
            this.txt_NgayDK.Multiline = true;
            this.txt_NgayDK.Name = "txt_NgayDK";
            this.txt_NgayDK.Size = new System.Drawing.Size(292, 40);
            this.txt_NgayDK.TabIndex = 12;
            // 
            // txt_SDT
            // 
            this.txt_SDT.Location = new System.Drawing.Point(777, 30);
            this.txt_SDT.Multiline = true;
            this.txt_SDT.Name = "txt_SDT";
            this.txt_SDT.Size = new System.Drawing.Size(292, 40);
            this.txt_SDT.TabIndex = 13;
            // 
            // txt_ChuKy
            // 
            this.txt_ChuKy.Location = new System.Drawing.Point(777, 95);
            this.txt_ChuKy.Multiline = true;
            this.txt_ChuKy.Name = "txt_ChuKy";
            this.txt_ChuKy.Size = new System.Drawing.Size(292, 40);
            this.txt_ChuKy.TabIndex = 14;
            // 
            // txt_TruyCap
            // 
            this.txt_TruyCap.Location = new System.Drawing.Point(777, 176);
            this.txt_TruyCap.Multiline = true;
            this.txt_TruyCap.Name = "txt_TruyCap";
            this.txt_TruyCap.Size = new System.Drawing.Size(292, 40);
            this.txt_TruyCap.TabIndex = 15;
            // 
            // txt_HD
            // 
            this.txt_HD.Location = new System.Drawing.Point(777, 263);
            this.txt_HD.Multiline = true;
            this.txt_HD.Name = "txt_HD";
            this.txt_HD.Size = new System.Drawing.Size(292, 40);
            this.txt_HD.TabIndex = 16;
            // 
            // btn_Luu
            // 
            this.btn_Luu.Location = new System.Drawing.Point(1308, 437);
            this.btn_Luu.Name = "btn_Luu";
            this.btn_Luu.Size = new System.Drawing.Size(122, 50);
            this.btn_Luu.TabIndex = 17;
            this.btn_Luu.Text = "Lưu";
            this.btn_Luu.Click += new System.EventHandler(this.btn_Luu_Click);
            // 
            // label9
            // 
            this.label9.AutoSize = true;
            this.label9.Location = new System.Drawing.Point(1277, 50);
            this.label9.Name = "label9";
            this.label9.Size = new System.Drawing.Size(46, 20);
            this.label9.TabIndex = 18;
            this.label9.Text = "Khóa";
            // 
            // txt_Khoa
            // 
            this.txt_Khoa.Location = new System.Drawing.Point(1197, 95);
            this.txt_Khoa.Multiline = true;
            this.txt_Khoa.Name = "txt_Khoa";
            this.txt_Khoa.Size = new System.Drawing.Size(204, 40);
            this.txt_Khoa.TabIndex = 19;
            // 
            // btn_Xoa
            // 
            this.btn_Xoa.Location = new System.Drawing.Point(1308, 537);
            this.btn_Xoa.Name = "btn_Xoa";
            this.btn_Xoa.Size = new System.Drawing.Size(122, 50);
            this.btn_Xoa.TabIndex = 20;
            this.btn_Xoa.Text = "Xóa";
            this.btn_Xoa.Click += new System.EventHandler(this.btn_Xoa_Click);
            // 
            // frm_Store
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1485, 712);
            this.Controls.Add(this.btn_Xoa);
            this.Controls.Add(this.txt_Khoa);
            this.Controls.Add(this.label9);
            this.Controls.Add(this.btn_Luu);
            this.Controls.Add(this.txt_HD);
            this.Controls.Add(this.txt_TruyCap);
            this.Controls.Add(this.txt_ChuKy);
            this.Controls.Add(this.txt_SDT);
            this.Controls.Add(this.txt_NgayDK);
            this.Controls.Add(this.txt_DiaChi);
            this.Controls.Add(this.txt_TenCH);
            this.Controls.Add(this.txt_ID);
            this.Controls.Add(this.label8);
            this.Controls.Add(this.label7);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.data_CuaHang);
            this.Name = "frm_Store";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.data_CuaHang)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView data_CuaHang;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.Label label7;
        private System.Windows.Forms.Label label8;
        private System.Windows.Forms.TextBox txt_ID;
        private System.Windows.Forms.TextBox txt_TenCH;
        private System.Windows.Forms.TextBox txt_DiaChi;
        private System.Windows.Forms.TextBox txt_NgayDK;
        private System.Windows.Forms.TextBox txt_SDT;
        private System.Windows.Forms.TextBox txt_ChuKy;
        private System.Windows.Forms.TextBox txt_TruyCap;
        private System.Windows.Forms.TextBox txt_HD;
        private DevExpress.XtraEditors.SimpleButton btn_Luu;
        private System.Windows.Forms.Label label9;
        private System.Windows.Forms.TextBox txt_Khoa;
        private DevExpress.XtraEditors.SimpleButton btn_Xoa;
    }
}

