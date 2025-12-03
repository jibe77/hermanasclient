import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MeteoService } from '@modules/dashboard/services/meteo.service';

import { DoorService } from './door.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('MeteoService', () => {
    let service: MeteoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [MeteoService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(MeteoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
