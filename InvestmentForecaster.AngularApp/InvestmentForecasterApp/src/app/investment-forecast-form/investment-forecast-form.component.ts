import { Component, OnInit } from '@angular/core';
import { ForecastServiceRequest, IForecastServiceRequest} from '../api/IForecastRequest'
import { InvestmentForecastService } from '../investment-forecast.service';
import { DataSetObj, ForecastChartRequest } from '../investment-forecast-chart-request';

@Component({
  selector: 'investment-forecast-form',
  templateUrl: './investment-forecast-form.component.html',
  styleUrls: ['./investment-forecast-form.component.css']
})
export class InvestmentForecastFormComponent implements OnInit {
  private _lumpSum: number = 10000;
  private _monthlyInvestment: number = 1000;
  private _term: number = 5;
  _targetValue: number = 150000;
  _riskLevel: string = "low";
  _model : ForecastServiceRequest;
  chartRequest :ForecastChartRequest;
  lumpSum_Error = [];
  term_Error = [];
  monthlyInvestment_Error = [];

  constructor(private _investmentForecastService : InvestmentForecastService) { 
    
    this._model = new ForecastServiceRequest(this._lumpSum, this._monthlyInvestment, this._term, this._riskLevel);
  }

  onSubmit(){
    if (!this.validate()){
      return;
    }
    console.log(this._model);
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
    for (let i=0; i< this._term; i++)
    {
      targetValue.push(this._targetValue);
      years.push(i);
    }

    var wideGroup = new DataSetObj(narrowLowerValue, '#ef8500', narrowUpperValue, "narrow");
    var narrowGroup = new DataSetObj(wideLowerValue, '#464646', wideUpperValue, "wide");
    var targetValueObj = new DataSetObj(targetValue, '#832b29', [], "target")

    this.chartRequest = new ForecastChartRequest(years, new Array(narrowGroup, targetValueObj, wideGroup));
    console.log(this.chartRequest);
  }

  clearErrors(){
    this.lumpSum_Error = [];
    this.term_Error = [];
    this.monthlyInvestment_Error = [];
  }

  validate():boolean {
    let isValid = true;

    if (this._model.LumpSumInvestment <= 0 || this._model.LumpSumInvestment > 10000000){
      this.lumpSum_Error.push("Lump sum must be between 1 and 10,000,000");
      isValid = false;
    }
    if (this._model.MonthlyInvestment <= 0 || this._model.MonthlyInvestment > 10000000){
      this.lumpSum_Error.push("Monthly investment must be between 1 and 10,000,000");
      isValid = false;
    }
    if (this._model.InvestmentTermInYears <= 0 || this._model.InvestmentTermInYears > 100){
      this.lumpSum_Error.push("Investment term must be between 1 and 100");
      isValid = false;
    }

    return isValid;
  }
 /* calculate(){
    console.log("--");
    console.log(this._model);
    console.log("--");
  }*/

  ngOnInit() {
  }

}
