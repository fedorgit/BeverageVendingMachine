using BeverageVendingMachine.Models;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IO;

namespace BeverageVendingMachine.BL.Helper
{
    public class FormHelper
    {
        public static string DefaultNameImage { get; } = "default.jpg";

        public static List<ExportProduct> DeserializeFromStream(Stream stream)
        {
            var serializer = new JsonSerializer();

            using (var sr = new StreamReader(stream))
            using (var jsonTextReader = new JsonTextReader(sr))
            {
                return serializer.Deserialize<List<ExportProduct>>(jsonTextReader);
            }
        }

        public static string GetBase64(string imagePathFile)
        {
            byte[] imageBytes = File.ReadAllBytes(imagePathFile);
            return "data:image/png;base64," + Convert.ToBase64String(imageBytes);
        }

    }
}
