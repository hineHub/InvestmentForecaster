import { Component, OnInit, Input } from '@angular/core';
import { IForecastChartRequest, ForecastChartRequest } from '../investment-forecast-chart-request';
import {Chart } from 'chart.js'

@Component({
  selector: 'investment-forecast-line-chart',
  templateUrl: './investment-forecast-line-chart.component.html',
  styleUrls: ['./investment-forecast-line-chart.component.css']
})
export class InvestmentForecastLineChartComponent {
  chart: Chart;
 
  @Input()
  set chartProperties(chartProperties: ForecastChartRequest) {
    this.createChart(chartProperties);
  }
 
  //get chartProperties(): IForecastChartRequest { return this.chartProperties; }
  constructor() { }

  createChart(request: ForecastChartRequest) {
    let datasets = this.getDataSets(request);

    if (this.chart !== undefined) {
      this.chart.destroy();
    }

    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: request.XAxisLabels,
        datasets: datasets 
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
    });

  }

  getDataSets(request: ForecastChartRequest):Array<object>{
    let datasets: Array<object> = [];

    request.Data.forEach(function (value, x) {
      datasets.push(
      {            
          data: value.lowerBound,
          fill: value.higherBound ? "+1" : false,
          label: value.label,
          backgroundColor: value.backgroundColor,
          borderColor: value.backgroundColor}
      );

      if (value.higherBound)
      {
        datasets.push(
            {            
              data: value.higherBound,
              fill: false,
              label: value.label,
              backgroundColor: value.backgroundColor,
              borderColor: value.backgroundColor
            }
          )
      }
    });
    return datasets;
  }

}
