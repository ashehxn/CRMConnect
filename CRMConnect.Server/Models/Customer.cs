using System.Text.Json.Serialization;

namespace CRMConnect.Server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Gender
    {
        Male = 0,
        Female = 1,
        Other = 2
    }
    public class Customer
    {
        public int CustomerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public Gender Gender { get; set; }
        public string Industry { get; set; } = string.Empty;
        public List<Sale> Sales { get; set; } = new List<Sale>();
        public List<Mail> Mails { get; set; } = new List<Mail>();
    }
}
