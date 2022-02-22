using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;

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
        var model = new HomeModel();
        model.InitViewBag(ViewBag);

        return View(model);
    }
}
