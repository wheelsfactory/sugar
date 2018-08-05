import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';
import { ResponseData } from '../../response/response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLogin = false;

  public account = '';

  constructor(private http: HttpClient) {
  }

  login(userName: string, password: string): Promise<ResponseData> {

    const formData = {
      username: 'admin@zshop.com',
      password: '123456'
    };
    return this.http.post(environment.API_ENDPOINT + 'login', JSON.stringify(formData)).toPromise()
    .then((response: ResponseData) => {
      this.isLogin = response.status === 0;
      this.account = userName;
      this.setAuthToken(response.token);
      return response;
    });
  }

  getAuthToken() {
    return localStorage.getItem('userToken');
  }

  setAuthToken(token: string) {
    localStorage.setItem('userToken',token);
  }

  private setSession(authResponse) {

  }
}
