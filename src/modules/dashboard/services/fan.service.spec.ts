import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FanService } from '@modules/dashboard/services/fan.service';

describe('FanService', () => {
    let service: FanService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FanService],
        });
        service = TestBed.inject(FanService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
