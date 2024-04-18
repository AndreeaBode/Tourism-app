// destination.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Destination } from './destination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DestinationService {

  private baseUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient) { }

  getDestinations(): Observable<any> {
    return this.http.get(`${this.baseUrl}/get`);
  }

 getDestinationsByLocation(location: string): Observable<any> {
    const url = `${this.baseUrl}/get?location=${location}`;
    return this.http.get(url);
  }

getCalatorii(): Observable<any[]> {
  const url = `${this.baseUrl}/calatorii/`;
  return this.http.get<any[]>(url);
}


  add(destination: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/add/`, destination); 
  }


  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  update(id: number, destination: Destination): Observable<any> {
    return this.http.put(`${this.baseUrl}/update/${id}/`, destination);
  }

  checkAvailability(startDate: string, endDate: string): Observable<any[]> {
    return this.http.post<any[]>(`${this.baseUrl}/calatorii-availability`, { startDate, endDate });
  }
}
