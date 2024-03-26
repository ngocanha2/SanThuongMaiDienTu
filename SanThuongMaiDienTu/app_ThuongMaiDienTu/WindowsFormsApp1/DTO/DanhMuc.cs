using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DTO
{
    public class DanhMuc
    {
        [BsonId]
        public ObjectId _id { get; set; }
        //[BsonElement("ten_danh_muc")]
        public string ten_danh_muc { get; set; }
        [BsonElement("danh_muc_cha_id")]
        public ObjectId? danh_muc_cha_id { get; set; }
        [BsonElement("anh_nen")]
        public string anh_nen { get; set; }

        public DanhMuc(string ten, string dmCha, string anh)
        {
            ten_danh_muc = ten;
            if (dmCha == "")
            {
                danh_muc_cha_id = ObjectId.Empty;
            }
            else
            {
                danh_muc_cha_id = ObjectId.Parse(dmCha);
            }
            anh_nen = anh;
        }
        public DanhMuc(string id,string ten, string dmCha, string anh)
        {
            _id = ObjectId.Parse(id);
            ten_danh_muc = ten;
            if (dmCha == "")
            {
                danh_muc_cha_id = ObjectId.Empty;
            }
            else
            {
                danh_muc_cha_id = ObjectId.Parse(dmCha);
            }
            anh_nen = anh;
        }
        public DanhMuc()
        {

        }
    }
}
