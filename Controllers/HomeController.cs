using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;
using CandleShop.Models.Shared.Database;

namespace CandleShop.Controllers;

public class HomeController : Controller
{
    private readonly ISQLConnectionService SQLconection;

    public HomeController(ISQLConnectionService SQLConnection)
    {
        this.SQLconection = SQLConnection;
    }

    public IActionResult Index()
    {       
        LayoutHeader header = new LayoutHeader();
        header.SelectFirstOrError(SQLconection.connection, "WHERE Short='UA'");

        var model = new HomeModel();
        model.Header.Home = header.Home;
        model.Header.Shop = header.Shop;
        model.Header.About = header.About;

        model.InitViewBag(ViewBag);

        return View(model);
    }
}
