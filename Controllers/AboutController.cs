using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Controllers;

public class AboutController : Controller
{
    private readonly AboutModel model;

    public AboutController(AboutModel model)
    {
        this.model = model;
    }

    public IActionResult Index()
    {       
        model.InitViewBag(ViewBag);

        return View(model);
    }
}
