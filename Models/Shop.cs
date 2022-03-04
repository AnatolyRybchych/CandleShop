using System.Data;
using System.Data.SqlClient;
using CandleShop;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Models
{
    public class ShopModel:Page
    {
        public ShopModel(IDbConnection con):base(con)
        {
        }

        public override string Title => "магазин Candle shop";
    }
}