using System.Data.SqlClient;
using CandleShop;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Models
{
    public class HomeModel:Page
    {
        public HomeModel(SqlConnection con):base(con)
        {
        }

        public override string Title => "Candle shop";
    }
}