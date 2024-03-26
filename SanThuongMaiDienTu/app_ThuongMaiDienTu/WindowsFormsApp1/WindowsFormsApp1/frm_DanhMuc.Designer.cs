
namespace WindowsFormsApp1
{
    partial class frm_DanhMuc
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
            this.dgv_left = new System.Windows.Forms.DataGridView();
            this.dgv_right = new System.Windows.Forms.DataGridView();
            this.btn_GoBack = new System.Windows.Forms.Button();
            this.label1 = new System.Windows.Forms.Label();
            this.txt_MaDanhMuc = new System.Windows.Forms.TextBox();
            this.label2 = new System.Windows.Forms.Label();
            this.txt_TenDanhMuc = new System.Windows.Forms.TextBox();
            this.ptb_HinhAnh = new System.Windows.Forms.PictureBox();
            this.label3 = new System.Windows.Forms.Label();
            this.cbo_DanhMucCha = new System.Windows.Forms.ComboBox();
            this.btn_Them = new System.Windows.Forms.Button();
            this.btn_Xoa = new System.Windows.Forms.Button();
            this.btn_Sua58 = new System.Windows.Forms.Button();
            this.btn_ChonAnh = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.dgv_left)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.dgv_right)).BeginInit();
            ((System.ComponentModel.ISupportInitialize)(this.ptb_HinhAnh)).BeginInit();
            this.SuspendLayout();
            // 
            // dgv_left
            // 
            this.dgv_left.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgv_left.Location = new System.Drawing.Point(77, 262);
            this.dgv_left.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.dgv_left.MultiSelect = false;
            this.dgv_left.Name = "dgv_left";
            this.dgv_left.ReadOnly = true;
            this.dgv_left.RowHeadersWidth = 62;
            this.dgv_left.RowTemplate.Height = 28;
            this.dgv_left.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgv_left.Size = new System.Drawing.Size(578, 281);
            this.dgv_left.TabIndex = 1;
            this.dgv_left.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgv_left_CellContentClick);
            this.dgv_left.SelectionChanged += new System.EventHandler(this.dgv_left_SelectionChanged);
            // 
            // dgv_right
            // 
            this.dgv_right.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.dgv_right.Location = new System.Drawing.Point(708, 262);
            this.dgv_right.Margin = new System.Windows.Forms.Padding(3, 2, 3, 2);
            this.dgv_right.MultiSelect = false;
            this.dgv_right.Name = "dgv_right";
            this.dgv_right.ReadOnly = true;
            this.dgv_right.RowHeadersWidth = 62;
            this.dgv_right.RowTemplate.Height = 28;
            this.dgv_right.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dgv_right.Size = new System.Drawing.Size(615, 281);
            this.dgv_right.TabIndex = 2;
            this.dgv_right.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dgv_right_CellContentClick);
            // 
            // btn_GoBack
            // 
            this.btn_GoBack.Location = new System.Drawing.Point(77, 205);
            this.btn_GoBack.Name = "btn_GoBack";
            this.btn_GoBack.Size = new System.Drawing.Size(75, 36);
            this.btn_GoBack.TabIndex = 3;
            this.btn_GoBack.Text = "Quay lại";
            this.btn_GoBack.UseVisualStyleBackColor = true;
            this.btn_GoBack.Click += new System.EventHandler(this.btn_GoBack_Click);
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(164, 57);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(27, 17);
            this.label1.TabIndex = 5;
            this.label1.Text = "Mã";
            // 
            // txt_MaDanhMuc
            // 
            this.txt_MaDanhMuc.Location = new System.Drawing.Point(278, 54);
            this.txt_MaDanhMuc.Name = "txt_MaDanhMuc";
            this.txt_MaDanhMuc.Size = new System.Drawing.Size(175, 22);
            this.txt_MaDanhMuc.TabIndex = 6;
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(164, 104);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(99, 17);
            this.label2.TabIndex = 7;
            this.label2.Text = "Tên danh mục";
            // 
            // txt_TenDanhMuc
            // 
            this.txt_TenDanhMuc.Location = new System.Drawing.Point(278, 99);
            this.txt_TenDanhMuc.Name = "txt_TenDanhMuc";
            this.txt_TenDanhMuc.Size = new System.Drawing.Size(175, 22);
            this.txt_TenDanhMuc.TabIndex = 10;
            // 
            // ptb_HinhAnh
            // 
            this.ptb_HinhAnh.Location = new System.Drawing.Point(528, 22);
            this.ptb_HinhAnh.Name = "ptb_HinhAnh";
            this.ptb_HinhAnh.Size = new System.Drawing.Size(242, 191);
            this.ptb_HinhAnh.TabIndex = 14;
            this.ptb_HinhAnh.TabStop = false;
            // 
            // label3
            // 
            this.label3.AutoSize = true;
            this.label3.Location = new System.Drawing.Point(164, 147);
            this.label3.Name = "label3";
            this.label3.Size = new System.Drawing.Size(99, 17);
            this.label3.TabIndex = 15;
            this.label3.Text = "Danh mục cha";
            // 
            // cbo_DanhMucCha
            // 
            this.cbo_DanhMucCha.FormattingEnabled = true;
            this.cbo_DanhMucCha.Location = new System.Drawing.Point(278, 140);
            this.cbo_DanhMucCha.Name = "cbo_DanhMucCha";
            this.cbo_DanhMucCha.Size = new System.Drawing.Size(175, 24);
            this.cbo_DanhMucCha.TabIndex = 17;
            // 
            // btn_Them
            // 
            this.btn_Them.Location = new System.Drawing.Point(824, 75);
            this.btn_Them.Name = "btn_Them";
            this.btn_Them.Size = new System.Drawing.Size(75, 33);
            this.btn_Them.TabIndex = 18;
            this.btn_Them.Text = "Thêm";
            this.btn_Them.UseVisualStyleBackColor = true;
            this.btn_Them.Click += new System.EventHandler(this.btn_Them_Click);
            // 
            // btn_Xoa
            // 
            this.btn_Xoa.Location = new System.Drawing.Point(824, 131);
            this.btn_Xoa.Name = "btn_Xoa";
            this.btn_Xoa.Size = new System.Drawing.Size(75, 33);
            this.btn_Xoa.TabIndex = 19;
            this.btn_Xoa.Text = "Xóa";
            this.btn_Xoa.UseVisualStyleBackColor = true;
            this.btn_Xoa.Click += new System.EventHandler(this.btn_Xoa_Click);
            // 
            // btn_Sua58
            // 
            this.btn_Sua58.Location = new System.Drawing.Point(824, 180);
            this.btn_Sua58.Name = "btn_Sua58";
            this.btn_Sua58.Size = new System.Drawing.Size(75, 33);
            this.btn_Sua58.TabIndex = 20;
            this.btn_Sua58.Text = "Sửa";
            this.btn_Sua58.UseVisualStyleBackColor = true;
            this.btn_Sua58.Click += new System.EventHandler(this.btn_Sua58_Click);
            // 
            // btn_ChonAnh
            // 
            this.btn_ChonAnh.Location = new System.Drawing.Point(678, 219);
            this.btn_ChonAnh.Name = "btn_ChonAnh";
            this.btn_ChonAnh.Size = new System.Drawing.Size(94, 33);
            this.btn_ChonAnh.TabIndex = 21;
            this.btn_ChonAnh.Text = "Chọn ảnh";
            this.btn_ChonAnh.UseVisualStyleBackColor = true;
            this.btn_ChonAnh.Click += new System.EventHandler(this.btn_ChonAnh_Click);
            // 
            // frm_DanhMuc
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(8F, 16F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(1402, 668);
            this.Controls.Add(this.btn_ChonAnh);
            this.Controls.Add(this.btn_Sua58);
            this.Controls.Add(this.btn_Xoa);
            this.Controls.Add(this.btn_Them);
            this.Controls.Add(this.cbo_DanhMucCha);
            this.Controls.Add(this.label3);
            this.Controls.Add(this.ptb_HinhAnh);
            this.Controls.Add(this.txt_TenDanhMuc);
            this.Controls.Add(this.label2);
            this.Controls.Add(this.txt_MaDanhMuc);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.btn_GoBack);
            this.Controls.Add(this.dgv_right);
            this.Controls.Add(this.dgv_left);
            this.Name = "frm_DanhMuc";
            this.Text = "frm_DanhMuc";
            this.Load += new System.EventHandler(this.frm_DanhMuc_Load);
            ((System.ComponentModel.ISupportInitialize)(this.dgv_left)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.dgv_right)).EndInit();
            ((System.ComponentModel.ISupportInitialize)(this.ptb_HinhAnh)).EndInit();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.DataGridView dgv_left;
        private System.Windows.Forms.DataGridView dgv_right;
        private System.Windows.Forms.Button btn_GoBack;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.TextBox txt_MaDanhMuc;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.TextBox txt_TenDanhMuc;
        private System.Windows.Forms.PictureBox ptb_HinhAnh;
        private System.Windows.Forms.Label label3;
        private System.Windows.Forms.ComboBox cbo_DanhMucCha;
        private System.Windows.Forms.Button btn_Them;
        private System.Windows.Forms.Button btn_Xoa;
        private System.Windows.Forms.Button btn_Sua58;
        private System.Windows.Forms.Button btn_ChonAnh;
    }
}