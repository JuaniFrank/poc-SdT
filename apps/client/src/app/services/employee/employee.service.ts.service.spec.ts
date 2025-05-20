import { TestBed } from '@angular/core/testing';

import { EmployeeServiceTsService } from './employee.service.ts.service';

describe('EmployeeServiceTsService', () => {
  let service: EmployeeServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmployeeServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
