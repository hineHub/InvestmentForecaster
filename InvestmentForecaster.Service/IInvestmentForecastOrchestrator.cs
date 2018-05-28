using InvestmentForecaster.Service.DTO;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace InvestmentForecaster.Service
{
    public interface IInvestmentForecastOrchestrator
    {
        Task<IEnumerable<ForecastResponseDTO>> Orchestration(RequestDTO request);
    }
}
