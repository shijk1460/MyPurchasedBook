using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;
using System.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;

namespace MyPurchasedBook.Class
{
    public class DbHelper
    {
        #region ExecuteSqlListBook
        public static List<Book> ExecuteSqlListBook(string sql)
        {
            List<Book> bookList = new List<Book>();
            Book book = new Book();

            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");

                cmd.Connection = conn;

                // Use the connection
                // get query results
                rdr = cmd.ExecuteReader();

                AuthorHelper authorHelper = new AuthorHelper();
                CategoryHelper categoryHelper = new CategoryHelper();

                // loop each record
                while (rdr.Read())
                {
                    book = new Book
                    {
                        Title = Convert.ToString(rdr["Title"]),
                        ISBN = Convert.ToString(rdr["ISBN"]),
                        Author = authorHelper.ReplaceAuthorValue(Convert.ToString(rdr["Author"])),
                        Publisher = Convert.ToString(rdr["Publisher"]),
                        PublishDate = Convert.ToString(rdr["Publish Date"]),
                        Categories = (rdr["Categories"] == "") ? "" : categoryHelper.ReplaceCategoryValue(Convert.ToString(rdr["Categories"])),
                        Description = Convert.ToString(rdr["Description"]),
                        Image = (rdr["Image"] == DBNull.Value) ? null : (byte[])rdr["Image"],
                        ImageType = Convert.ToString(rdr["ImageType"]),
                        Price = Convert.ToDecimal(rdr["Price"]),
                    };

                    bookList.Add(book);
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"Utils.ExecuteSqlListBook (Err) : {ex.Message}");
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

        #region ExecuteSqlstringImage
        public static string ExecuteSqlstringImage(string sql, byte[] Image)
        {
            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");
                cmd.Parameters.Add("@Image", SqlDbType.VarBinary, Image.Length).Value = Image;
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
                Utils.WriteLogs($"Utils.ExecuteSqlstringImage (Err) : {ex.Message}");
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

        #region ExecuteSqlbool
        public static bool ExecuteSqlbool(string sql)
        {
            bool exist = false;

            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");
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
                Utils.WriteLogs($"Utils.ExecuteSqlbool (Err) : {ex.Message}");
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

            return exist;
        }
        #endregion

        #region ExecuteSqlstring
        public static string ExecuteSqlstring(string sql)
        {
            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");
                
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
                Utils.WriteLogs($"Utils.ExecuteSqlstring (Err) : {ex.Message}");
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

        #region ExecuteSqlListCategory
        public static List<Category> ExecuteSqlListCategory(string sql)
        {
            List<Category> CategoryList = new List<Category>();
            Category category = new Category();

            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");

                cmd.Connection = conn;

                // Use the connection
                // get query results
                rdr = cmd.ExecuteReader();

                AuthorHelper authorHelper = new AuthorHelper();
                CategoryHelper categoryHelper = new CategoryHelper();

                // loop each record
                while (rdr.Read())
                {
                    category = new Category
                    {
                        ID = Convert.ToInt32(rdr["CategoryID"]),
                        Name = Convert.ToString(rdr["CategoryName"]),
                    };

                    CategoryList.Add(category);
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"Utils.ExecuteSqlListCategory (Err) : {ex.Message}");
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

            return CategoryList;
        }
        #endregion

        #region ExecuteSqlListPublisher
        public static List<Publisher> ExecuteSqlListPublisher(string sql)
        {
            List<Publisher> PublisherList = new List<Publisher>();
            Publisher publisher = new Publisher();

            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");

                cmd.Connection = conn;

                // Use the connection
                // get query results
                rdr = cmd.ExecuteReader();

                AuthorHelper authorHelper = new AuthorHelper();
                CategoryHelper categoryHelper = new CategoryHelper();

                // loop each record
                while (rdr.Read())
                {
                    publisher = new Publisher
                    {
                        ID = Convert.ToInt32(rdr["PublisherID"]),
                        Name = Convert.ToString(rdr["PublisherName"]),
                    };

                    PublisherList.Add(publisher);
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"Utils.ExecuteSqlListPublisher (Err) : {ex.Message}");
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

            return PublisherList;
        }
        #endregion

        #region ExecuteSqlListAuthor
        public static List<Author> ExecuteSqlListAuthor(string sql)
        {
            List<Author> AuthorList = new List<Author>();
            Author author = new Author();

            var txtFile = Utils.ReadFile();
            var value = txtFile.Result.Split(";");
            SqlConnection conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
            SqlDataReader rdr = null;
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"{sql}");

                cmd.Connection = conn;

                // Use the connection
                // get query results
                rdr = cmd.ExecuteReader();

                AuthorHelper authorHelper = new AuthorHelper();
                CategoryHelper categoryHelper = new CategoryHelper();

                // loop each record
                while (rdr.Read())
                {
                    author = new Author
                    {
                        ID = Convert.ToInt32(rdr["AuthorID"]),
                        Name = Convert.ToString(rdr["AuthorName"]),
                    };

                    AuthorList.Add(author);
                }
            }
            catch (Exception ex)
            {
                Utils.WriteLogs($"Utils.ExecuteSqlListAuthor (Err) : {ex.Message}");
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

            return AuthorList;
        }
        #endregion
    }
}


