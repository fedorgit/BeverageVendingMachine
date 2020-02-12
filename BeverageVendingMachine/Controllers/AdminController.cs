using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using BeverageVendingMachine.Models;
using Newtonsoft.Json;
using BeverageVendingMachine.BL.Services.Interface;
using BeverageVendingMachine.BL.Helper;

namespace BeverageVendingMachine.Controllers
{
    [Route("api/admin")]
    public class AdminController : Controller
    {

        private readonly IProductService _productService;
        private readonly ICoinService _coinService;
        private readonly IAdminService _adminService;

        public AdminController(
            IProductService productService,
            ICoinService coinService,
            IAdminService adminService)
        {
            _productService = productService;
            _coinService = coinService;
            _adminService = adminService;
        }

        #region Product

        [HttpGet("get-products")]
        public IEnumerable<Product> GetProducts()
        {
            return _productService.GetList();
        }

        [HttpGet("get-product/{id}")]
        public Product GetProduct(int id)
        {
            Product product = _productService.Get(id); ;

            return product;
        }

        [HttpPost("create-product")]
        public IActionResult CreateProduct([FromBody]Product product)
        {
            if (ModelState.IsValid)
            {
                product = _productService.Add(product);

                return Ok(product);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("update-product/{id}")]
        public IActionResult UpdateProduct(int id, [FromBody]Product product)
        {
            if (ModelState.IsValid)
            {
                product = _productService.Update(product);

                return Ok(product);
            }

            return BadRequest(ModelState);
        }

        [HttpPost("upload-image-for-product/{id}")]
        public IActionResult UploadImageForProduct(int id, [FromForm]IFormFile image)
        {

            var imageFileName = _adminService.CreateImage(image.FileName, image.OpenReadStream());

            _adminService.UploadImageForProduct(id, imageFileName);
            
            return Ok();
        }

        [HttpDelete("delete-product/{id}")]
        public IActionResult DeleteProduct(int id)
        {
            _productService.Delete(id);

            return Ok();
        }
        
        [HttpGet("export-products")]
        public IActionResult ExportProducts()
        {
            var exportProducts = _adminService.ExportProducts();

            return Ok(exportProducts);
        }
        
        [HttpPost("import-products")]
        public IActionResult ImportProduct([FromForm]IFormFile importFile)
        {
            if (importFile == null)
                return BadRequest();

            var exportProductList = FormHelper.DeserializeFromStream(importFile.OpenReadStream());

            _adminService.ImportProducts(exportProductList);
            
            return Ok();
        }
        
        
        #endregion

        #region Coin

        [HttpGet("get-coins")]
        public IEnumerable<Coin> GetCoins()
        {
            return _coinService.GetList();
        }

        [HttpGet("get-coin/{id}")]
        public Coin GetCoin(int id)
        {
            return _coinService.Get(id);
        }

        [HttpPost("create-coin")]
        public IActionResult CreateCoin([FromBody]Coin coin)
        {
            if (ModelState.IsValid)
            {
                _coinService.Add(coin);

                return Ok(coin);
            }

            return BadRequest(ModelState);
        }

        [HttpPut("update-coin/{id}")]
        public IActionResult UpdateCoin(int id, [FromBody]Coin coin)
        {
            if (ModelState.IsValid)
            {
                _coinService.Update(coin);

                return Ok(coin);
            }
            return BadRequest(ModelState);
        }

        [HttpDelete("delete-coin/{id}")]
        public IActionResult DeleteCoin(int id)
        {
            _coinService.Delete(id);

            return Ok();
        }

        #endregion
    }
}
