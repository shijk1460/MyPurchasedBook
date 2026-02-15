using Microsoft.AspNetCore.Mvc;
using MyPurchasedBook.Class;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        #region Get Category List
        [HttpGet]
        [Route("GetCategoryList")]
        public List<Category> GetCategoryList()
        {
            CategoryHelper categoryHelper = new CategoryHelper();
            List<Category> CategoryList = categoryHelper.GetCategoryList();
            return CategoryList;
        }
        #endregion
    }
}
