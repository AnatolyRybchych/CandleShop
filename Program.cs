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
            builder.Services.AddScoped<ISQLConnectionService, MSSQL>((provider)=> 
                new MSSQL(builder.Configuration.GetConnectionString("CandleDatabase"))
                );
            builder.Services.AddScoped<HomeModel>((provider)=> 
            {
                var connectionService = provider.GetService<ISQLConnectionService>();
                if(connectionService == null) throw new Exception("Not implemented service error");
                else return new HomeModel(connectionService.connection);
            }
            );
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
