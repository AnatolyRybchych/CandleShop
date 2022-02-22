using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;

namespace CandleShop.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        var model = new HomeModel();
        model.InitViewBag(ViewBag);

        return View(model);
    }
}
