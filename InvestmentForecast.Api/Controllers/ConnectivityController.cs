using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace InvestmentForecast.Api.Controllers
{
    [Route("api/[controller]")]
    public class ConnectivityController : Controller
    {
        // GET api/connectivity
        [HttpGet]
        public IActionResult Test()
        {
            return Ok("Service working as expected");
        }
    }
}
