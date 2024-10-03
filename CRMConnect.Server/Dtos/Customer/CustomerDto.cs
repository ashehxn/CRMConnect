using CRMConnect.Server.Models;

namespace CRMConnect.Server.Dtos.Customer
{
    public class CustomerDto
    {
        public int CustomerId { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public string Address { get; set; } = string.Empty;
        public Gender Gender { get; set; }
        public string Industry { get; set; } = string.Empty;
        public List<Models.Sale> Sales { get; set; } = new List<Models.Sale>();
        public List<Mail> Mails { get; set; } = new List<Mail>();
    }
}
