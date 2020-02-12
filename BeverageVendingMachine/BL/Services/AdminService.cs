using System;
using System.Collections.Generic;
using System.IO;
using BeverageVendingMachine.BL.Helper;
using BeverageVendingMachine.BL.Services.Interface;
using BeverageVendingMachine.Models;
using Microsoft.AspNetCore.Hosting;

namespace BeverageVendingMachine.BL.Services
{
    public class AdminService : IAdminService
    {
        IHostingEnvironment _hostingEnvironment;

        IProductService _productService;

        public AdminService(IHostingEnvironment hostingEnvironment, IProductService productService)
        {
            _hostingEnvironment = hostingEnvironment;
            _productService = productService;
        }
        
        public List<ExportProduct> ExportProducts()
        {
            var products = _productService.GetList();

            var exportProducts = new List<ExportProduct>();

            string pathImages = Path.Combine(_hostingEnvironment.WebRootPath, "images");

            foreach (var product in products)
            {
                var exportProduct = new ExportProduct();

                exportProduct.Name = product.Name;
                exportProduct.ImageFile = product.ImageFile;
                exportProduct.ImageBase64 = FormHelper.GetBase64(Path.Combine(pathImages, exportProduct.ImageFile));
                exportProduct.Price = product.Price;
                exportProduct.Count = product.Count;

                exportProducts.Add(exportProduct);
            }

            return exportProducts;
        }

        public void ImportProducts(List<ExportProduct> exportProducts)
        {
            foreach (var exportProduct in exportProducts)
            {
                var product = new Product();

                product.Name = exportProduct.Name;
                product.ImageFile = exportProduct.ImageFile;
                product.Price = exportProduct.Price;
                product.Count = exportProduct.Count;

                string pathImages = Path.Combine(_hostingEnvironment.WebRootPath, "images");

                // TODO: в вспомогательную функцию
                if (product.ImageFile != FormHelper.DefaultNameImage)
                {
                    string base64 = exportProduct.ImageBase64.Substring(exportProduct.ImageBase64.IndexOf(',') + 1);
                    base64 = base64.Trim('\0');
                    byte[] chartData = Convert.FromBase64String(base64);
                    var filePath = Path.Combine(pathImages, exportProduct.ImageFile);
                    FileStream file = File.Create(filePath);
                    file.Write(chartData, 0, chartData.Length);
                    file.Close();
                }

                _productService.Add(product);
            }
        }

        public string CreateImage(string imageFile, Stream stream)
        {
            if(imageFile == FormHelper.DefaultNameImage)
                return imageFile;

            var path = Path.Combine(_hostingEnvironment.WebRootPath, "images");

            // TODO: Переименовывать изображение (если потребуется)
            // TODO: обезопасить то SQL инъекций
            var filePath = Path.Combine(path, imageFile);

            // сохраняем файл в папку Files в каталоге wwwroot
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                stream.CopyTo(fileStream);
            }

            return imageFile;
        }

        public Product UploadImageForProduct(int productId, string imageFile)
        {
            if (string.IsNullOrWhiteSpace(imageFile))
                return null;

            var product = _productService.Get(productId);

            if (product == null)
                return null;
            
            product.ImageFile = imageFile;

            _productService.Update(product);

            return product;
        }
    }
}
