using BeverageVendingMachine.Models;
using System.Collections.Generic;

namespace BeverageVendingMachine.BL.Services.Interface
{
    public interface ICustomerService
    {
        /// <summary>
        /// Проверка существования товара
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        bool CheckExistenceProduct(int productId);

        /// <summary>
        /// Проверка наличия товара.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        bool CheckAvailabilityProduct(int productId);

        /// <summary>
        /// Проверка наличия суммы для покупки товара.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        bool CheckAmountToBuy(int productId);

        /// <summary>
        /// Приобрести указанный товар по id продукта.
        /// </summary>
        /// <param name="productId"></param>
        /// <returns></returns>
        Product TradeProduct(int productId);

        /// <summary>
        /// Получить текущую сумму на счете заказчика.
        /// </summary>
        /// <returns></returns>
        int GetCurrentSummaTransaction();

        /// <summary>
        /// Проверка блокировки принятия указаной монеты.
        /// </summary>
        /// <param name="coinId"></param>
        /// <returns></returns>
        bool CheckBlockCoin(int coinId);

        /// <summary>
        /// Положить на счет указанную монету по id
        /// </summary>
        /// <param name="id"></param>
        /// <returns></returns>
        Coin DepositCoin(int coinId);

        /// <summary>
        /// Возврат средств со счета заказчика.
        /// </summary>
        /// <returns></returns>
        List<Coin> ReturnCoin();
        
        /// <summary>
        /// Вспомогательный метод для проверки возможности выдачи сдачи.
        /// </summary>
        /// <returns></returns>
        bool CheckReturnCoin();
    }
}
