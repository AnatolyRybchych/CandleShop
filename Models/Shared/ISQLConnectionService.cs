using System.Data.SqlClient;

namespace CandleShop.Models.Shared
{
    public interface ISQLConnectionService
    {
        public SqlConnection connection { get;}
    }
}