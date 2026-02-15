using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;
using System.Data;
namespace MyPurchasedBook.Class
{
    public class BookHelper
    {
        SqlConnection conn;
        SqlDataReader rdr = null;

        public BookHelper()
        {
            Utils utils = new Utils();
            var txtFile = utils.ReadFile();
            var value = txtFile.Result.Split(";");
            conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
        }

        #region GetBook
        public List<Book> GetBook()
        {
            List<Book> bookList = new List<Book>();
            Book book = new Book();
            try
            {
                // Open the connection
                conn.Open();

                // Pass the connection to a command object
                SqlCommand cmd = new SqlCommand("Select [Title],[ISBN],[Author],[Publisher],[Publish Date],[Categories],[Description],[Image] from Books");
                cmd.Connection = conn;

                // Use the connection

                // get query results
                rdr = cmd.ExecuteReader();

                // loop each record
                while (rdr.Read())
                {
                    book = new Book
                    {
                        Title = Convert.ToString(rdr["Title"]),
                        ISBN = Convert.ToString(rdr["ISBN"]),
                        Author = Convert.ToString(rdr["Author"]),
                        Publisher = Convert.ToString(rdr["Publisher"]),
                        PublishDate = Convert.ToString(rdr["Publish Date"]),
                        Categories = Convert.ToString(rdr["Categories"]),
                        Description = Convert.ToString(rdr["Description"]),
                        Image = (rdr["Image"] == DBNull.Value) ? null : (byte[])rdr["Image"]
                    };

                    bookList.Add(book);
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"BookHelper.GetBook (Err) : {ex.Message}");
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return bookList;
        }
        #endregion

        #region AddBook
        public string AddBook(Book book)
        {
            try
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

                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"INSERT INTO Books ([Title],[ISBN],[Author],[Publisher],[Publish Date],[TimeStamp],[Categories],[Description],[Image],[ImageType]) OUTPUT INSERTED.ISBN VALUES(N'{book.Title}', '{book.ISBN}', '{book.Author}', '{book.Publisher}', '{book.PublishDate}', GETDATE(), '{book.Categories}', N'{book.Description}', @Image, '{book.ImageType}');");

                cmd.Parameters.Add("@Image", SqlDbType.VarBinary, book.Image.Length).Value = book.Image;

                cmd.Connection = conn;

                // Use the connection

                // get query results
                rdr = cmd.ExecuteReader();

                if (rdr.Read())
                {
                    return rdr[0].ToString();
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"BookHelper.AddBook (Err) : {ex.Message}");
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return "";
        }
        #endregion

        #region CheckTitleBook
        public bool CheckTitleBook(string TitleName)
        {
            bool existBook = false;
            try
            {
                // Open the connection
                conn.Open();

                // Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"Select Count([Title]) from Books Where [Title] COLLATE SQL_Latin1_General_CP1_CS_AS = N'{TitleName}' Group By [Title]");
                cmd.Connection = conn;

                // Use the connection
                // get query results
                rdr = cmd.ExecuteReader();

                // loop each record
                while (rdr.Read())
                {
                    return Convert.ToUInt32(rdr[0].ToString()) > 0 ? true : false ;
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"BookHelper.CheckTitleBook (Err) : {ex.Message}");
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return existBook;
        }
        #endregion

        #region CheckISBN
        public bool CheckISBN(string ISBN)
        {
            bool existISBN = false;
            try
            {
                // Open the connection
                conn.Open();

                // Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"Select Count([ISBN]) from Books Where [ISBN] = '{ISBN}' Group By [ISBN]");
                cmd.Connection = conn;

                // Use the connection
                // get query results
                rdr = cmd.ExecuteReader();

                // loop each record
                while (rdr.Read())
                {
                    return Convert.ToUInt32(rdr[0].ToString()) > 0 ? true : false;
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"BookHelper.CheckISBN (Err) : {ex.Message}");
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return existISBN;
        }
        #endregion
    }
}
