import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { InvestmentForecastService } from './investment-forecast.service'
import { HttpClientModule } from '@angular/common/http'
import { AppComponent } from './app.component';
import { InvestmentForecastFormComponent } from './investment-forecast-form/investment-forecast-form.component';
import { InvestmentForecastLineChartComponent } from './investment-forecast-line-chart/investment-forecast-line-chart.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InvestmentForecastFormComponent,
    InvestmentForecastLineChartComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [InvestmentForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
