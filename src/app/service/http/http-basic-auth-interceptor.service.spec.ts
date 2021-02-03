import { TestBed } from '@angular/core/testing';

import { HttpBasicAuthInterceptorService } from './http-basic-auth-interceptor.service';

describe('HttpBasicAthInterceptorService', () => {
  let service: HttpBasicAuthInterceptorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpBasicAuthInterceptorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
