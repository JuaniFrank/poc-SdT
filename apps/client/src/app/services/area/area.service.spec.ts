import { TestBed } from '@angular/core/testing';
import { AreaServiceTsService } from './area.service';


describe('AreaServiceTsService', () => {
  let service: AreaServiceTsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AreaServiceTsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
