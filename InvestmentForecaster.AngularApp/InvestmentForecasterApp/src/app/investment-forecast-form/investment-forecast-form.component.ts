import { Component, OnInit } from '@angular/core';
import { ForecastServiceRequest, IForecastServiceRequest} from '../api/IForecastRequest'
import { InvestmentForecastService } from '../investment-forecast.service';
import { DataSetObj, ForecastChartRequest } from '../investment-forecast-chart-request';

@Component({
  selector: 'investment-forecast-form',
  templateUrl: './investment-forecast-form.component.html',
  styleUrls: ['./investment-forecast-form.component.css']
})
export class InvestmentForecastFormComponent {
  private _lumpSum: number = 100000;
  private _monthlyInvestment: number = 2000;
  private _targetValue: number = 150000;
  private _term: number = 5;
  _riskLevel: string = "low";
  _model : ForecastServiceRequest;
  chartRequest :ForecastChartRequest;
  lumpSum_Error = [];
  term_Error = [];
  monthlyInvestment_Error = [];
  targetValue_Error = [];
  riskLevel_Error = [];
  isFormValid = true;

  constructor(private _investmentForecastService : InvestmentForecastService) { 
    
    this._model = new ForecastServiceRequest(this._lumpSum, this._monthlyInvestment, this._targetValue, this._term, this._riskLevel);
  }

  onSubmit(){
    if (!this.validate()){
      return;
    }

    this._investmentForecastService.annualForecast(this._model)
      .subscribe(res => {
        this.assembleChartRequest(res);
      });
  }

  assembleChartRequest(serviceResponse){
    let narrowLowerValue = serviceResponse["narrowLowerValue"].map(res => res);
    let narrowUpperValue = serviceResponse["narrowUpperValue"].map(res => res);
    let wideLowerValue = serviceResponse["wideLowerValue"].map(res => res);
    let wideUpperValue = serviceResponse["wideUpperValue"].map(res => res)

    let targetValue = [];
    let years = [];
    for (let i=0; i<= this._model.InvestmentTermInYears; i++)
    {
      targetValue.push(this._model.TargetValue);
      years.push(i);
    }

    var wideGroup = new DataSetObj(narrowLowerValue, '#ef8500', narrowUpperValue, "narrow");
    var narrowGroup = new DataSetObj(wideLowerValue, '#464646', wideUpperValue, "wide");
    var targetValueObj = new DataSetObj(targetValue, '#832b29', [], "target")

    this.chartRequest = new ForecastChartRequest(years, new Array(wideGroup, targetValueObj, narrowGroup));
    console.log(this.chartRequest);
  }

  clearErrors(){
    this.lumpSum_Error = [];
    this.term_Error = [];
    this.monthlyInvestment_Error = [];
    this.targetValue_Error = [];
    this.riskLevel_Error = [];
  }

  validate():boolean {
    this.clearErrors();
    let isValid = true;

    if (this._model.LumpSumInvestment <= 0 || this._model.LumpSumInvestment > 10000000){
      this.lumpSum_Error.push("Lump sum must be between 1 and 10,000,000");
      isValid = false;
    }
    if (this._model.MonthlyInvestment <= 0 || this._model.MonthlyInvestment > 10000000){
      this.monthlyInvestment_Error.push("Monthly investment must be between 1 and 10,000,000");
      isValid = false;
    }
    if (this._model.InvestmentTermInYears <= 0 || this._model.InvestmentTermInYears > 100){
      this.term_Error.push("Investment term must be between 1 and 100");
      isValid = false;
    }

    if (this._model.TargetValue  <= 0  || this._model.TargetValue > 10000000)
    {
      this.targetValue_Error.push("Target value term must be between 1 and 10,000,000");
      isValid = false;
    }

    switch (this._model.RiskLevel){
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

  ngAfterViewInit() {
    this.onSubmit();
  }

  onKey(event: any) { 
    console.log("validating");
    this.validate();
  }

}
