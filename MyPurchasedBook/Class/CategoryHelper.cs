using Microsoft.Data.SqlClient;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Class
{
    public class CategoryHelper
    {
        SqlConnection conn;
        SqlDataReader rdr = null;

        public CategoryHelper()
        {
            Utils utils = new Utils();
            var txtFile = utils.ReadFile();
            var value = txtFile.Result.Split(";");
            conn = new SqlConnection($"Data Source={value[0].Split("=")[1]};Initial Catalog={value[1].Split("=")[1]};Integrated Security=True;TrustServerCertificate=True;");
        }

        #region GetCategoryList
        public List<Category> GetCategoryList()
        {
            List<Category> CategoryList = new List<Category>();
            Category category = new Category();
            try
            {
                // Open the connection
                conn.Open();

                // Pass the connection to a command object
                SqlCommand cmd = new SqlCommand("Select [CategoryID],[CategoryName] from Categories");
                cmd.Connection = conn;

                // Use the connection

                // get query results
                rdr = cmd.ExecuteReader();

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
                Utils.WriteLogs($"CategoryHelper.GetCategoryList (Err) : {ex.Message}");
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

        #region AddCategory
        public string AddCategory(string CategoryName)
        {
            try
            {
                // Open the connection
                conn.Open();

                // 3. Pass the connection to a command object
                SqlCommand cmd = new SqlCommand($"INSERT INTO Categories ([CategoryName]) OUTPUT INSERTED.CategoryID VALUES(N'{CategoryName}');");

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
                Utils.WriteLogs($"CategoryHelper.AddCategory (Err) : {ex.Message}");
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
