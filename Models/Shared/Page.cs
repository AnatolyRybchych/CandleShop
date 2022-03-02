
using System.Data.SqlClient;
using CandleShop.Models.Shared.Database;

namespace CandleShop.Models.Shared
{
    public abstract class Page
    {
        public Page(SqlConnection con)
        {
            Header = new Header();
            InitHeader(con);
        }
        private void InitHeader(SqlConnection con)
        {
            var Hdr = new LayoutHeader();
            Hdr.SelectFirstOrError(con);

            Header.Home = Hdr.Home;
            Header.Shop = Hdr.Shop;
            Header.About = Hdr.About;
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