using MyPurchasedBook.Models;
namespace MyPurchasedBook.Class
{
    public class BookHelper
    {
        #region GetBook
        public List<Book> GetBook()
        {
            var sql = "Select [Title],[ISBN],[Author],[Publishers].[PublisherName] [Publisher],[Publish Date],[Categories],[Description],[Image],[ImageType] from Books INNER JOIN Publishers ON Publishers.PublisherID = [Publisher]";
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

            var sql = $"INSERT INTO Books ([Title],[ISBN],[Author],[Publisher],[Publish Date],[TimeStamp],[Categories],[Description],[Image],[ImageType]) OUTPUT INSERTED.ISBN VALUES(N'{book.Title}', '{book.ISBN}', '{book.Author}', '{book.Publisher}', '{book.PublishDate}', GETDATE(), '{book.Categories}', N'{book.Description}', @Image, '{book.ImageType}');";
            string SqlResult = DbHelper.ExecuteSqlstringImage(sql, book.Image);
            return SqlResult;
        }
        #endregion

        #region CheckTitleBook
        public bool CheckTitleBook(string TitleName)
        {
            var sql = $"Select Count([Title]) from Books Where [Title] COLLATE SQL_Latin1_General_CP1_CS_AS = N'{TitleName}' Group By [Title]";
            bool SqlResult = DbHelper.ExecuteSqlbool(sql);
            return SqlResult;
        }
        #endregion

        #region CheckISBN
        public bool CheckISBN(string ISBN)
        {
            var sql = $"Select Count([ISBN]) from Books Where [ISBN] = '{ISBN}' Group By [ISBN]";
            bool SqlResult = DbHelper.ExecuteSqlbool(sql);
            return SqlResult;
        }
        #endregion

        #region EditBook
        public string EditBook(Book book)
        {
            var sql = $"UPDATE Books SET [Title] = N'{book.Title}',[Author] = '{book.Author}',[Publisher] = '{book.Publisher}',[Publish Date] = '{book.PublishDate}',[TimeStamp] = GETDATE(),[Categories] = '{book.Categories}',[Description] = N'{book.Description}',[Image] = @Image,[ImageType] = '{book.ImageType}' WHERE [ISBN] = '{book.ISBN}';";
            string SqlResult = DbHelper.ExecuteSqlstringImage(sql, book.Image);
            return SqlResult;
        }
        #endregion

        #region DeleteBook
        public string DeleteBook(string ISBN)
        {
            var sql = $"DELETE FROM Books WHERE [ISBN] = '{ISBN}';";
            string SqlResult = DbHelper.ExecuteSqlstring(sql);
            return SqlResult;
        }
        #endregion
    }
}
