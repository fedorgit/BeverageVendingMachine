using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.Models
{
    public class Product
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string ImageFile { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
    }
}
