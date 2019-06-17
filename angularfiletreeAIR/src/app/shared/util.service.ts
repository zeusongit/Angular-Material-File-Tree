import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(private http: HttpClient) { }

  public getData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }

  public getHistoryData = (route: string) => {
    return this.http.get(this.createCompleteRoute(route, environment.urlAddress));
  }
 
  public uploadFile = (route: string, body) => {
    return this.http.post(this.createCompleteRoute(route, environment.urlAddress), body, this.generateHeaders());
  }

  public clearAll = (route: string) => {
    return this.http.delete(this.createCompleteRoute(route, environment.urlAddress));
  }



  private createCompleteRoute = (route: string, envAddress: string) => {
    return `${envAddress}/${route}`;
  }
 
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
  }
}

