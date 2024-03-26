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
   public class DBConnect
    {
        string url;
        //string databaseName;
        IMongoDatabase database;
        string databaseName;
        MongoClient client;
        public void connect()
        {
            databaseName = "ThuongMaiDienTu";
            //string url = "mongodb://root:TMDT12345678@localhost:27018";
            client = new MongoClient("mongodb://root:TMDT12345678@localhost:27018");
        }
        public IMongoCollection<Store> connect_Store(string table)
        {
            database = client.GetDatabase(databaseName);
            var collection = database.GetCollection<Store>(table);
            return collection;
        }
        public IMongoCollection<Shipp> connect_Shipp(string table)
        {
            database = client.GetDatabase(databaseName);
            var collection = database.GetCollection<Shipp>(table);
            return collection;
        }

        //Ánh mới-------------------------------------------------------------
        public IMongoCollection<DanhMuc> connect_DanhMuc(string tableName)
        {
            checkConnect();
            return database.GetCollection<DanhMuc>(tableName);
        }

        //Ánh mới
        public void checkConnect()
        {
            if (database == null)
            {
                var client = new MongoClient("mongodb://root:TMDT12345678@localhost:27018");
                database = client.GetDatabase("ThuongMaiDienTu");
            }
        }
        public List<DanhMuc> getDanhMuc(string tableName)
        {
            checkConnect();
            var collection = database.GetCollection<DanhMuc>(tableName);
            List<DanhMuc> danhMucs = collection.Find(Builders<DanhMuc>.Filter.Empty).ToList();
            return danhMucs;
        }
        public List<DanhMuc> getDanhMucCap1(string tableName)
        {
            checkConnect();
            var collection = database.GetCollection<DanhMuc>(tableName);

            if (collection == null)
            {
                // Xử lý trường hợp collection là null, có thể hiển thị thông báo lỗi hoặc thực hiện hành động phù hợp.
                Console.WriteLine("Collection is null.");
                return new List<DanhMuc>();
            }

            // Tiếp tục với phần còn lại của hàm.
            var filter = Builders<DanhMuc>.Filter.In(d => d.danh_muc_cha_id, new List<ObjectId?> { null, ObjectId.Empty });
            List<DanhMuc> danhMucs = collection.Find(filter).ToList();
            return danhMucs;

      
        }

        public List<DanhMuc> getDanhMucCapCon(string tableName,string idParent)
        {
            checkConnect();
            ObjectId id = ObjectId.TryParse(idParent, out ObjectId objectId) ? objectId : ObjectId.Empty;
            var collection = database.GetCollection<DanhMuc>(tableName);

            var filter = Builders<DanhMuc>.Filter.Eq(d => d.danh_muc_cha_id, id);

            List<DanhMuc> danhMucs = collection.Find(filter).ToList();

            return danhMucs;
        }

        public List<DanhMuc> getListDanhMucByListID(string tableName, List<String> listID)
        {
            
            checkConnect();
            var objectIds = listID.Select(id => ObjectId.TryParse(id, out ObjectId objectId) ? objectId : ObjectId.Empty);

            var collection = database.GetCollection<DanhMuc>(tableName);

            var filter = Builders<DanhMuc>.Filter.In(d => d._id, objectIds);

            List<DanhMuc> danhMucs = collection.Find(filter).ToList();

            return danhMucs;
        }

         public List<DanhMuc> getDanhMucByID(string tableName,string id)
        {
            checkConnect();
            ObjectId i = ObjectId.TryParse(id, out ObjectId objectId) ? objectId : ObjectId.Empty;
            var collection = database.GetCollection<DanhMuc>(tableName);

            var filter = Builders<DanhMuc>.Filter.Eq(d => d._id, i);

            List<DanhMuc> danhMucs = collection.Find(filter).ToList();

            return danhMucs;
        }

        public int ktCoDanhMucCon(string i)
        {
            checkConnect();
            List<DanhMuc> kq = getDanhMucCapCon("danh_muc", i);
            if (kq.Count ==0)
            {
                return 0;
            }
            return 1;
        }

        public int ktThamChieuSanPham(ObjectId i)
        {
            checkConnect();
            var filter = Builders<BsonDocument>.Filter.Eq("danh_muc_id", i);
            var count = database.GetCollection<BsonDocument>("san_pham").CountDocuments(filter);
            //Console.WriteLine("dsss", count.ToString());
            if (count == 0)
                return 0;
            else return 1;
        }
    }
}
