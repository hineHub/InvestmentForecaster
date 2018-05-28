using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentForecast.Api.Models.Response
{
    public class ErrorModel
    {
        public ErrorModel(string source, string message)
        {
            Source = source;
            Message = message;
        }
        public string Source { get; }
        public string Message { get; }
    }
}
