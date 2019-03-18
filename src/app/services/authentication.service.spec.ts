import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';

const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

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

  it('should return a string from getAuthenticationUrl', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(typeof service.getAuthenticationUrl()).toEqual('string');
  });

  it('should not contain undefined in getAuthenticationUrl return', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service.getAuthenticationUrl().indexOf('undefined') === -1).toEqual(true);
  });

  it('should not contain null in getAuthenticationUrl return', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(service.getAuthenticationUrl().indexOf('null') === -1).toEqual(true);
  });

  it('should return a valid url from getAuthenticationUrl', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(isValidUrl(service.getAuthenticationUrl())).toEqual(true);
  });

  it('should return a string from getAuthorizationEndpoint', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(typeof service.getAuthorizationEndpoint('889897shdsabdsaj')).toEqual('string');
  });

  it('should return a string from getAuthorizationEndpoint', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(typeof service.getAuthorizationEndpoint('889897shdsabdsaj')).toEqual('string');
  });

  it('should return a valid url from getAuthorizationEndpoint', () => {
    const service: AuthenticationService = TestBed.get(AuthenticationService);
    expect(isValidUrl(service.getAuthorizationEndpoint('889897shdsabdsaj'))).toEqual(true);
  });
});
