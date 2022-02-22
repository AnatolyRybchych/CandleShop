using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Controllers;

public class HomeController : Controller
{
    private readonly DatabaseConnectionManager dbConnectionMagager;

    public HomeController(DatabaseConnectionManager dbConnectionMagager)
    {
        this.dbConnectionMagager = dbConnectionMagager;
    }

    public IActionResult Index()
    {
        var model = new HomeModel();
        model.InitViewBag(ViewBag);

        return View(model);
    }
}
