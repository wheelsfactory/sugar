import { HttpResponse } from './../../core/model/HttpResponse';
import { environment } from '../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { Baby } from '../model/Baby';

@Injectable({
  providedIn: 'root'
})
export class BabyService {

  constructor(private http: HttpClient) { }

  getBabiesByUsername (username:string){
    let data = {
      username: username
    };
    return this.http.post<HttpResponse>(environment.API_ENDPOINT + 'baby/loadBaby',{}, {
      params: data
    }).pipe(
      map(res => {
        if (res.status === 0) {
          return res.data;
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
}
