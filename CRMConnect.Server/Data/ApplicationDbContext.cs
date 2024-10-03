using CRMConnect.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace CRMConnect.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {
            
        }

        public DbSet<Admin> Admin {  get; set; }
        public DbSet<Customer> Customers { get; set; }
        public DbSet<Mail> Mails { get; set; }
        public DbSet<Sale> Sales { get; set; }
        public DbSet<SalesRepresentative> SalesRepresentatives { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Customer>()
            .HasMany(c => c.Sales)
            .WithOne(o => o.Customer)
            .OnDelete(DeleteBehavior.Cascade);
        }
    }
}
