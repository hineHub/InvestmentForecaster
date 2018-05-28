import { Component } from '@angular/core';
import { InvestmentForecastService} from './investment-forecast.service'
import {Chart } from 'chart.js'
import { ForecastServiceRequest, IForecastServiceRequest} from './api/IForecastRequest'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  forecastRequest : IForecastServiceRequest = new ForecastServiceRequest(10000, 1000, 5, "low");;
  chart = [];

  constructor(private _investmentForecastService : InvestmentForecastService){

  }

  ngOnInit(){
    console.log("started");
    this._investmentForecastService.annualForecast(this.forecastRequest)
      .subscribe(res => {
        console.log(res)
          let labels = [0,1,2,3,4,5]//years
          let targetValue = [50000, 50000, 50000, 50000, 50000, 50000, 50000];
          let narrowLowerValue = res["narrowLowerValue"].map(res => res);
          let narrowUpperValue = res["narrowUpperValue"].map(res => res);
          let wideLowerValue = res["wideLowerValue"].map(res => res);
          let wideUpperValue = res["wideUpperValue"].map(res => res);

          console.log(narrowUpperValue);
          this.chart = new Chart('canvas', {
            type: 'line',
            data: {
              labels: labels,
              datasets: [
                {
                  data: narrowLowerValue,
                  fill: 1,
                  label: 'Min',
                  backgroundColor: '#ef8500',
                  borderColor: '#ef8500',
                },
                {
                  data: narrowUpperValue,
                  fill: false,
                  label: 'Max',
                  backgroundColor: '#FFFFFF',
                  borderColor: '#ef8500',
                },
                {
                  data: targetValue,
                  fill: false,
                  label: 'target',
                  backgroundColor: '#832b29',
                  borderColor: '#832b29',
                },
                {
                  data: wideLowerValue,
                  fill: 4,
                  label: 'Min',
                  backgroundColor: '#464646',
                  borderColor: '#464646',
                },
                {
                  data: wideUpperValue,
                  fill: false,
                  label: 'Max',
                  backgroundColor: '#464646',
                  borderColor: '#464646',
                },
              ]
               
            },
            options: {
                responsive: true,
                scales: {
                  yAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Value (£)'
                    }
                  }],
                  xAxes: [{
                    scaleLabel: {
                      display: true,
                      labelString: 'Investment Period (Years)'
                    }
                  }],
                },
                legend: {
                  labels: {
                        fontColor: 'black',
                        defaultFontFamily: 'gesta, sans-serif',
                        defaultFontSize: 12

                  }
                } 
            }
          })
      });


  }
}
