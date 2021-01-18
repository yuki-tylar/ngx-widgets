import { TestBed } from '@angular/core/testing';

import { DirectiveService } from './directive.service';

describe('DirectiveService', () => {
  let service: DirectiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DirectiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
