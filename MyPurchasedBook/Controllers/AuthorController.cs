using Microsoft.AspNetCore.Mvc;
using MyPurchasedBook.Class;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorController : ControllerBase
    {
        #region Get Author List
        [HttpGet]
        [Route("GetAuthorList")]
        public List<Author> GetAuthorList()
        {
            AuthorHelper authorHelper = new AuthorHelper();
            List<Author> AuthorList = authorHelper.GetAuthorList();
            return AuthorList;
        }
        #endregion
    }
}
