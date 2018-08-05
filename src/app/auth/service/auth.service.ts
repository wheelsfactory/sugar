import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {AccessToken} from '../login/user/user';
import {environment} from '../../../environments/environment';

@Injectable()
export class AuthService {

  isLogin = false;

  public account = '';

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<string> {
    let data = {
      username: username,
      password: password
    };
    return this.http.post<AccessToken>(environment.API_ENDPOINT + 'login', data).pipe(
      map(res => {
        if (res.status === 0) {
          this.setAuthToken(res.token);
          return res.token;
        } else {
          throw new Error(res.message);
        }
      }),
      tap(
        _ => _,
        (err) => console.log({
          title: 'Error',
          msg: (err.error && err.error.errorMessage) || err.message,
        })
      )
    );
  }

  getAuthToken() {
    return localStorage.getItem('userToken');
  }

  setAuthToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  clearAuthToken() {
    localStorage.removeItem('userToken');
  }

  isLoggedIn() {
    return !!this.getAuthToken();
  }
}
