using CRMConnect.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace CRMConnect.Server.Controllers
{
    [Route("/api/admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public AdminController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var admins = _context.Admin.ToList();
            return Ok(admins);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var admin = _context.Admin.Find(id);

            if (admin == null)
            {
                return NotFound();
            }
            return Ok(admin);
        }
    }
}
