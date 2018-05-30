﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentForecast.Api.Models.Response
{
    public class CalculateResponse
    {
        public CalculateResponse(IEnumerable<decimal> totalValue, IEnumerable<decimal> wideLowerValue, IEnumerable<decimal> wideUpperValue, IEnumerable<decimal> narrowLowerValue, IEnumerable<decimal> narrowUpperValue)
        {
            TotalValue = totalValue;
            WideLowerValue = wideLowerValue;
            WideUpperValue = wideUpperValue;
            NarrowLowerValue = narrowLowerValue;
            NarrowUpperValue = narrowUpperValue;
        }

        public CalculateResponse(IEnumerable<string> errors)
        {
            Errors = errors;
        }

        public IEnumerable<ErrorModel> HasErrors { get; }
        public IEnumerable<string> Errors { get; }

        public bool Success {
            get { return Errors == null || !Errors.Any();  }
            set { }
        } 
        
        public IEnumerable<decimal> TotalValue { get; }
        public IEnumerable<decimal> WideLowerValue { get; }
        public IEnumerable<decimal> WideUpperValue { get; }
        public IEnumerable<decimal> NarrowLowerValue { get; }
        public IEnumerable<decimal> NarrowUpperValue { get; }

    }
}
