import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InvestmentForecastService } from './investment-forecast.service'
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';
import { InvestmentForecastFormComponent } from './investment-forecast-form/investment-forecast-form.component';
import { InvestmentForecastLineChartComponent } from './investment-forecast-line-chart/investment-forecast-line-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentForecastFormComponent,
    InvestmentForecastLineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InvestmentForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
