import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentForecastFormComponent } from './investment-forecast-form.component';

describe('InvestmentForecastFormComponent', () => {
  let component: InvestmentForecastFormComponent;
  let fixture: ComponentFixture<InvestmentForecastFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentForecastFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentForecastFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
