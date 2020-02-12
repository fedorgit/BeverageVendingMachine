using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.Models
{
    public class Coin
    {
        public int Id { get; set; }
        public int Nominal { get; set; }
        public int Count { get; set; }
        public bool IsBlock { get; set; }
    }
}
