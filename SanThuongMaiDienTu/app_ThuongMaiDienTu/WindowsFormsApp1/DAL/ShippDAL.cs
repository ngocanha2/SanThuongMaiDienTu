using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using DTO;
using MongoDB.Bson;

namespace DAL
{
    public class ShippDAL
    {
        DBConnect con = new DBConnect();

        //load all
        public IMongoQueryable<Shipp> load_Shipp()
        {
            con.connect();
            IMongoCollection<Shipp> collection = con.connect_Shipp("phuong_thuc_van_chuyen");
            var query = from item in collection.AsQueryable<Shipp>().Where(s=>s.khoa == false) select item;
            return query;
        }
        public void insert_Shipp(string tenPT, int thoiGian, int chiPhi, bool macDinh, bool dongKiem)
        {
            IMongoCollection<Shipp> collection = con.connect_Shipp("phuong_thuc_van_chuyen");
            var insertShipp = new Shipp
            {
                ten_phuong_thuc_van_chuyen = tenPT,
                thoi_gian_uoc_tinh = thoiGian,
                chi_phi = chiPhi,
                mac_dinh = macDinh,
                dong_kiem = dongKiem
            };
            collection.InsertOne(insertShipp);
        }
        public void update_Ship(ObjectId dieuKien, string tenPT, int thoiGian, bool dongKiem, int chiPhi, bool macDinh)
        {
            IMongoCollection<Shipp> collection = con.connect_Shipp("phuong_thuc_van_chuyen");
            var document = Builders<Shipp>.Filter.Eq("_id", dieuKien);
            var updateShipp = Builders<Shipp>.Update.Set("ten_phuong_thuc_van_chuyen",tenPT)
                                                .Set("thoi_gian_uoc_tinh",thoiGian)
                                                .Set("chi_phi", chiPhi)
                                                .Set("mac_dinh", macDinh)
                                                .Set("dong_kiem", dongKiem);
            var result = collection.UpdateOne(document, updateShipp);
        }
        public void delete_Ship(ObjectId dieuKien, bool khoa)
        {
            IMongoCollection<Shipp> collection = con.connect_Shipp("phuong_thuc_van_chuyen");
            var document = Builders<Shipp>.Filter.Eq("_id", dieuKien);
            var updateShipp = Builders<Shipp>.Update.Set("khoa", khoa);                         
            var result = collection.UpdateOne(document, updateShipp);
        }
    }
}
