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
            string bookID = bookHelper.AddBook(book);
            return CreatedAtAction(null, new { id = bookID }, book);

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

        #region Check Exist ISBN 
        [HttpGet]
        [Route("CheckISBN")]
        public bool CheckISBN(string ISBN)
        {
            BookHelper bookHelper = new BookHelper();
            bool existBook = bookHelper.CheckISBN(ISBN);
            return existBook;
        }
        #endregion

        #region UpdateBook
        [HttpPut]
        public IActionResult Update(Book book)
        {
            BookHelper bookHelper = new BookHelper();
            var checkExistISBN = CheckISBN(book.ISBN);
            if (checkExistISBN)
            {
                bookHelper.EditBook(book);
                return NoContent();
            }
            else return NotFound();
        }
        #endregion

        #region DeleteBook
        [HttpDelete("{ISBN}")]
        public IActionResult Delete(string ISBN)
        {
            BookHelper bookHelper = new BookHelper();
            var checkExistISBN = bookHelper.CheckISBN(ISBN);

            if (!checkExistISBN)
                return NotFound();

            bookHelper.DeleteBook(ISBN);

            return NoContent();
        }
        #endregion
    }
}
