using CRMConnect.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace CRMConnect.Server.Controllers
{
    [Route("/api/salesRep")]
    [ApiController]
    public class SalesRepController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public SalesRepController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var salesReps = _context.SalesRepresentatives.ToList();
            return Ok(salesReps);
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
    }
}
