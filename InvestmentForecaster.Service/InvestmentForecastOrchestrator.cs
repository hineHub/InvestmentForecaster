using InvestmentForecaster.Domain;
using InvestmentForecaster.Service.DTO;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace InvestmentForecaster.Service
{
    public class InvestmentForecastOrchestrator : IInvestmentForecastOrchestrator
    {
        private IBoundsFactory _boundsFactory;
        private IForecastCalculator _forecastCalculator;

        public InvestmentForecastOrchestrator(IBoundsFactory boundsFactory, IForecastCalculator forecastCalculator)
        {
            _boundsFactory = boundsFactory;
            _forecastCalculator = forecastCalculator;
        }

        public async Task<IEnumerable<ForecastResponseDTO>> Orchestration(RequestDTO request)
        {
            IBounds bounds = _boundsFactory.GetBounds(request.RiskLevel);
            return await _forecastCalculator.Calculate(bounds, request);
        }
    }
}
