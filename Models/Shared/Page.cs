
namespace CandleShop.Models.Shared
{
    public abstract class Page
    {
        public string Title { get; protected set; } = "Title";
        public void InitViewBag(dynamic viewBag)
        {
            viewBag.Title = this.Title;
        }
    }


}