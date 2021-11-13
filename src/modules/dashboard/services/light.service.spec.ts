import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LightService } from '@modules/dashboard/services/light.service';

import { SchedulerService } from './scheduler.service';

describe('LightService', () => {
    let service: LightService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [LightService],
        });
        service = TestBed.inject(LightService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
