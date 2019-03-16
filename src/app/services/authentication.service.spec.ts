import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

describe('AuthenticationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service).toBeTruthy();
  });

  it('should return a boolean from isAuthenticated', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(typeof service.isAuthenticated()).toEqual('boolean');
  });
});
