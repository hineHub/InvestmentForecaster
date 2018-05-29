using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InvestmentForecast.Api.Models.Request;
using InvestmentForecast.Api.Models.Response;
using InvestmentForecaster.Service;
using InvestmentForecaster.Service.DTO;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace InvestmentForecast.Api.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("AllowAll")]
    public class InvestmentForecastController : Controller
    {
        IInvestmentForecastOrchestrator _orchestrator;

        public InvestmentForecastController(IInvestmentForecastOrchestrator orchestrator)
        {
            _orchestrator = orchestrator;
        }

        /// <summary>
        /// Calculates the monthly annual growth value using monthly payments. Model attribute validation in use.
        /// </summary>
        [HttpPost]
        public async Task<IActionResult> Calculate([FromBody] ForecastRequestViewModel request)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    RequestDTO requestDto = MapForecastRequestViewModel(request);
                    
                    IEnumerable<ForecastResponseDTO> responseDto = await _orchestrator.Orchestration(requestDto);
                    ForecastViewModel response = MapForecastResponseDto(responseDto) ;
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

        private RequestDTO MapForecastRequestViewModel(ForecastRequestViewModel model)
        {
            return new RequestDTO()
            {
                InvestmentTermInYears = model.InvestmentTermInYears,
                LumpSumInvestment = model.LumpSumInvestment,
                MonthlyInvestment = model.MonthlyInvestment,
                RiskLevel = model.RiskLevel
            };
        }

        private ForecastViewModel MapForecastResponseDto(IEnumerable<ForecastResponseDTO> responseDto)
        {
            var totalInvestmentAmount = responseDto.Select(x => x.TotalInvestmentAmount);
            var totalWideLower = responseDto.Select(x => x.TotalValueWideLower);
            var totalWideUpper = responseDto.Select(x => x.TotalValueWideUpper);
            var totalNarrowLower = responseDto.Select(x => x.TotalValueNarrowLower);
            var totalNarrowUpper = responseDto.Select(x => x.TotalValueNarrowUpper);

            return new ForecastViewModel(totalInvestmentAmount, totalWideLower, totalWideUpper, totalNarrowLower, totalNarrowUpper);
        }
    }
}