using Newtonsoft.Json;

namespace MyPurchasedBook.Models
{
    public class Category
    {
        [JsonProperty("ID")]
        public int? ID { get; set; }
        [JsonProperty("Name")]
        public string? Name { get; set; }
    }
}
