using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Class
{
    public class CategoryHelper
    {
        #region GetCategoryList
        public List<Category> GetCategoryList()
        {
            var sql = "Select [CategoryID],[CategoryName] from Categories";
            List<Category> SqlResult = DbHelper.ExecuteSqlListCategory(sql);
            return SqlResult;
        }
        #endregion

        #region AddCategory
        public string AddCategory(string CategoryName)
        {
            var sql = $"INSERT INTO Categories ([CategoryName]) OUTPUT INSERTED.CategoryID VALUES(N'{CategoryName}');";
            string SqlResult = DbHelper.ExecuteSqlstring(sql);
            return SqlResult;
        }
        #endregion

        #region ReplaceCategoryValue
        public string ReplaceCategoryValue(string Categories)
        {
            var CategoryList = Categories.Split(',');
            if (CategoryList.Length > 0)
            {
                var categories = GetCategoryList();
                for (int i = 0; i < CategoryList.Length; i++)
                {
                    var selectcategory = categories.Where((category) => category.ID.ToString() == CategoryList[i]);
                    CategoryList[i] = selectcategory.FirstOrDefault().Name;
                }
                return string.Join(',', CategoryList);
            }
            return Categories;
        }
        #endregion
    }
}
