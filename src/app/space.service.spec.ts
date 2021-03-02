import { TestBed } from '@angular/core/testing';

import { SpacesXService } from './space.service';

describe('SpaceService', () => {
  let service: SpacesXService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacesXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
