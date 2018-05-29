export interface IForecastViewModel {
    LumpSumInvestment: number;
    MonthlyInvestment: number;
    TargetValue: number;
    InvestmentTermInYears: number;
    RiskLevel: string;

}

export class ForecastViewModel implements IForecastViewModel {
    LumpSumInvestment: number;
    MonthlyInvestment: number;
    TargetValue: number;
    InvestmentTermInYears: number;
    RiskLevel: string;

    constructor(lumpSumInvestment: number, monthlyInvestment: number, targetValue: number, investmentTermInYears: number, riskLevel: string) {
        this.LumpSumInvestment = lumpSumInvestment;
        this.MonthlyInvestment = monthlyInvestment;
        this.TargetValue = targetValue;
        this.InvestmentTermInYears = investmentTermInYears;
        this.RiskLevel = riskLevel;
    }
}