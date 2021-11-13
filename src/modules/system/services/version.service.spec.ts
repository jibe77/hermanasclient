import {HttpClientTestingModule} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {MeteoService} from '@modules/dashboard/services';

import { VersionService } from './version.service';

describe('VersionService', () => {
    let service: VersionService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [VersionService],
        });
        service = TestBed.inject(VersionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
