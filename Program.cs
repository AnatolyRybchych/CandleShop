using System.Data;
using System.Data.SqlClient;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllersWithViews();
            builder.Services.AddScoped<IDbConnection>((provider)=>
                new SqlConnection(builder.Configuration.GetConnectionString("CandleDatabase"))
                );

            builder.Services.AddHomeModelService();
            builder.Services.AddAboutModelService();
            builder.Services.AddShopModelService();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                app.UseHsts();
            }

            

            app.UseHttpsRedirection();
            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");

            app.Run();
        }
    }
}
