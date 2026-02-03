namespace MyPurchasedBook.Models
{
    public class Book
    {
        public string? Title { get; set; }
        public string? ISBN { get; set; }
        public string? Author { get; set; }
        public string? Publisher { get; set; }
        public string? PublishDate { get; set; }
        public string? Categories { get; set; }
        public string? Description { get; set; }
        public DateTime? TimeStamp { get; set; }
        public string? Image { get; set; }
    }
}