import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LightService } from '@modules/dashboard/services/light.service';

import { SchedulerService } from './scheduler.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('LightService', () => {
    let service: LightService;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [LightService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(LightService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
