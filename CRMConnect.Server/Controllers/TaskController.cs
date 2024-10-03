using CRMConnect.Server.Data;
using Microsoft.AspNetCore.Mvc;

namespace CRMConnect.Server.Controllers
{
    [Route("/api/task")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public TaskController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var tasks = _context.Tasks.ToList();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var task = _context.Tasks.Find(id);

            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }
    }
}
