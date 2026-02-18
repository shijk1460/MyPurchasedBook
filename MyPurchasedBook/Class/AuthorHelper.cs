using MyPurchasedBook.Models;
using System.Data;

namespace MyPurchasedBook.Class
{
    public class AuthorHelper
    {
        #region GetAuthorList
        public List<Author> GetAuthorList()
        {
            var sql = "Select [AuthorID],[AuthorName] from Authors";
            List<Author> SqlResult = DbHelper.ExecuteSqlListAuthor(sql);
            return SqlResult;
        }
        #endregion

        #region AddAuthor
        public string AddAuthor(string AuthorName)
        {
            var sql = $"INSERT INTO Authors ([AuthorName]) OUTPUT INSERTED.AuthorID VALUES(N'{AuthorName}');";
            string SqlResult = DbHelper.ExecuteSqlstring(sql);
            return SqlResult;
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
