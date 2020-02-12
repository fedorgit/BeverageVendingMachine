using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeverageVendingMachine.Models;
using Microsoft.AspNetCore.Hosting;

namespace BeverageVendingMachine.BL.Services.Interface
{
    public class CustomerService : ICustomerService
    {
        private readonly IHostingEnvironment _hostingEnvironment;
        private readonly IProductService _productService;
        private readonly ICoinService _coinService;

        public CustomerService(IHostingEnvironment hostingEnvironment, IProductService productService, ICoinService coinService)
        {
            _hostingEnvironment = hostingEnvironment;
            _productService = productService;
            _coinService = coinService;
        }

        public bool CheckBlockCoin(int coinId)
        {
            var coin = _coinService.Get(coinId);

            return coin.IsBlock;
        }

        public Coin DepositCoin(int coinId)
        {
            var coin = _coinService.Get(coinId);

            var transactions = _coinService.GetCurrentTransaction();
            transactions.Summa += coin.Nominal;

            coin.Count++;

            _coinService.UpdateCurrentTransaction(transactions);
            _coinService.Update(coin);

            return coin;
        }

        public int GetCurrentSummaTransaction()
        {
            var transaction = _coinService.GetCurrentTransaction();

            return transaction.Summa;
        }

        public bool CheckExistenceProduct(int productId)
        {
            Product product = _productService.Get(productId);

            return product != null;
        }

        public bool CheckAvailabilityProduct(int productId)
        {
            Product product = _productService.Get(productId);

            return product.Count > 0;
        }

        public bool CheckAmountToBuy(int productId)
        {
            Product product = _productService.Get(productId);

            Transaction transaction = _coinService.GetCurrentTransaction();

            return transaction.Summa >= product.Price;
        }

        public Product TradeProduct(int productId)
        {
            Product product = _productService.Get(productId);

            var transactions = _coinService.GetCurrentTransaction();

            transactions.Summa -= product.Price;

            _coinService.UpdateCurrentTransaction(transactions);

            product.Count--;
            
            _productService.Update(product);

            return product;
        }

        public bool CheckReturnCoin()
        {
            var transactions = _coinService.GetCurrentTransaction();

            var coins = _coinService.GetList();

            var coin10 = coins.First(x => x.Nominal == 10);
            var coin5 = coins.First(x => x.Nominal == 5);
            var coin2 = coins.First(x => x.Nominal == 2);
            var coin1 = coins.First(x => x.Nominal == 1);
            
            return this._CheckReturnCoin(transactions.Summa, coin10.Count, coin5.Count, coin2.Count, coin1.Count);
        }

        private bool _CheckReturnCoin(int summa, int coin10, int coin5, int coin2, int coin1)
        {
            if (summa >= 10 && coin10 > 0)
                summa -= 10;
            else if (summa >= 5 && coin5 > 0)
                summa -= 5;
            else if (summa >= 2 && coin2 > 0)
                summa -= 2;
            else if (summa >= 1 && coin1 > 0)
                summa -= 1;
            else
                return false;

            if (summa == 0)
                return true;

            return this._CheckReturnCoin(summa, coin10, coin5, coin2, coin1);
        }

        public List<Coin> ReturnCoin()
        {
            var coins = _coinService.GetList();

            var transaction = _coinService.GetCurrentTransaction();

            var coin10 = coins.First(x => x.Nominal == 10);
            var coin5 = coins.First(x => x.Nominal == 5);
            var coin2 = coins.First(x => x.Nominal == 2);
            var coin1 = coins.First(x => x.Nominal == 1);

            var returnCoinList = new List<Coin>();

            foreach (var coin in coins)
            {
                returnCoinList.Add(new Coin { Id = coin.Id, Count = 0, IsBlock = coin.IsBlock, Nominal = coin.Nominal });
            }

            while (transaction.Summa > 0)
            {
                if (transaction.Summa >= 10 && coin10.Count > 0)
                {
                    transaction.Summa -= 10;
                    coin10.Count--;
                    returnCoinList.First(x => x.Id == coin10.Id).Count++;
                }
                else if (transaction.Summa >= 5 && coin5.Count > 0)
                {
                    transaction.Summa -= 5;
                    coin5.Count--;
                    returnCoinList.First(x => x.Id == coin5.Id).Count++;
                }
                else if (transaction.Summa >= 2 && coin2.Count > 0)
                {
                    transaction.Summa -= 2;
                    coin2.Count--;
                    returnCoinList.First(x => x.Id == coin2.Id).Count++;
                }
                else if (transaction.Summa >= 1 && coin1.Count > 0)
                {
                    transaction.Summa -= 1;
                    coin1.Count--;
                    returnCoinList.First(x => x.Id == coin1.Id).Count++;
                }
            }

            foreach (var coin in coins)
                _coinService.Update(coin);
            
            _coinService.UpdateCurrentTransaction(transaction);

            returnCoinList = returnCoinList.Where(x => x.Count > 0).ToList();

            return returnCoinList;
        }
        
    }
}
