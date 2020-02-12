using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.Models
{
    public class ApplicationContext : DbContext
    {
        public ApplicationContext(DbContextOptions<ApplicationContext> options)
            : base(options)
        {
        }
        
        public DbSet<Product> Products { get; set; }
        public DbSet<Coin> Coins { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
    }
}
