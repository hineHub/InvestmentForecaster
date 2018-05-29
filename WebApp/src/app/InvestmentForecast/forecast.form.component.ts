import { Component } from '@angular/core';
import { ForecastFormViewModel, IForecastFormViewModel } from './forecast.form.viewmodel';
import { ForecastChartRequest, ChartDataSet } from '../chart/chart.request.model';
import { ForecastServiceModel, IForecastServiceModel } from '../api/investment.forecast.service.model';
import { InvestmentForecastService } from '../api/forecast.service';
import { LineChartComponent } from '../chart/line.chart.component'

@Component({
  selector: 'forecastform',
  templateUrl: './forecast.form.component.html',
  styleUrls: ['./forecast.form.component.css']
})
export class ForecastFormComponent {
  private _model: ForecastFormViewModel;
  chartRequest: ForecastChartRequest;

  constructor(private _investmentForecastService: InvestmentForecastService) {
    let lumpSum: number = 100000;
    let monthlyInvestment: number = 2000;
    let targetValue: number = 150000;
    let term: number = 5;
    let riskLevel: string = "low";

    this._model = new ForecastFormViewModel(lumpSum, monthlyInvestment, targetValue, term, riskLevel);
  }

  onSubmit() {
    if (!this._model.validate()) {
      return;
    }

    let request: IForecastServiceModel = new ForecastServiceModel(this._model);

    this._investmentForecastService.annualForecast(request)
    .subscribe(res => {
      this.assembleChartRequest(res);
    });
  }

  assembleChartRequest(serviceResponse) {
    let narrowLowerValue = serviceResponse["narrowLowerValue"].map(res => res);
    let narrowUpperValue = serviceResponse["narrowUpperValue"].map(res => res);
    let wideLowerValue = serviceResponse["wideLowerValue"].map(res => res);
    let wideUpperValue = serviceResponse["wideUpperValue"].map(res => res)

    let targetValue = [];
    let years = [];
    for (let i = 0; i <= this._model.InvestmentTermInYears; i++) {
      targetValue.push(this._model.TargetValue);
      years.push(i.toString());
    }

    var wideGroup = new ChartDataSet(narrowLowerValue, '#ef8500', narrowUpperValue, "narrow");
    var narrowGroup = new ChartDataSet(wideLowerValue, '#464646', wideUpperValue, "wide");
    var targetValueObj = new ChartDataSet(targetValue, '#832b29', [], "target")

    this.chartRequest = new ForecastChartRequest(years, new Array(wideGroup, targetValueObj, narrowGroup));
    console.log(this.chartRequest);
  }

 
  ngAfterViewInit() {
    this.onSubmit();
  }

  onKey(event: any) {
    this._model.validate();
  }
}
