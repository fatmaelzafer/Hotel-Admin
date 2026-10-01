import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private readonly apiUrl:string =environment.apiUrl;
  private readonly httpClient=inject(HttpClient);
  sendloginrdata(userdata:object ):Observable<any>{
    const headers = new HttpHeaders({
    'ngrok-skip-browser-warning': 'true',
    });
    return this.httpClient.post<any>(this.apiUrl+'/auth/signin/',userdata,{headers});
  }
  decodeUserToken(){
    if(sessionStorage.getItem('userToken')){
      const token = sessionStorage.getItem('userToken')!;
    const decoded = jwtDecode(token);
    }

  }
}
