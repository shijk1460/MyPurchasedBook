using Microsoft.AspNetCore.Mvc;
using MyPurchasedBook.Class;
using MyPurchasedBook.Models;

namespace MyPurchasedBook.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PublisherController : ControllerBase
    {
        #region Get Publisher List
        [HttpGet]
        [Route("GetPublisherList")]
        public List<Publisher> GetPublisherList()
        {
            PublisherHelper publisherHelper = new PublisherHelper();
            List<Publisher> PublisherList = publisherHelper.GetPublisherList();
            return PublisherList;
        }
        #endregion
    }
}
