import { TestBed } from '@angular/core/testing';

import { DoorService } from './door.service';

describe('MeteoService', () => {
  let service: DoorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
