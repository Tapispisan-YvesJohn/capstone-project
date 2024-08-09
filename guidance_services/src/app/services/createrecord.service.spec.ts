import { TestBed } from '@angular/core/testing';

import { CreaterecordService } from './createrecord.service';

describe('CreaterecordService', () => {
  let service: CreaterecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreaterecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
