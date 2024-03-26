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
   public class Anh_DanhMucDAL
    {
        DBConnect con = new DBConnect();

        //load data
        public List<DanhMuc> loadData()
        {
            return con.getDanhMuc("danh_muc");
        }

        public List<DanhMuc> loadDanhMucCap1()
        {
            return con.getDanhMucCap1("danh_muc");
        }
        public List<DanhMuc> loadDanhMucChild(string idParent)
        {
            return con.getDanhMucCapCon("danh_muc", idParent);
        }

        public List<DanhMuc> loadDanhMucByListID(List<string> listID)
        {
            List<DanhMuc> a = con.getListDanhMucByListID("danh_muc", listID);
            return a;
        }

        public List<DanhMuc> loadDanhMucByID(string id)
        {
            List<DanhMuc> a = con.getDanhMucByID("danh_muc", id);
            return a;
        }

        public int InserDanhMuc(DanhMuc dm)
        {
            try
            {
                IMongoCollection<DanhMuc> collection = con.connect_DanhMuc("danh_muc");
                collection.InsertOne(dm);
                return 1;
            }
            catch
            {
                return 0;
            }
        }

        public int DeleteDanhMuc(string id)
        {
            try
            {
                IMongoCollection<DanhMuc> collection = con.connect_DanhMuc("danh_muc");
                ObjectId i = ObjectId.TryParse(id, out ObjectId objectId) ? objectId : ObjectId.Empty;
                var document = Builders<DanhMuc>.Filter.Eq("_id", i);

                if (con.ktThamChieuSanPham(i) == 0 && con.ktCoDanhMucCon(id) == 0)
                {
                    var result = collection.DeleteOne(document);
                    if (result.DeletedCount > 0) 
                    { 
                        return 1; 
                    }
                }
               
                return 2;
            }
            catch
            {
                return 0;
            }
        }

        public int UpdateDanhMuc(DanhMuc dm)
        {
            //try
            //{
                IMongoCollection<DanhMuc> collection = con.connect_DanhMuc("danh_muc");
                var filter = Builders<DanhMuc>.Filter.Eq("_id", dm._id);
                var update = Builders<DanhMuc>.Update
                    .Set("ten_danh_muc", dm.ten_danh_muc)
                    .Set("anh_nen", dm.anh_nen)
                    .Set("danh_muc_cha_id", dm.danh_muc_cha_id);

                var result = collection.UpdateOne(filter, update);

                if (result.ModifiedCount > 0)
                    return 1;

                return 2;
        }
    }
}
