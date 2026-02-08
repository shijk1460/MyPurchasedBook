using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;
using System.Data;
using System.IO;

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
                    //string name = rdr.GetByte(8).ToString();

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
                Utils.WriteLogs($"Utils.GetBook (Err) : {ex.Message}");
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

        public string AddBook(Book book) 
        {
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                //var filePath = @$"{book.Image}";
                //byte[] photo = Utils.GetPhoto(new FileInfo(filePath).Directory.FullName);
                //byte[] photo = Utils.GetPhoto($"{book.Image.Replace("\\","\\\\")}");

                SqlCommand cmd = new SqlCommand($"INSERT INTO Books ([Title],[ISBN],[Author],[Publisher],[Publish Date],[TimeStamp],[Categories],[Description],[Image]) OUTPUT INSERTED.ISBN VALUES('{book.Title}', '{book.ISBN}', '{book.Author}', '{book.Publisher}', '{book.PublishDate}', GETDATE(), '{book.Categories}', '{book.Description}', @Image);");

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
                Utils.WriteLogs($"Utils.AddBook (Err) : {ex.Message}");
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
    }
}
