using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Class
{
    public class PublisherHelper
    {
        #region GetPublisherList
        public List<Publisher> GetPublisherList()
        {
            var sql = "Select [PublisherID],[PublisherName] from Publishers";
            List<Publisher> SqlResult = DbHelper.ExecuteSqlListPublisher(sql);
            return SqlResult;
        }
        #endregion

        #region AddPublisher
        public string AddPublisher(string PublisherName)
        {
            var sql = $"INSERT INTO Publishers ([PublisherName]) OUTPUT INSERTED.PublisherID VALUES(N'{PublisherName}');";
            string SqlResult = DbHelper.ExecuteSqlstring(sql);
            return SqlResult;
        }
        #endregion
    }
}
