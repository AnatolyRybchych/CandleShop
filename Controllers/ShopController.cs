using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;

namespace CandleShop.Controllers;

public class ShopController : Controller
{
    private readonly ShopModel model;

    public ShopController(ShopModel model)
    {
        this.model = model;
    }

    public IActionResult Index()
    {       
        model.InitViewBag(ViewBag);

        return View(model);
    }
}
