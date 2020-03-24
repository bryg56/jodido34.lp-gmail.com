import { TestBed } from '@angular/core/testing';

import { ServicePopoService } from './service-popo.service';

describe('ServicePopoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServicePopoService = TestBed.get(ServicePopoService);
    expect(service).toBeTruthy();
  });
});
