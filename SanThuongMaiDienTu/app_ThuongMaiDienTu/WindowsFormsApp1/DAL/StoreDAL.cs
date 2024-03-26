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
    public class StoreDAL
    {
        DBConnect con = new DBConnect();
        
        //load all
        public IMongoQueryable<Store> load_Store()
        {
            con.connect();
            IMongoCollection<Store> collection = con.connect_Store("cua_hang");
            var query = from item in collection.AsQueryable<Store>() select item;
            return query;
        }
        //update hoạt động, khóa
        public void update_Store(ObjectId dieuKien, bool giaTri, string cotDK, string cotCapNhat)
        {
            IMongoCollection<Store> collection = con.connect_Store("cua_hang");
            var document = Builders<Store>.Filter.Eq(cotDK, dieuKien);
            var update = Builders<Store>.Update.Set(cotCapNhat, giaTri);
            var result = collection.UpdateOne(document, update);


            //var filter = Builders<Store>.Filter.Eq(store => store.Id, dieuKien);
            //var updatedStore = new Store { Id = dieuKien, trang_thai_hoat_dong = giaTri };
            //var result = collection.ReplaceOne(filter, updatedStore);
            //if (result.IsAcknowledged && result.ModifiedCount > 0)
            //{
            //    Console.WriteLine("Document cập nhật thành công!");
            //}
            //else
            //{
            //    Console.WriteLine("Không tìm thấy hoặc có lỗi khi cập nhật document.");
            //}
        }
        //public List<Store> load()
        //{
        //    //truy vấn từng cột
        //    IMongoCollection<Store> collection = con.Connect("cua_hang");
        //    var project = Builders<Store>.Projection.Include(s => s.ten_cua_hang).Include(s => s.dia_chi);
        //    var stores = collection.Find(FilterDefinition<Store>.Empty).Project<Store>(project).ToList();
        //    return stores;
        //}
    }
}
