import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentForecastLineChartComponent } from './investment-forecast-line-chart.component';

describe('InvestmentForecastLineChartComponent', () => {
  let component: InvestmentForecastLineChartComponent;
  let fixture: ComponentFixture<InvestmentForecastLineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentForecastLineChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentForecastLineChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
