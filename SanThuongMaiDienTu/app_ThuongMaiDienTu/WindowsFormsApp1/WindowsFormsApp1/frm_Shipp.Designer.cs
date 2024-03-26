
namespace WindowsFormsApp1
{
    partial class frm_Shipp
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
            this.data_Shipp = new System.Windows.Forms.DataGridView();
            this.label1 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label3 = new System.Windows.Forms.Label();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label6 = new System.Windows.Forms.Label();
            this.txt_ID = new System.Windows.Forms.TextBox();
            this.txt_TenPT = new System.Windows.Forms.TextBox();
            this.txt_TG = new System.Windows.Forms.TextBox();
            this.txt_ChiPhi = new System.Windows.Forms.TextBox();
            this.txt_MacDinh = new System.Windows.Forms.TextBox();
            this.btn_Them = new System.Windows.Forms.Button();
            this.btn_Xoa = new System.Windows.Forms.Button();
            this.btn_Sua = new System.Windows.Forms.Button();
            this.btn_Thoat = new System.Windows.Forms.Button();
            this.btn_Luu = new System.Windows.Forms.Button();
            this.cbo_DongKiem = new System.Windows.Forms.ComboBox();
            ((System.ComponentModel.ISupportInitialize)(this.data_Shipp)).BeginInit();
            this.SuspendLayout();
            // 
            // data_Shipp
            // 
            this.data_Shipp.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.data_Shipp.Location = new System.Drawing.Point(26, 294);
            this.data_Shipp.Name = "data_Shipp";
            this.data_Shipp.ReadOnly = true;
            this.data_Shipp.RowHeadersWidth = 62;
            this.data_Shipp.RowTemplate.Height = 28;
            this.data_Shipp.Size = new System.Drawing.Size(1290, 337);
            this.data_Shipp.TabIndex = 0;
            this.data_Shipp.CellFormatting += new System.Windows.Forms.DataGridViewCellFormattingEventHandler(this.data_Shipp_CellFormatting);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(104, 60);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(26, 20);
            this.label1.TabIndex = 1;
            this.label1.Text = "ID";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(104, 138);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(129, 20);
            this.label2.TabIndex = 2;
            this.label2.Text = "Tên phương thức";
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(104, 237);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(133, 20);
            this.label3.TabIndex = 3;
            this.label3.Text = "Thời gian ước tính";
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(695, 60);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(57, 20);
            this.label4.TabIndex = 4;
            this.label4.Text = "Chi phí";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(695, 156);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(73, 20);
            this.label5.TabIndex = 5;
            this.label5.Text = "Mặc định";
            // 
            // label6
            // 
            this.label6.AutoSize = true;
            this.label6.Location = new System.Drawing.Point(683, 237);
            this.label6.Name = "label6";
            this.label6.Size = new System.Drawing.Size(85, 20);
            this.label6.TabIndex = 6;
            this.label6.Text = "Đồng kiểm";
            // 
            // txt_ID
            // 
            this.txt_ID.Enabled = false;
            this.txt_ID.Location = new System.Drawing.Point(273, 39);
            this.txt_ID.Multiline = true;
            this.txt_ID.Name = "txt_ID";
            this.txt_ID.Size = new System.Drawing.Size(272, 41);
            this.txt_ID.TabIndex = 7;
            // 
            // txt_TenPT
            // 
            this.txt_TenPT.Location = new System.Drawing.Point(273, 117);
            this.txt_TenPT.Multiline = true;
            this.txt_TenPT.Name = "txt_TenPT";
            this.txt_TenPT.Size = new System.Drawing.Size(272, 41);
            this.txt_TenPT.TabIndex = 8;
            // 
            // txt_TG
            // 
            this.txt_TG.Location = new System.Drawing.Point(273, 216);
            this.txt_TG.Multiline = true;
            this.txt_TG.Name = "txt_TG";
            this.txt_TG.Size = new System.Drawing.Size(128, 41);
            this.txt_TG.TabIndex = 9;
            // 
            // txt_ChiPhi
            // 
            this.txt_ChiPhi.Location = new System.Drawing.Point(795, 39);
            this.txt_ChiPhi.Multiline = true;
            this.txt_ChiPhi.Name = "txt_ChiPhi";
            this.txt_ChiPhi.Size = new System.Drawing.Size(272, 41);
            this.txt_ChiPhi.TabIndex = 10;
            // 
            // txt_MacDinh
            // 
            this.txt_MacDinh.Location = new System.Drawing.Point(802, 135);
            this.txt_MacDinh.Multiline = true;
            this.txt_MacDinh.Name = "txt_MacDinh";
            this.txt_MacDinh.Size = new System.Drawing.Size(121, 41);
            this.txt_MacDinh.TabIndex = 11;
            // 
            // btn_Them
            // 
            this.btn_Them.Location = new System.Drawing.Point(302, 654);
            this.btn_Them.Name = "btn_Them";
            this.btn_Them.Size = new System.Drawing.Size(107, 54);
            this.btn_Them.TabIndex = 13;
            this.btn_Them.Text = "Thêm";
            this.btn_Them.UseVisualStyleBackColor = true;
            this.btn_Them.Click += new System.EventHandler(this.btn_Them_Click);
            // 
            // btn_Xoa
            // 
            this.btn_Xoa.Location = new System.Drawing.Point(440, 654);
            this.btn_Xoa.Name = "btn_Xoa";
            this.btn_Xoa.Size = new System.Drawing.Size(107, 54);
            this.btn_Xoa.TabIndex = 14;
            this.btn_Xoa.Text = "Xóa";
            this.btn_Xoa.UseVisualStyleBackColor = true;
            this.btn_Xoa.Click += new System.EventHandler(this.btn_Xoa_Click);
            // 
            // btn_Sua
            // 
            this.btn_Sua.Location = new System.Drawing.Point(587, 654);
            this.btn_Sua.Name = "btn_Sua";
            this.btn_Sua.Size = new System.Drawing.Size(107, 54);
            this.btn_Sua.TabIndex = 15;
            this.btn_Sua.Text = "Sửa";
            this.btn_Sua.UseVisualStyleBackColor = true;
            this.btn_Sua.Click += new System.EventHandler(this.btn_Sua_Click);
            // 
            // btn_Thoat
            // 
            this.btn_Thoat.Location = new System.Drawing.Point(728, 654);
            this.btn_Thoat.Name = "btn_Thoat";
            this.btn_Thoat.Size = new System.Drawing.Size(107, 54);
            this.btn_Thoat.TabIndex = 16;
            this.btn_Thoat.Text = "Thoát";
            this.btn_Thoat.UseVisualStyleBackColor = true;
            // 
            // btn_Luu
            // 
            this.btn_Luu.Location = new System.Drawing.Point(878, 654);
            this.btn_Luu.Name = "btn_Luu";
            this.btn_Luu.Size = new System.Drawing.Size(107, 54);
            this.btn_Luu.TabIndex = 17;
            this.btn_Luu.Text = "Lưu";
            this.btn_Luu.UseVisualStyleBackColor = true;
            this.btn_Luu.Click += new System.EventHandler(this.btn_Luu_Click);
            // 
            // cbo_DongKiem
            // 
            this.cbo_DongKiem.FormattingEnabled = true;
            this.cbo_DongKiem.Items.AddRange(new object[] {
            "Được đồng kiểm",
            "Không được đồng kiểm"});
            this.cbo_DongKiem.Location = new System.Drawing.Point(795, 229);
            this.cbo_DongKiem.Name = "cbo_DongKiem";
            this.cbo_DongKiem.Size = new System.Drawing.Size(262, 28);
            this.cbo_DongKiem.TabIndex = 18;
            // 
            // frm_Shipp
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(9F, 20F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1366, 733);
            this.Controls.Add(this.cbo_DongKiem);
            this.Controls.Add(this.btn_Luu);
            this.Controls.Add(this.btn_Thoat);
            this.Controls.Add(this.btn_Sua);
            this.Controls.Add(this.btn_Xoa);
            this.Controls.Add(this.btn_Them);
            this.Controls.Add(this.txt_MacDinh);
            this.Controls.Add(this.txt_ChiPhi);
            this.Controls.Add(this.txt_TG);
            this.Controls.Add(this.txt_TenPT);
            this.Controls.Add(this.txt_ID);
            this.Controls.Add(this.label6);
            this.Controls.Add(this.label5);
            this.Controls.Add(this.label4);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.data_Shipp);
            this.Name = "frm_Shipp";
            this.Text = "frm_Voucher";
            this.Load += new System.EventHandler(this.frm_Voucher_Load);
            ((System.ComponentModel.ISupportInitialize)(this.data_Shipp)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView data_Shipp;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label6;
        private System.Windows.Forms.TextBox txt_ID;
        private System.Windows.Forms.TextBox txt_TenPT;
        private System.Windows.Forms.TextBox txt_TG;
        private System.Windows.Forms.TextBox txt_ChiPhi;
        private System.Windows.Forms.TextBox txt_MacDinh;
        private System.Windows.Forms.Button btn_Them;
        private System.Windows.Forms.Button btn_Xoa;
        private System.Windows.Forms.Button btn_Sua;
        private System.Windows.Forms.Button btn_Thoat;
        private System.Windows.Forms.Button btn_Luu;
        private System.Windows.Forms.ComboBox cbo_DongKiem;
    }
}