export interface IForecastServiceRequest
{
    LumpSumInvestment: number; 
    MonthlyInvestment: number;
    InvestmentTermInYears: number;
    RiskLevel: string;

}

export class ForecastServiceRequest implements IForecastServiceRequest {
    LumpSumInvestment: number; 
    MonthlyInvestment: number;
    InvestmentTermInYears: number;
    RiskLevel: string;
    
    constructor(lumpSumInvestment: number, monthlyInvestment: number, investmentTermInYears: number, riskLevel: string){
        this.LumpSumInvestment = lumpSumInvestment;
        this.MonthlyInvestment = monthlyInvestment;
        this.InvestmentTermInYears = investmentTermInYears;
        this.RiskLevel = riskLevel;
    }
}