import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { SchedulerService } from './scheduler.service';

describe('SchedulerService', () => {
    let service: SchedulerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [SchedulerService],
        });
        service = TestBed.inject(SchedulerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
