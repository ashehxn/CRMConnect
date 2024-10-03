namespace CRMConnect.Server.Dtos.Sale
{
    public class UpdateSaleDto
    {
        public string ProductName { get; set; } = string.Empty;
        public decimal SaleAmount { get; set; }
        public DateTime SaleDate { get; set; }
        public int? SalesRepId { get; set; }
        public int? CustomerId { get; set; }
    }
}
