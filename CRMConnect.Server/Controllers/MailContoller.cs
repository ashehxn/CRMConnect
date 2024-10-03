using CRMConnect.Server.Data;
using CRMConnect.Server.Models;
using Microsoft.AspNetCore.Mvc;

namespace CRMConnect.Server.Controllers
{
    [Route("/api/mail")]
    [ApiController]
    public class MailContoller : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        public MailContoller(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var mails = _context.Mails.ToList();
            return Ok(mails);
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            var mail = _context.Mails.Find(id);

            if (mail == null)
            {
                return NotFound();
            }
            return Ok(mail);
        }
    }
}
