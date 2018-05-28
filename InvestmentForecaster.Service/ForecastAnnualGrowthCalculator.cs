using InvestmentForecaster.Domain;
using InvestmentForecaster.Service.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InvestmentForecaster.Service
{
    public class ForecastAnnualGrowthCalculator : IForecastCalculator
    {
        public async Task<IEnumerable<ForecastResponseDTO>> Calculate(IBounds bounds, RequestDTO request)
        {
            decimal wideLowerTotal = request.LumpSumInvestment;
            decimal wideUpperTotal = request.LumpSumInvestment;
            decimal narrowLowerTotal = request.LumpSumInvestment;
            decimal narrowUpperTotal = request.LumpSumInvestment;
            decimal runningTotal = request.LumpSumInvestment;

            decimal monthlyWideLowerRate = GetMonthlyRate(bounds.WideLowerBound);
            decimal monthlyWideUpperRate = GetMonthlyRate(bounds.WideUpperBound);
            decimal monthlyNarrowLowerRate = GetMonthlyRate(bounds.NarrowLowerBound);
            decimal monthlyNarrowUpperRate = GetMonthlyRate(bounds.NarrowUpperBound);

            var response = new List<ForecastResponseDTO>() { new ForecastResponseDTO(request.LumpSumInvestment) };

            foreach (int year in Enumerable.Range(1, request.InvestmentTermInYears))
            {
                wideLowerTotal = CalculateAnnualValue(monthlyWideLowerRate, wideLowerTotal, request);
                wideUpperTotal = CalculateAnnualValue(monthlyWideUpperRate, wideUpperTotal, request);
                narrowLowerTotal = CalculateAnnualValue(monthlyNarrowLowerRate, narrowLowerTotal, request);
                narrowUpperTotal = CalculateAnnualValue(monthlyNarrowUpperRate, narrowUpperTotal, request);
                runningTotal += request.MonthlyInvestment * 12;

                response.Add(new ForecastResponseDTO(year, runningTotal, wideLowerTotal, 
                    narrowLowerTotal, wideUpperTotal, narrowUpperTotal));
            }

            return await Task.FromResult(response);
        }

        private decimal GetMonthlyRate(decimal annualRate)
        {
            double convertedAnnualRate = 1 + ((double)annualRate / 100);
            decimal monthlyRate = (decimal)Math.Pow(convertedAnnualRate, 1.0 / 12);

            return monthlyRate;
        }

        private decimal CalculateAnnualValue(decimal monthlyRate, decimal runningTotal, RequestDTO request)
        {
            foreach (int month in Enumerable.Range(1, 12))
            {
               
                runningTotal = request.MonthlyInvestment + (runningTotal * monthlyRate); 
            }

            return Math.Round(runningTotal, 2);
        }

    }
}
