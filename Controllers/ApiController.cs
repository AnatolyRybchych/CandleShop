using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CandleShop.Models;
using CandleShop.Models.Shared;
using CandleShop.Models.Shared.Database;

namespace CandleShop.Controllers;

public class ApiController : Controller
{

    public ApiController()
    {
        
    }

    public IActionResult Index()
    {       

        return View();
    }
}
