using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentForecast.Api.Models.Response
{
    public class ForecastViewModel
    {
        public ForecastViewModel()
        {

        }

        public ForecastViewModel(IEnumerable<string> errors)
        {
            Errors = errors;
        }

        public IEnumerable<ErrorModel> HasErrors { get; }
        public IEnumerable<string> Errors { get; }

        public IEnumerable<AnnualGrowthFigures> AnnualGrowthFigures { get; }

        
 

    }
}
