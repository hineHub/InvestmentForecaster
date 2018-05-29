import { Component, OnInit } from '@angular/core';
import { ForecastViewModel, IForecastViewModel } from '../model/forecast.view.model'

@Component({
    selector: 'formForecast',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})
export class ForcastFormComponent {
    private _lumpSum: number = 100000;
    private _monthlyInvestment: number = 2000;
    private _targetValue: number = 150000;
    private _term: number = 5;
    _riskLevel: string = "low";
    _model: ForecastViewModel;
    //chartRequest: ForecastChartRequest;
    lumpSum_Error: Array<string> = [];
    term_Error: Array<string>  = [];
    monthlyInvestment_Error: Array<string>  = [];
    targetValue_Error: Array<string>  = [];
    riskLevel_Error: Array<string>  = [];
    isFormValid = true;

    constructor() {
        this._model = new ForecastViewModel(this._lumpSum, this._monthlyInvestment, this._targetValue, this._term, this._riskLevel);
    }

    onKey(event: any) {
        console.log("validating");
        this.validate();
    }

    clearErrors() {
        this.lumpSum_Error = [];
        this.term_Error = [];
        this.monthlyInvestment_Error = [];
        this.targetValue_Error = [];
        this.riskLevel_Error = [];
    }

    validate(): boolean {
        this.clearErrors();
        let isValid = true;

        if (this._model.LumpSumInvestment <= 0 || this._model.LumpSumInvestment > 10000000) {
            this.lumpSum_Error.push("Lump sum must be between 1 and 10,000,000");
            isValid = false;
        }
        if (this._model.MonthlyInvestment <= 0 || this._model.MonthlyInvestment > 10000000) {
            this.monthlyInvestment_Error.push("Monthly investment must be between 1 and 10,000,000");
            isValid = false;
        }
        if (this._model.InvestmentTermInYears <= 0 || this._model.InvestmentTermInYears > 100) {
            this.term_Error.push("Investment term must be between 1 and 100");
            isValid = false;
        }

        if (this._model.TargetValue <= 0 || this._model.TargetValue > 10000000) {
            this.targetValue_Error.push("Target value term must be between 1 and 10,000,000");
            isValid = false;
        }

        switch (this._model.RiskLevel) {
            case 'low':
            case 'medium':
            case 'high':
                break;
            default:
                this.riskLevel_Error.push("Risk level acceptable values (low, medium, high)");
                isValid = false;
        }

        this.isFormValid = isValid;
        console.log(this.isFormValid);
        return isValid;
    }
}
