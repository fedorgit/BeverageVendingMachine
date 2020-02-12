using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using BeverageVendingMachine.BL.Services;
using BeverageVendingMachine.BL.Services.Interface;
using BeverageVendingMachine.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.SpaServices.Webpack;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace BeverageVendingMachine
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            string path = Path.Combine(Directory.GetCurrentDirectory(), "App_Data");

            string connectionString = _configuration.GetSection("Configuration")["ConnectionString"].Replace("[DataDirectory]", path);
            
            services.AddDbContext<ApplicationContext>(options => options.UseSqlServer(connectionString));
            
            services.AddTransient<IProductService, ProductService>();
            services.AddTransient<ICoinService, CoinService>();
            services.AddTransient<IAdminService, AdminService>();
            services.AddTransient<ICustomerService, CustomerService>();

            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();

                app.UseWebpackDevMiddleware(new WebpackDevMiddlewareOptions
                {
                    HotModuleReplacement = true
                });
            }

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseMvc();
            app.Run(async (context) =>
            {
                if (context.Request.Path == "/admin")
                {
                    if (!context.Request.Query.TryGetValue("secretKey", out var queryVal) || queryVal.FirstOrDefault() != _configuration.GetSection("Configuration")["SecretKey"])
                    {
                        context.Response.ContentType = "text/html";

                        await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "error.html"));

                        return;
                    }
                }


                context.Response.ContentType = "text/html";

                await context.Response.SendFileAsync(Path.Combine(env.WebRootPath, "index.html"));

                
            });
        }
    }
}
