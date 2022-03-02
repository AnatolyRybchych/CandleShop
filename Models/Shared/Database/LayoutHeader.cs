using CandleShop.Models.Shared;

namespace CandleShop.Models.Shared.Database
{
    public class LayoutHeader : DatabaseTable
    {
        public override string TableName => "LayoutHeader";

        [DatabaseClolumn("Id", DatabaseClolumnAttribute.DBColAttribs.Select, System.Data.SqlDbType.Int)]
        public int Id{ get; set; }

        [DatabaseClolumn("Region", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.VarChar)]
        public string? Region{ get; set; }

        [DatabaseClolumn("Short", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.VarChar)]
        public string? Short{ get; set; }

        [DatabaseClolumn("Home", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.VarChar)]
        public string? Home{ get; set; }

        [DatabaseClolumn("About", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.VarChar)]
        public string? About{ get; set; }

        [DatabaseClolumn("Shop", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.VarChar)]
        public string? Shop{ get; set; }
    }
}