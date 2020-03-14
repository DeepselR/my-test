import { TestBed } from '@angular/core/testing';

import { ComponentMapperService } from './component-mapper.service';

describe('ComponentMapperService', () => {
  let service: ComponentMapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentMapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
