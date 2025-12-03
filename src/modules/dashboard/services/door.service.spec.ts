import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { DoorService } from './door.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('DoorService', () => {
    let service: DoorService;

    beforeEach(() => {
        TestBed.configureTestingModule({
    imports: [],
    providers: [DoorService, provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
        service = TestBed.inject(DoorService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
