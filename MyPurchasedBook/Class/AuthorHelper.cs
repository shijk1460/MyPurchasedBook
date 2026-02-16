using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;
using System.Data;

namespace MyPurchasedBook.Class
{
    public class AuthorHelper
    {
        SqlConnection conn;
        SqlDataReader rdr = null;

        public AuthorHelper()
        {
            Utils utils = new Utils();
            var txtFile = utils.ReadFile();
            var value = txtFile.Result.Split(";");
            conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
        }

        #region GetAuthorList
        public List<Author> GetAuthorList()
        {
            List<Author> AuthorList = new List<Author>();
            Author author = new Author();
            try
            {
                // Open the connection
                conn.Open();

                // Pass the connection to a command object
                SqlCommand cmd = new SqlCommand("Select [AuthorID],[AuthorName] from Authors");
                cmd.Connection = conn;

                // Use the connection

                // get query results
                rdr = cmd.ExecuteReader();

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
                Utils.WriteLogs($"AuthorHelper.GetAuthorList (Err) : {ex.Message}");
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

        #region AddAuthor
        public string AddAuthor(string AuthorName)
        {
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"INSERT INTO Authors ([AuthorName]) OUTPUT INSERTED.AuthorID VALUES(N'{AuthorName}');");

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
                Utils.WriteLogs($"AuthorHelper.AddAuthor (Err) : {ex.Message}");
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

        #region ReplaceAuthorValue
        public string ReplaceAuthorValue (string Authors)
        {
            var AuthorList = Authors.Split(',');
            if (AuthorList.Length > 0) {
                var authors = GetAuthorList();
                for (int i = 0; i < AuthorList.Length; i++)
                {
                    var selectAuthors = authors.Where((author) => author.ID.ToString() == AuthorList[i]);
                    AuthorList[i] = selectAuthors.FirstOrDefault().Name;
                }
                return string.Join(',', AuthorList);
            }
            return Authors;
        }
        #endregion
    }
}
