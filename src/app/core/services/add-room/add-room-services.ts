import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { room } from '../../../shared/models/room/room';

@Injectable({
  providedIn: 'root',
})
export class AddRoomServices {
  private readonly apiUrl:string =environment.apiUrl;
  private readonly httpClient=inject(HttpClient)
  constructor(private readonly http:HttpClient){

  }
  addrooms(userdata:object):Observable<any>{
    const accessToken = localStorage.getItem('userToken');
     const headers = new HttpHeaders({
    'Authorization': `ADMIN ${accessToken}`,
  });

    return this.httpClient.post<any>(this.apiUrl+'/rooms/',userdata, { headers });

  }
}
