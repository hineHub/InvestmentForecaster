using System;
using System.Collections.Generic;
using System.Text;

namespace InvestmentForecaster.Service
{
    public class RequestDTO
    {
        public decimal LumpSumInvestment { get; set; }

        public decimal MonthlyInvestment { get; set; }

         public int InvestmentTermInYears { get; set; }

        public string RiskLevel { get; set; }
    }
}
