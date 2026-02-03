using Microsoft.AspNetCore.Mvc;
using MyPurchasedBook.Class;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        [HttpGet("GetBook")]
        public List<Book> GetBook()
        {
            BookHelper bookHelper = new BookHelper();
            List<Book> bookList = bookHelper.GetBook();
            return bookList;
        }

        /*
        public ActionResult Add()
        {
            return Json(new { status = "Hi", OneMoreField = 1234 });
        }         
         */
    }
}
