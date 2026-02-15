using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Class
{
    public class PublisherHelper
    {
        SqlConnection conn;
        SqlDataReader rdr = null;

        public PublisherHelper()
        {
            Utils utils = new Utils();
            var txtFile = utils.ReadFile();
            var value = txtFile.Result.Split(";");
            conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
        }

        #region GetPublisherList
        public List<Publisher> GetPublisherList()
        {
            List<Publisher> PublisherList = new List<Publisher>();
            Publisher publisher = new Publisher();
            try
            {
                // Open the connection
                conn.Open();

                // Pass the connection to a command object
                SqlCommand cmd = new SqlCommand("Select [PublisherID],[PublisherName] from Publishers");
                cmd.Connection = conn;

                // Use the connection

                // get query results
                rdr = cmd.ExecuteReader();

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
                Utils.WriteLogs($"PublisherHelper.GetPublisherList (Err) : {ex.Message}");
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

        #region AddPublisher
        public string AddPublisher(string PublisherName)
        {
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"INSERT INTO Publishers ([PublisherName]) OUTPUT INSERTED.PublisherID VALUES(N'{PublisherName}');");

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
                Utils.WriteLogs($"PublisherHelper.PublisherName (Err) : {ex.Message}");
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
    }
}
