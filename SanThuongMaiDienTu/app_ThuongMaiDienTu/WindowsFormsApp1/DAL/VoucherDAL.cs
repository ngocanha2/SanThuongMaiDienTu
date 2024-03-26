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
    public class VoucherDAL
    {
        DBConnect con = new DBConnect();
        //public IMongoQueryable<Voucher> load_Voucher()
        //{
        //    IMongoCollection<Voucher> collection = con.Connect("vouchers");
        //    var query = from item in collection.AsQueryable<Voucher>() select item;
        //    return query;
        //}
    }
}
