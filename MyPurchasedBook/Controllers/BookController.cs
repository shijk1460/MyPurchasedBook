using Microsoft.AspNetCore.Mvc;
using MyPurchasedBook.Class;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        [HttpGet]
        [Route("GetBook")]
        public List<Book> GetBook()
        {
            BookHelper bookHelper = new BookHelper();
            List<Book> bookList = bookHelper.GetBook();
            return bookList;
        }

        //[HttpPost("AddBook")]
        //public IActionResult AddBook(Book book)
        //{
        //    BookHelper bookHelper = new BookHelper();
        //    List<Book> bookList = bookHelper.GetBook();
        //    return Ok(bookList);
        //}

        [HttpPost]
        //[Route("AddBook")]
        public IActionResult Create(Book book)//[FromBody]Book book
        {
            BookHelper bookHelper = new BookHelper();
            string bookList =  bookHelper.AddBook(book);
            //return Ok(bookList);
            return CreatedAtAction(null, new { id = bookList }, book);
        }

        //#region MyRegion

        //[HttpPut("{id}")]
        //public IActionResult Update(int id, Pizza pizza)
        //{
        //    if (id != pizza.Id)
        //        return BadRequest();

        //    var existingPizza = PizzaService.Get(id);
        //    if (existingPizza is null)
        //        return NotFound();

        //    PizzaService.Update(pizza);

        //    return NoContent();
        //}
        //#endregion

        //#region MyRegion

        //[HttpDelete("{id}")]
        //public IActionResult Delete(int id)
        //{
        //    var pizza = PizzaService.Get(id);

        //    if (pizza is null)
        //        return NotFound();

        //    PizzaService.Delete(id);

        //    return NoContent();
        //}
        //#endregion
    }
}
