import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MeteoService } from '@modules/dashboard/services/meteo.service';

import { DoorService } from './door.service';

describe('MeteoService', () => {
    let service: MeteoService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MeteoService],
        });
        service = TestBed.inject(MeteoService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
