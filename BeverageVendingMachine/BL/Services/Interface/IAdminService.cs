using BeverageVendingMachine.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace BeverageVendingMachine.BL.Services.Interface
{
    public interface IAdminService
    {
        /// <summary>
        /// Создать изображение в системе (с изменением названия изображения.)
        /// </summary>
        /// <param name="imageFile"></param>
        /// <param name="stream"></param>
        /// <returns>Новое название изображения в системе</returns>
        string CreateImage(string imageFile, Stream stream);

        Product UploadImageForProduct(int productId, string imageFile);

        List<ExportProduct> ExportProducts();

        void ImportProducts(List<ExportProduct> exportProducts);
    }
}
