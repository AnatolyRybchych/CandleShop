
using System.Data;
using System.Data.SqlClient;

namespace CandleShop.Models.Shared
{
    public abstract class Page
    {
        public Page(IDbConnection con)
        {
            con.Open();
            
            Header = new Header();
            InitHeader(con);

            con.Close();
        }
        private void InitHeader(IDbConnection con)
        {
            var cmd = con.CreateCommand();
            cmd.CommandText = $"SELECT [Home], [Shop], [About] FROM LayoutHeader WHERE Id = 1;";
            var reader = cmd.ExecuteReader();
            
            if(reader.Read())
            {
                Header.Home = (string)reader["Home"];
                Header.Shop = (string)reader["Shop"];
                Header.About = (string)reader["About"];
            }
            
            reader.Close();
        }
        public Header Header{get; protected set;}
        public abstract string Title { get; }
        public void InitViewBag(dynamic viewBag)
        {
            Header.InitViewBag(viewBag);
            viewBag.Title = this.Title;
        }
    }


}