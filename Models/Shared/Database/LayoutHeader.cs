using CandleShop.Models.Shared;

namespace CandleShop.Models.Shared.Database
{
    public class LayoutHeader : DatabaseTable
    {
        public override string TableName => "LayoutHeader";

        [DatabaseClolumn("Id", DatabaseClolumnAttribute.DBColAttribs.Select, System.Data.SqlDbType.Int)]
        public int Id{ get; set; }

        [DatabaseClolumn("Home", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.NVarChar)]
        public string? Home{ get; set; }

        [DatabaseClolumn("About", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.NVarChar)]
        public string? About{ get; set; }

        [DatabaseClolumn("Shop", DatabaseClolumnAttribute.DBColAttribs.All, System.Data.SqlDbType.NVarChar)]
        public string? Shop{ get; set; }
    }
}