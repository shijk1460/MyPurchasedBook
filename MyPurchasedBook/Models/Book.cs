using Newtonsoft.Json;

namespace MyPurchasedBook.Models
{
    public class Book
    {
        [JsonProperty("Title")]
        public string? Title { get; set; }
        [JsonProperty("ISBN")]
        public string? ISBN { get; set; }
        [JsonProperty("Author")]
        public string? Author { get; set; }
        [JsonProperty("Publisher")]
        public string? Publisher { get; set; }
        [JsonProperty("PublishDate")]
        public string? PublishDate { get; set; }
        [JsonProperty("Categories")]
        public string? Categories { get; set; }
        [JsonProperty("Description")]
        public string? Description { get; set; }
        [JsonIgnore]
        public DateTime? TimeStamp { get; set; }
        [JsonProperty("Image")]
        public byte[]? Image { get; set; }
    }
}