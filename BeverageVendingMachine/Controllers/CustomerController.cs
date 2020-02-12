using System;
using System.Collections.Generic;
using System.Linq;
using BeverageVendingMachine.BL.Services.Interface;
using BeverageVendingMachine.Models;
using Microsoft.AspNetCore.Mvc;

namespace BeverageVendingMachine.Controllers
{
    [Route("api/customer")]
    public class CustomerController : Controller
    {

        private readonly IProductService _productService;
        private readonly ICoinService _coinService;
        private readonly ICustomerService _customerService;

        public CustomerController(
            IProductService productService,
            ICoinService coinService,
            ICustomerService customerService)
        {
            _productService = productService;
            _coinService = coinService;
            _customerService = customerService;
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
            Product product = _productService.Get(id);

            return product;
        }

        [HttpGet("trade-product/{id}")]
        public IActionResult TradeProduct(int id)
        {

            if(!_customerService.CheckExistenceProduct(id))
                return BadRequest("Запрашиваемый продукт отсутствует");

            if (!_customerService.CheckAvailabilityProduct(id))
                return BadRequest("Запрашиваемый продукт закончился");

            if (!_customerService.CheckAmountToBuy(id))
                return BadRequest("Недостаточно средств, внесите монеты:)");

            var product = _customerService.TradeProduct(id);

            return Ok(product);
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
            Coin coins = _coinService.Get(id); ;

            return coins;
        }

        [HttpGet("get-current-summa-transaction")]
        public int GetCurrentSummaTransaction()
        {
            return _customerService.GetCurrentSummaTransaction();
        }

        [HttpGet("deposit-coin/{id}")]
        public IActionResult DepositCoin(int id)
        {

            if (_customerService.CheckBlockCoin(id))
                return BadRequest("Прием монеты с номиналом " + _coinService.Get(id).Nominal + " заблокирован");

            var coin = _customerService.DepositCoin(id);

            //if (coin == null)
            //    return BadRequest("Поддельная монета");
            
            return Ok(coin);
        }

        [HttpGet("return-coin")]
        public IActionResult ReturnCoin()
        {
            if (!_customerService.CheckReturnCoin())
                return BadRequest("Нет доступных монет, обратитесь к администратору по номеру +79156.....");

            var returnCoins = _customerService.ReturnCoin();

            return Ok(returnCoins);
        }

        #endregion
        
    }
}
