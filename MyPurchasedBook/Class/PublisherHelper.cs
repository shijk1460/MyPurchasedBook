using MyPurchasedBook.Models;

namespace MyPurchasedBook.Class
{
    public class PublisherHelper
    {
        #region GetPublisherList
        public List<Publisher> GetPublisherList()
        {
            var sql = "GetPublisherList";
            List<Publisher> SqlResult = DbHelper.ExecuteSqlListPublisher(sql);
            return SqlResult;
        }
        #endregion

        #region AddPublisher
        public string AddPublisher(string PublisherName)
        {
            var sql = $"InsertPublisher N'{PublisherName}'";
            string SqlResult = DbHelper.ExecuteSqlstring(sql);
            return SqlResult;
        }
        #endregion
    }
}
