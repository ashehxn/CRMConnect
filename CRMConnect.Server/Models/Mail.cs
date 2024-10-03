namespace CRMConnect.Server.Models
{
    public class Mail
    {
        public int MailId { get; set; }
        public string Subject { get; set; } = string.Empty;
        public string Body { get; set; } = string.Empty;
        public DateTime SentAt { get; set; } = DateTime.Now;
        public int? SalesRepId { get; set; }
        public SalesRepresentative? SalesRepresentative { get; set; }
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
    }
}
