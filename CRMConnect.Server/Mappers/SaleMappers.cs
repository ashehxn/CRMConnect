using CRMConnect.Server.Dtos.Customer;
using CRMConnect.Server.Dtos.Sale;
using CRMConnect.Server.Models;

namespace CRMConnect.Server.Mappers
{
    public static class SaleMappers
    {
        public static SaleDto ToSaleDto(this Sale saleDto)
        {
            return new SaleDto
            {
                SaleId = saleDto.SaleId,
                ProductName = saleDto.ProductName,
                SaleAmount = saleDto.SaleAmount,
                SaleDate = saleDto.SaleDate,
                SalesRepId = saleDto.SalesRepId,
                SalesRepresentative = saleDto.SalesRepresentative,
                CustomerId = saleDto.CustomerId,
                Customer = saleDto.Customer,
            };
        }

        public static Sale ToSaleFromCreateDto(this CreateSaleDto saleDto)
        {
            return new Sale
            {
                ProductName = saleDto.ProductName,
                SaleAmount = saleDto.SaleAmount,
                SaleDate = saleDto.SaleDate,
                SalesRepId = saleDto.SalesRepId,
                CustomerId = saleDto.CustomerId
            };
        }
    }
}
