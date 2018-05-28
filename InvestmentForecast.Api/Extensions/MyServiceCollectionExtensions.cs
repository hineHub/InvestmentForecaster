using InvestmentForecaster.Domain;
using InvestmentForecaster.Service;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentForecast.Api.Extensions
{
    public static class MyServiceCollectionExtensions
    {
        public static void RegisterDependencies(this IServiceCollection collection)
        {
            collection.AddTransient<IInvestmentForecastOrchestrator, InvestmentForecastOrchestrator>();
            collection.AddTransient<IBoundsFactory, BoundsFactory>();
            collection.AddTransient<IForecastCalculator, ForecastAnnualGrowthCalculator>();
        }
    }
}
