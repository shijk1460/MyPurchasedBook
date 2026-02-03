using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;

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
                // 2. Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand("Select [Title],[ISBN],[Author],[Publisher],[Publish Date],[Categories],[Description] from Books");
                cmd.Connection = conn;

                // 4. Use the connection

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
                    };
                    bookList.Add(book);
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"Utils.ReadFile (Err) : {ex.Message}");
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // 5. Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return bookList;
        }
        #endregion

        public string AddBook(Book book) {

            /*
             
             INSERT INTO table_name (column1, column2, column3, ...)VALUES (value1, value2, value3, ...);
             
             [dbo].[Books]
            
            SELECT TOP (200) ID, Title, ISBN, Author, Publisher, [Publish Date], TimeStamp, Categories, Description
            FROM   Books


             */

            try
            {
                // 2. Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                //SqlCommand cmd = new SqlCommand("select * from Customers", conn);
                SqlCommand cmd = new SqlCommand($"INSERT INTO Books ([Title],[ISBN],[Author],[Publisher],[Publish Date],[TimeStamp],[Categories],[Description]) OUTPUT INSERTED.ID VALUES('{book.Title}', '{book.ISBN}', '{book.Author}', '{book.Publisher}', '{book.PublishDate}', GETDATE(), '{book.Categories}', '{book.Description}');");
                cmd.Connection = conn;

                //
                // 4. Use the connection
                //

                // using (SqlDataReader reader = cmd.ExecuteReader())
                //            {
                //                if (reader.Read())
                //                {
                //                    book = new Book
                //                    {
                //                        Title = Convert.ToString(reader["Title"]),
                //                    };
                //                    bookList.Add(book);
                //                }
                //            }

                // get query results
                rdr = cmd.ExecuteReader();

                // print the CustomerID of each record
                while (rdr.Read())
                {
                    //TimeStamp
                    return Convert.ToString(rdr[0]).ToString();
                }

                //if (rdr.Read())
                //{
                //    book = new Book
                //    {
                //        Title = Convert.ToString(rdr["Title"]),
                //    };
                //    bookList.Add(book);
                //}
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"Utils.ReadFile (Err) : {ex.Message}");
            }
            finally
            {
                // close the reader
                if (rdr != null)
                {
                    rdr.Close();
                }

                // 5. Close the connection
                if (conn != null)
                {
                    conn.Close();
                }
            }

            return "";
        }
    }
}
