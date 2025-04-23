import { TestBed } from '@angular/core/testing';

import { LoginRedirectGuardService } from './login-redirect-guard.service';

describe('LoginRedirectGuardService', () => {
  let service: LoginRedirectGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginRedirectGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
