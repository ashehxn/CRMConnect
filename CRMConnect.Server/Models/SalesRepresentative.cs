using System.ComponentModel.DataAnnotations;

namespace CRMConnect.Server.Models
{
    public class SalesRepresentative
    {
        [Key]
        public int SalesRepId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
        public List<Sale> Sales { get; set; } = new List<Sale>();
        public List<Mail> Mails { get; set; } = new List<Mail>();
        public List<Task> Tasks { get; set; } = new List<Task>();
    }
}
