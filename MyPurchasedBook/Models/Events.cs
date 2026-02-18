using Newtonsoft.Json;

namespace MyPurchasedBook.Models
{
    public class Events
    {
        [JsonProperty("TableName")]
        public string? TableName { get; set; }
        [JsonProperty("Json")]
        public string? Json { get; set; }
    }
}
