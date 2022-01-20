import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { WeatherService } from './weather.service';

describe('WeatherService', () => {
    let weatherService: WeatherService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [WeatherService],
        });
        weatherService = TestBed.inject(WeatherService);
    });

    describe('getToday', () => {
        it('should return Observable<MeteoInfo>', () => {
            weatherService.getToday().subscribe(response => {
                expect(response).toBeNaN();
            });
        });
    });

    describe('getWeek', () => {
        it('should return Observable<MeteoInfo>', () => {
            weatherService.getWeek().subscribe(response => {
                expect(response).toBeNaN();
            });
        });
    });

    describe('getInfoUsingDateRange', () => {
        it('should return Observable<MeteoInfo>', () => {
            weatherService.getInfoUsingDateRange('2021-09-01', '2021-10-01').subscribe(response => {
                expect(response).toBeNaN();
            });
        });
    });
});
