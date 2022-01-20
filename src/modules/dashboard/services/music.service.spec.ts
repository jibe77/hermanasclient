import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MusicService } from '@modules/dashboard/services/music.service';

describe('MusicService', () => {
    let service: MusicService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [MusicService],
        });
        service = TestBed.inject(MusicService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
