import { TestBed } from '@angular/core/testing';

import { RedbackgraphsService } from './redbackgraphs.service';

describe('RedbackgraphsService', () => {
  let service: RedbackgraphsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedbackgraphsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
