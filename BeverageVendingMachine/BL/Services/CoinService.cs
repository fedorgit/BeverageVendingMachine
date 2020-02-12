using BeverageVendingMachine.BL.Services.Interface;
using BeverageVendingMachine.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.BL.Services
{
    public class CoinService : ICoinService
    {

        ApplicationContext db;

        public CoinService(ApplicationContext context)
        {
            db = context;
        }

        public Coin Add(Coin coin)
        {
            if (coin.Id != 0)
                return null;

            if (coin.Count < 0)
                coin.Count = 0;

            if (coin.Nominal < 0)
                coin.Nominal = 0;

            db.Coins.Add(coin);
            db.SaveChanges();

            return coin;
        }

        public void Delete(int id)
        {
            Coin coin = db.Coins.FirstOrDefault(x => x.Id == id);

            db.Coins.Remove(coin);
            db.SaveChanges();
        }

        public Coin Get(int id)
        {
            Coin coins = db.Coins.FirstOrDefault(x => x.Id == id);

            return coins;
        }

        public List<Coin> GetList()
        {
            return db.Coins.ToList();
        }

        public Coin Update(Coin coin)
        {
            if (coin.Id == 0)
                return null;

            if (coin.Count < 0)
                coin.Count = 0;

            if (coin.Nominal < 0)
                coin.Nominal = 0;

            db.Update(coin);
            db.SaveChanges();

            return coin;
        }

        public Transaction GetCurrentTransaction()
        {
            var transaction = db.Transactions.First();

            return transaction;
        }

        public void UpdateCurrentTransaction(Transaction transaction)
        {
            db.Transactions.Update(transaction);

            db.SaveChanges();
        }
    }
}
