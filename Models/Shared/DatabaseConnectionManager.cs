using System.Data.SqlClient;

namespace CandleShop.Models.Shared
{
    public class DatabaseConnectionManager
    {
        private string connectionString;
        private bool isOpened;
        private SqlConnection connection;
        public DatabaseConnectionManager(string connectionString)
        {
            this.isOpened = false;
            this.connectionString = connectionString;
            this.connection = new SqlConnection(connectionString);
        }

        public void WithOpenConnection(Action<SqlConnection> doDatabaseAction)
        {
            bool isReqursiveOpened = isOpened;
            if(isReqursiveOpened == false)
            {
                connection.Open();
            }

            doDatabaseAction(connection);

            if(isReqursiveOpened == false)
            {
                connection.Close();
            }
        }
        
        ~DatabaseConnectionManager()
        {
            connection.Dispose();
        }
    }
}