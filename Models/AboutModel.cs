using System.Data;
using System.Data.SqlClient;
using CandleShop;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Models
{
    public class AboutModel:Page
    {
        public AboutModel(IDbConnection con):base(con)
        {
        }

        public override string Title => "про Candle shop";
    }
}