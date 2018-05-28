using System.Collections.Generic;
using System.Threading.Tasks;
using InvestmentForecaster.Domain;
using InvestmentForecaster.Service.DTO;

namespace InvestmentForecaster.Service
{
    public interface IForecastCalculator
    {
        Task<IEnumerable<ForecastResponseDTO>> Calculate(IBounds bounds, RequestDTO request);

    }
}