using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeverageVendingMachine.Models;

namespace BeverageVendingMachine.BL.Services.Interface
{
    public interface IProductService
    {
        Product Get(int id);

        List<Product> GetList();

        Product Add(Product product);

        Product Update(Product product);

        void Delete(int id);
    }
}
