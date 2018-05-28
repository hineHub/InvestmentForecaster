import { TestBed, inject } from '@angular/core/testing';

import { InvestmentForecastService } from './investment-forecast.service';

describe('InvestmentForecastService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvestmentForecastService]
    });
  });

  it('should be created', inject([InvestmentForecastService], (service: InvestmentForecastService) => {
    expect(service).toBeTruthy();
  }));
});
