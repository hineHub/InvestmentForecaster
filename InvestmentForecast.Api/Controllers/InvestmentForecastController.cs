using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestmentForecast.Api.Models;
using Microsoft.AspNetCore.Mvc;

namespace InvestmentForecast.Api.Controllers
{
    [Route("api/[controller]")]
    public class InvestmentForecastController : Controller
    {
        [HttpPost]
        public IActionResult Calculate(ForecastRequestDTO request)
        {
            return Ok(20);
        }
    }
}