import { TestBed } from '@angular/core/testing';

import { UserdatasService } from './userdatas.service';

describe('UserdatasService', () => {
  let service: UserdatasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserdatasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
