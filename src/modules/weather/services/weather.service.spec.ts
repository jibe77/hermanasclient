import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
    let weatherService: WeatherService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [WeatherService],
        });
        weatherService = TestBed.inject(WeatherService);
    });

    describe('getWeek', () => {
        it('should return Observable<MeteoInfo>', () => {
            weatherService.getWeek().subscribe(response => {
                expect(response).toBeNaN();
            });
        });
    });
});
