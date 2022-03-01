namespace CandleShop.Models.Shared
{
    public class Header
    {
        public string? Home { get; set; }
        public string? About { get; set; }
        public string? Shop { get; set; }

        public void InitViewBag(dynamic viewBag)
        {
            viewBag.Home = this.Home ?? "Home";
            viewBag.About = this.About ?? "About";
            viewBag.Shop = this.Shop ?? "Shop";
        }
    }


}