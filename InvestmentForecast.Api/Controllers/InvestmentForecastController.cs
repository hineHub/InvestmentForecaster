using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestmentForecast.Api.Models.Request;
using InvestmentForecast.Api.Models.Response;
using Microsoft.AspNetCore.Mvc;

namespace InvestmentForecast.Api.Controllers
{
    [Route("api/[controller]")]
    public class InvestmentForecastController : Controller
    {
        /// <summary>
        /// Calculates the monthly growth value based. Model attribute validation in use.
        /// </summary>
        [HttpPost]
        public IActionResult Calculate(ForecastRequestViewModel request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    ForecastViewModel response = new ForecastViewModel() ;
                    return Ok(response);
                }

                var errors =  ModelState.Values
                                .SelectMany(x => x.Errors)
                                .Select(x => x.ErrorMessage).ToList();

                return BadRequest(new ForecastViewModel(errors));
            }
            catch(Exception ex)
            {
                //logging
                return BadRequest("Exception");
            }
            
            
        }
    }
}