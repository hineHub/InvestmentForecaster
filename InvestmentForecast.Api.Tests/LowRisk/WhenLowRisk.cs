using InvestmentForecast.Api;
using InvestmentForecast.Api.Controllers;
using InvestmentForecast.Api.Models.Request;
using InvestmentForecast.Api.Models.Response;
using InvestmentForecast.E2E.Tests.TestBuilder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.TestHost;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace InvestmentForecast.E2E.Tests.LowRisk
{
    [TestClass]
    public class WhenLowRisk
    {
        private TestServer _server;
        private HttpClient _client;

        [TestInitialize]
        public void TestSetup()
        {
            _server = new TestServer(new WebHostBuilder().UseStartup<Startup>());
            _client = _server.CreateClient();
        }


        [TestMethod]
        public async Task AndMonthlyInvestmentIs1000_AndLumpSumIs10000_ThenYear1TotalInvestedIsCorrect()
        {
            //Arrange
            decimal expectedTotalInvestment = 100m;

            ForecastRequestViewModel request = new ForecastRequestViewModelBuilder()
                .WithValidDefaults()
                .WithInvestmentTerm(1)
                .Build();

            var contents = new StringContent(JsonConvert.SerializeObject(request), Encoding.UTF8, "application/json");

            //Act

            HttpResponseMessage response = await _client.PostAsync("/api/InvestmentForecast", contents);
            var x = JsonConvert.DeserializeObject<ForecastViewModel>(await response.Content.ReadAsStringAsync());
            //Assert
            Assert.IsTrue(response.IsSuccessStatusCode);
           

            //Assert.IsTrue(expectedTotalInvestment, response.RequestMessage.)

        }
    }
 }
