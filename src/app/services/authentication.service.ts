import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { TokenDetail } from '../models/token-detail';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private TOKEN_KEY: string = 'PND_TKN';
  private TOKEN_EXPIRY_KEY: string = 'PND_TKN_EXP';
  private REFRESH_TOKEN_KEY: string = 'PND_RFRSH_TKN';
  private REFRESH_TOKEN_EXPIRY_KEY: string = 'PND_RFRSH_TKN_EXP';

  constructor() { }

  /**
   * Returns true if the user is authenticated and has a valid token
   */
  isAuthenticated(): boolean {
    if(this.getToken() && !this.isTokenExpired()){
      return true;
    }

    return false;
  }

  isTokenExpired(): boolean {
    console.log((new Date()).getTime(), this.getTokenExpiry(), this.getTokenExpiry() - (new Date()).getTime());
    return (new Date()).getTime() >= this.getTokenExpiry();
  }

  /**
   * Retrieves the authentication
   * Redirect to this to log in
   */
  getAuthenticationUrl(): string {
    let { b2c_host, b2c_tenant, b2c_flow, b2c_client, b2c_redirect } = environment;
    let url = `https://${b2c_host}/${b2c_tenant}/oauth2/v2.0/authorize`;
    url += `?p=${b2c_flow}`
    url += `&client_id=${b2c_client}`
    url += `&redirect_uri=${b2c_redirect}`
    url += '&nonce=defaultNonce';
    url += '&scope=openid%20offline_access';
    url += '&response_type=code';
    url += '&prompt=login';
    url += '&response_mode=query';

    return url;
  }

  /**
   * Returns the endpoint to post to to get the access token details of the user
   * @param code The code supplied from the query parameters of the getAuthenticationUrl
   */
  getAuthorizationEndpoint(code: string): string {
    let { b2c_host, b2c_tenant, b2c_flow, b2c_client, b2c_redirect } = environment;
    let url = `https://${b2c_host}/${b2c_tenant}/oauth2/v2.0/token`;
    url += `?p=${b2c_flow}`
    url += `&grant_type=authorization_code`
    url += `&client_id=${b2c_client}`
    url += `&scope=${b2c_client}%20offline_access`
    url += `&code=${code}`
    url += `&redirect_uri=${b2c_redirect}`
    url += `&client_secret=`

    return url;
  }

  /**
   * Saves the details of a token
   * Will return false if there was an error, true upon success
   * @param tokenDetail Token detail object
   */
  saveTokenDetail(tokenDetail: TokenDetail): boolean {
    if (tokenDetail.error || tokenDetail.error_description) {
      console.log(`${tokenDetail.error} - ${tokenDetail.error_description}`);
      return false;
    }

    this.saveToken(tokenDetail.id_token);
    this.saveTokenExpiry(tokenDetail.id_token_expires_in);
    this.saveRefreshToken(tokenDetail.refresh_token);
    this.saveRefreshTokenExpiry(tokenDetail.refresh_token_expires_in);

    return true;
  }

  /**
   * Returns the bearer JWT from local storage
   */
  getToken(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  /**
   * Saves the bearer JWT to local storage
   * @param token The bearer token
   */
  private saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  /**
   * Saves the bearer JWT expiry time to local storage
   * @param tokenExpiresIn The amount of seconds until the token expires
   */
  private saveTokenExpiry(tokenExpiresIn: number): void {
    let expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + tokenExpiresIn);
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, (expiryTime.getTime() - 20).toString());
  }

  /**
   * Saves the refresh token to local storage
   * @param token The refresh token
   */
  private saveRefreshToken(token: string): void {
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  /**
   * Saves the refresh token expiry time to local storage
   * @param tokenExpiresIn The amount of seconds until the refresh token expires
   */
  private saveRefreshTokenExpiry(tokenExpiresIn: number): void {
    let expiryTime = new Date();
    expiryTime.setSeconds(expiryTime.getSeconds() + tokenExpiresIn);
    localStorage.setItem(this.REFRESH_TOKEN_EXPIRY_KEY, (expiryTime.getTime() - 20).toString());
  }

  private getTokenExpiry(): number {
    return Number(localStorage.getItem(this.TOKEN_EXPIRY_KEY));
  }

}
