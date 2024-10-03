using CRMConnect.Server.Data;
using CRMConnect.Server.Dtos.Customer;
using CRMConnect.Server.Dtos.Sale;
using CRMConnect.Server.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace CRMConnect.Server.Controllers
{
    [Route("api/sale")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SaleController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var sales = _context.Sales.ToList();
            return Ok(sales);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var sale = _context.Sales.Find(id);

            if (sale == null)
            {
                return NotFound();
            }
            return Ok(sale);
        }

        [HttpPost]
        public IActionResult Create([FromBody] CreateSaleDto saleDto)
        {
            var saleModel = saleDto.ToSaleFromCreateDto();
            _context.Sales.Add(saleModel);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetById), new { id = saleModel.SaleId }, saleModel.ToSaleDto());
        }

        [HttpPut]
        [Route("{id}")]
        public IActionResult Update([FromRoute] int id, [FromBody] UpdateSaleDto saleDto)
        {
            var saleModel = _context.Sales.FirstOrDefault(x => x.SaleId == id);

            if (saleModel == null)
            {
                return NotFound();
            }

            saleModel.ProductName = saleDto.ProductName;
            saleModel.SaleAmount = saleDto.SaleAmount;
            saleModel.SaleDate = saleDto.SaleDate;
            saleModel.SalesRepId = saleDto.SalesRepId;
            saleModel.CustomerId = saleDto.CustomerId;

            _context.SaveChanges();

            return Ok(saleModel.ToSaleDto());
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete([FromRoute] int id)
        {
            var saleModel = _context.Sales.FirstOrDefault(x => x.SaleId == id);

            if(saleModel == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(saleModel);

            _context.SaveChanges();

            return NoContent();
        }
    }
}