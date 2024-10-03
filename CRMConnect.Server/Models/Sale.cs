using System.ComponentModel.DataAnnotations.Schema;

namespace CRMConnect.Server.Models
{
    public class Sale
    {
        public int SaleId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        [Column(TypeName = "decimal(18,2)")]
        public decimal SaleAmount { get; set; }
        public DateTime SaleDate { get; set; }
        public int? SalesRepId { get; set; }
        public SalesRepresentative? SalesRepresentative { get; set; }
        public int? CustomerId { get; set; }
        public Customer? Customer { get; set; }
    }
}
