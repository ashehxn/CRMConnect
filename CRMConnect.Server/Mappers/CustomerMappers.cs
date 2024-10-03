using CRMConnect.Server.Dtos.Customer;
using CRMConnect.Server.Models;

namespace CRMConnect.Server.Mappers
{
    public static class CustomerMappers
    {
        public static CustomerDto ToCustomerDto(this Customer customerDto)
        {
            return new CustomerDto
            {
                CustomerId = customerDto.CustomerId,
                Name = customerDto.Name,
                Email = customerDto.Email,
                Phone = customerDto.Phone,
                Address = customerDto.Address,
                Gender = customerDto.Gender,
                Industry = customerDto.Industry
            };
        }

        public static Customer ToCustomerFromCreateDto(this CreateCustomerDto customerDto)
        {
            return new Customer
            {
                Name = customerDto.Name,
                Email = customerDto.Email,
                Phone = customerDto.Phone,
                Address = customerDto.Address,
                Gender = customerDto.Gender,
                Industry = customerDto.Industry
            };
        }
    }
}
