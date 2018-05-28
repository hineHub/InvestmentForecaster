using System;
using System.Collections.Generic;
using System.Text;

namespace InvestmentForecaster.Domain
{
    public interface IBounds
    {
        decimal WideLowerBound { get; }
        decimal WideUpperBound { get; }
        decimal NarrowLowerBound { get; }
        decimal NarrowUpperBound { get; }
    }
}
