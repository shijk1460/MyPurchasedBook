using Microsoft.AspNetCore.Mvc;

namespace MyPurchasedBook.Controllers
{
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
    }
}
