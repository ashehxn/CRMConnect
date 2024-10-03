using CRMConnect.Server.Data;
using CRMConnect.Server.Dtos.Customer;
using CRMConnect.Server.Mappers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace CRMConnect.Server.Controllers
{
    [Route("/api/customer")]
    [ApiController]
    public class CustomerContoller : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public CustomerContoller(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var customers = await _context.Customers.ToListAsync();
            return Ok(customers);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var customer = await _context.Customers.FindAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateCustomerDto customerDto)
        {
            var customerModel = customerDto.ToCustomerFromCreateDto();
            await _context.Customers.AddAsync(customerModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = customerModel.CustomerId }, customerModel.ToCustomerDto());
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update([FromRoute] int id, [FromBody] UpdateCustomerDto customerDto)
        {
            var customerModel = await _context.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);

            if (customerModel == null)
            {
                return NotFound();
            }

            customerModel.Name = customerDto.Name;
            customerModel.Email = customerDto.Email;
            customerModel.Phone = customerDto.Phone;
            customerModel.Address = customerDto.Address;
            customerModel.Gender = customerDto.Gender;
            customerModel.Industry = customerDto.Industry;

            await _context.SaveChangesAsync();

            return Ok(customerModel.ToCustomerDto());
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            var customerModel = await _context.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);

            if (customerModel == null)
            {
                return NotFound();
            }

            _context.Customers.Remove(customerModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
