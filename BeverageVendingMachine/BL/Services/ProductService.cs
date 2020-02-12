using BeverageVendingMachine.BL.Services.Interface;
using BeverageVendingMachine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.BL.Services
{
    public class ProductService : IProductService
    {

        ApplicationContext db;

        public ProductService(ApplicationContext context)
        {
            db = context;
        }
        
        public Product Add(Product product)
        {
            if (product.Id != 0)
                return null;
            
            if (string.IsNullOrWhiteSpace(product.ImageFile))
                product.ImageFile = "default.jpg";

            if (string.IsNullOrWhiteSpace(product.Name))
                product.Name = "-Без названия-";

            if (product.Price < 0)
                product.Price = 0;

            if (product.Count < 0)
                product.Count = 0;


            db.Products.Add(product);
            db.SaveChanges();

            return product;
        }

        public void Delete(int id)
        {
            Product product = db.Products.FirstOrDefault(x => x.Id == id);

            db.Products.Remove(product);
            db.SaveChanges();
        }

        public Product Get(int id)
        {
            Product product = db.Products.FirstOrDefault(x => x.Id == id);

            // Доп. проверка если потребуется
            // ...

            return product;
        }

        public List<Product> GetList()
        {
            return db.Products.ToList();
        }

        public Product Update(Product product)
        {
            if (product.Id == 0)
                return null;

            if (string.IsNullOrWhiteSpace(product.ImageFile))
                product.ImageFile = "default.jpg";

            if (string.IsNullOrWhiteSpace(product.Name))
                product.Name = "-Без названия-";

            if (product.Price < 0)
                product.Price = 0;

            if (product.Count < 0)
                product.Count = 0;
            
            db.Update(product);
            db.SaveChanges();

            return product;
        }
    }
}
