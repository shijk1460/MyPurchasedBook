using Microsoft.AspNetCore.Mvc;
using MyPurchasedBook.Class;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        #region GetBook
        [HttpGet]
        [Route("GetBook")]
        public List<Book> GetBook()
        {
            BookHelper bookHelper = new BookHelper();
            List<Book> bookList = bookHelper.GetBook();
            return bookList;
        }
        #endregion

        #region AddBook
        [HttpPost]
        public IActionResult Create(Book book)
        {
            BookHelper bookHelper = new BookHelper();
            string bookList = bookHelper.AddBook(book);
            //return Ok(bookList);
            return CreatedAtAction(null, new { id = bookList }, book);
        }
        #endregion

        #region Check Exist Title Book
        [HttpGet]
        [Route("CheckTitleBook")]
        public bool CheckTitleBook(string TitleName)
        {
            BookHelper bookHelper = new BookHelper();
            bool existBook = bookHelper.CheckTitleBook(TitleName);
            return existBook;
        }
        #endregion















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
