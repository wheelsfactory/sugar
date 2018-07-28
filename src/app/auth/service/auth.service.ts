import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(userName: string, password: string) {
    return this.http.post(environment.API_ENDPOINT + 'login', {userName, password}).pipe(
      tap(
        data => this.setSession
      )
    );
  }

  getAuthToken() {
    return localStorage.getItem('userToken');
  }

  private setSession(authResponse) {

  }
}
