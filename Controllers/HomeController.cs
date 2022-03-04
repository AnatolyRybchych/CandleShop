using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Controllers;

public class HomeController : Controller
{
    private readonly HomeModel model;

    public HomeController(HomeModel model)
    {
        this.model = model;
    }

    public IActionResult Index()
    {       
        model.InitViewBag(ViewBag);

        return View(model);
    }
}
