﻿using System;
using System.Collections.Generic;
using System.Text;

namespace InvestmentForecaster.Service.DTO
{
    public class ForecastResponseDTO
    {
        public ForecastResponseDTO(int index, decimal totalInvestmentAmount, decimal totalValueWideLower, decimal totalValueNarrowLower, decimal totalValueWideUpper, decimal totalValueNarrowUpper)
        {
            Index = index;
            TotalInvestmentAmount = totalInvestmentAmount;
            TotalValueNarrowLower = totalValueNarrowLower;
            TotalValueNarrowUpper = totalValueNarrowUpper;
            TotalValueWideLower = totalValueWideLower;
            TotalValueWideUpper = totalValueWideUpper;

        }

        public ForecastResponseDTO(decimal lumpSum)
        {
            TotalInvestmentAmount = lumpSum;
            TotalValueNarrowLower = lumpSum;
            TotalValueNarrowUpper = lumpSum;
            TotalValueWideLower = lumpSum;
            TotalValueWideUpper = lumpSum;
        }

        public int Index { get; }
        public decimal TotalInvestmentAmount { get; }
        public decimal TotalValueWideLower { get; }
        public decimal TotalValueWideUpper { get; }
        public decimal TotalValueNarrowLower { get; }
        public decimal TotalValueNarrowUpper { get; }
    }
}
