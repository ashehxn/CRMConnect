using CRMConnect.Server.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace CRMConnect.Server.Dtos.Sale
{
    public class SaleDto
    {
        public int SaleId { get; set; }
        public string ProductName { get; set; } = string.Empty;
        public decimal SaleAmount { get; set; }
        public DateTime SaleDate { get; set; }
        public int? SalesRepId { get; set; }
        public SalesRepresentative? SalesRepresentative { get; set; }
        public int? CustomerId { get; set; }
        public Models.Customer? Customer { get; set; }
    }
}
