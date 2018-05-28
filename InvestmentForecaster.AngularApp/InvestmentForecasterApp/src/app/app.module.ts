import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {InvestmentForecastService } from './investment-forecast.service'
import {HttpClientModule} from '@angular/common/http'
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [InvestmentForecastService],
  bootstrap: [AppComponent]
})
export class AppModule { }
