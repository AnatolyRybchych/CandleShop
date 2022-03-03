using System.Data.SqlClient;

namespace CandleShop.Models.Shared
{
    public class MSSQL:ISQLConnectionService
    {
        private string connectionString;
        public SqlConnection connection { get; private set;}
        public MSSQL(string connectionString)
        {
            this.connectionString = connectionString;
            this.connection = new SqlConnection(connectionString);
            this.connection.Open();
        }
        
        ~MSSQL()
        {
            connection.Close();
            connection.Dispose();
        }
    }
}