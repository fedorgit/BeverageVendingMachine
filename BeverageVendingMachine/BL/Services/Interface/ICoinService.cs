using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using BeverageVendingMachine.Models;

namespace BeverageVendingMachine.BL.Services.Interface
{
    public interface ICoinService
    {
        Coin Get(int id);

        List<Coin> GetList();

        Coin Add(Coin coin);

        Coin Update(Coin coin);

        void Delete(int id);


        // TODO: вынести в отдельный сервис.
        Transaction GetCurrentTransaction();

        void UpdateCurrentTransaction(Transaction transaction);
    }
}
