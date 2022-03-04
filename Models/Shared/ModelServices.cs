
using System.Data;
using CandleShop;
using CandleShop.Models;


namespace CandleShop.Models.Shared
{
    public static class ModelServices
    {
        private static IDbConnection GetConnectionService(IServiceProvider serviceProvider)
        {
            var con = serviceProvider.GetService<IDbConnection>();
            if(con == null) throw new Exception("there are no IDbConnection service");
            else return con;
        }
        public static void AddHomeModelService(this IServiceCollection target)
        {
            target.AddScoped<HomeModel>((provider) => 
                new HomeModel(GetConnectionService(provider))
            );
        }

        public static void AddAboutModelService(this IServiceCollection target)
        {
            target.AddScoped<AboutModel>((provider) => 
                new AboutModel(GetConnectionService(provider))
            );
        }

        public static void AddShopModelService(this IServiceCollection target)
        {
            target.AddScoped<ShopModel>((provider) => 
                new ShopModel(GetConnectionService(provider))
            );
        }
    }
}