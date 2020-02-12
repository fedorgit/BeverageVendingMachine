using BeverageVendingMachine.BL.Helper;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.Models
{
    public class ExportProduct
    {
        public string Name { get; set; }
        public string ImageFile { get; set; }
        public string ImageBase64 { get; set; }
        public int Price { get; set; }
        public int Count { get; set; }
    }
}
