namespace InvestmentForecaster.Domain
{
    public interface IBoundsFactory
    {
        IBounds GetBounds(string riskLevel);
    }
}