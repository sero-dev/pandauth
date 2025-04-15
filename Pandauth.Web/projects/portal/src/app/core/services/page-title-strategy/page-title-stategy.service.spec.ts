import { TestBed } from '@angular/core/testing';

import { PageTitleStategyService } from './page-title-stategy.service';

describe('PageTitleStategyService', () => {
  let service: PageTitleStategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PageTitleStategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
