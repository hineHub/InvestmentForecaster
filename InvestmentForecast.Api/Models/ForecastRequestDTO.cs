using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace InvestmentForecast.Api.Models
{
    public class ForecastRequestDTO : IValidatableObject
    {
        [Range(0, 100000000.00)]
        public decimal LumpSumInvestment { get; set; }

        [Range(0, 100000000.00)]
        public decimal MonthlyInvestment { get; set; }

        [Required]
        [Range(1, 100)]
        public int TimeScale { get; set; }

        public string RiskLevel { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            switch (RiskLevel.ToLower())
            {
                case "low":
                case "medium":
                case "high":
                   break;
                default:
                    yield return new ValidationResult($"Invalid risk level use low, medium, high", new[] { nameof(RiskLevel) });
                    break;
            }
        }
    }
}
