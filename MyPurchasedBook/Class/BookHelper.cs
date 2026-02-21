using MyPurchasedBook.Models;
namespace MyPurchasedBook.Class
{
    public class BookHelper
    {
        #region GetBook
        public List<Book> GetBook()
        {
            var sql = "GetBookList";
            List<Book> SqlResult = DbHelper.ExecuteSqlListBook(sql);
            return SqlResult;
        }
        #endregion

        #region AddBook
        public string AddBook(Book book)
        {
            #region Author
            var AuthorList = book.Author?.Split(',');
            if (AuthorList?.Length > 0)
            {
                for (int i = 0; i < AuthorList.Length; i++)
                {
                    if (Int32.TryParse(AuthorList[i], out int numValue))
                    {
                        //Console.WriteLine(numValue);
                    }
                    else
                    {
                        AuthorHelper authorHelper = new AuthorHelper();
                        var authorID = authorHelper.AddAuthor(AuthorList[i]);
                        AuthorList[i] = authorID;
                    }
                }
                book.Author = string.Join(',', AuthorList);
            }
            #endregion

            #region Publisher
            if (!string.IsNullOrEmpty(book.Publisher))
            {
                if (Int32.TryParse(book.Publisher, out int numValue))
                {
                    //Console.WriteLine(numValue);
                }
                else
                {
                    PublisherHelper publisherHelper = new PublisherHelper();
                    var publisherID = publisherHelper.AddPublisher(book.Publisher);
                    book.Publisher = publisherID;
                }
            }
            #endregion

            #region Categories
            var CategoryList = book.Categories?.Split(',');
            if (CategoryList?.Length > 0)
            {
                for (int i = 0; i < CategoryList.Length; i++)
                {
                    if (Int32.TryParse(CategoryList[i], out int numValue))
                    {
                        //Console.WriteLine(numValue);
                    }
                    else
                    {
                        CategoryHelper categoryHelper = new CategoryHelper();
                        var categoryID = categoryHelper.AddCategory(CategoryList[i]);
                        CategoryList[i] = categoryID;
                    }
                }
                book.Categories = string.Join(',', CategoryList);
            }
            #endregion

            var sql = $"InsertBook N'{book.Title}', '{book.ISBN}', '{book.Author}', '{book.Publisher}', '{book.PublishDate}', '{book.Categories}', N'{book.Description}', @Image, '{book.ImageType}','{book.Price}'";
            string SqlResult = DbHelper.ExecuteSqlstringImage(sql, book.Image);
            return SqlResult;
        }
        #endregion

        #region CheckTitleBook
        public bool CheckTitleBook(string TitleName, string ISBN)
        {
            var sql = $"CheckTitleBooks N'{TitleName}','{ISBN}'";
            bool SqlResult = DbHelper.ExecuteSqlbool(sql);
            return SqlResult;
        }
        #endregion

        #region CheckISBN
        public bool CheckISBN(string ISBN)
        {
            var sql = $"CheckISBN '{ISBN}'";
            bool SqlResult = DbHelper.ExecuteSqlbool(sql);
            return SqlResult;
        }
        #endregion

        #region EditBook
        public string EditBook(Book book)
        {

            #region Author
            var AuthorList = book.Author?.Split(',');
            if (AuthorList?.Length > 0)
            {
                for (int i = 0; i < AuthorList.Length; i++)
                {
                    if (Int32.TryParse(AuthorList[i], out int numValue))
                    {
                        //Console.WriteLine(numValue);
                    }
                    else
                    {
                        AuthorHelper authorHelper = new AuthorHelper();
                        var authorID = authorHelper.AddAuthor(AuthorList[i]);
                        AuthorList[i] = authorID;
                    }
                }
                book.Author = string.Join(',', AuthorList);
            }
            #endregion

            #region Publisher
            if (!string.IsNullOrEmpty(book.Publisher))
            {
                if (Int32.TryParse(book.Publisher, out int numValue))
                {
                    //Console.WriteLine(numValue);
                }
                else
                {
                    PublisherHelper publisherHelper = new PublisherHelper();
                    var publisherID = publisherHelper.AddPublisher(book.Publisher);
                    book.Publisher = publisherID;
                }
            }
            #endregion

            #region Categories
            var CategoryList = book.Categories?.Split(',');
            if (CategoryList?.Length > 0)
            {
                for (int i = 0; i < CategoryList.Length; i++)
                {
                    if (Int32.TryParse(CategoryList[i], out int numValue))
                    {
                        //Console.WriteLine(numValue);
                    }
                    else
                    {
                        CategoryHelper categoryHelper = new CategoryHelper();
                        var categoryID = categoryHelper.AddCategory(CategoryList[i]);
                        CategoryList[i] = categoryID;
                    }
                }
                book.Categories = string.Join(',', CategoryList);
            }
            #endregion

            var sql = $"UpdateBook N'{book.Title}', '{book.Author}', '{book.Publisher}','{book.PublishDate}','{book.Categories}', N'{book.Description}',@Image,'{book.ImageType}','{book.ISBN}',{book.Price}";
            string SqlResult = DbHelper.ExecuteSqlstringImage(sql, book.Image);
            return SqlResult;
        }
        #endregion

        #region DeleteBook
        public string DeleteBook(string ISBN)
        {
            var sql = $"DeleteBook '{ISBN}'";
            string SqlResult = DbHelper.ExecuteSqlstring(sql);
            return SqlResult;
        }
        #endregion
    }
}
