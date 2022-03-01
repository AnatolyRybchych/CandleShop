
namespace CandleShop.Models.Shared
{
    public abstract class Page
    {
        public Page()
        {
            Header = new Header();
        }
        public Header Header{get; protected set;}
        public string Title { get; protected set; } = "Title";
        public void InitViewBag(dynamic viewBag)
        {
            Header.InitViewBag(viewBag);
            viewBag.Title = this.Title;
        }
    }


}