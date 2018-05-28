using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentForecast.Api.Models.Response
{
    public class AnnualGrowthFigures
    {
        public AnnualGrowthFigures(int index, decimal wideBoundLower, decimal wideBoundUpper, 
            decimal narrowBoundLower, decimal narrowBoundUpper, decimal totalInvested)
        {
            Index = index;
            WideBoundLower = wideBoundLower;
            WideBoundUpper = WideBoundUpper;
            NarrowBoundLower = narrowBoundLower;
            NarrowBoundUpper = NarrowBoundUpper;
            TotalInvested = totalInvested; 
        }

        public int Index { get; }
        public decimal WideBoundLower { get; }
        public decimal WideBoundUpper { get; }
        public decimal NarrowBoundLower { get; }
        public decimal NarrowBoundUpper { get; }
        public decimal TotalInvested { get; }
    }
}
