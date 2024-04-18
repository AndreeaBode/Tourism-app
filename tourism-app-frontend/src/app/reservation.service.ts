import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DestinationService } from './destinations.service'; 

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:8000'; 

  constructor(private http: HttpClient, private destinationService: DestinationService) { }

  checkAvailability(destination: number, startDate: string, endDate: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/check_availability/`, { destination, start_date: startDate, end_date: endDate });
  }

  reservation(destinationId: number, startDate: string, endDate: string, totalCost: number): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservation/`, { destinationId, start_date: startDate, end_date: endDate, total_cost: totalCost });
  }

  getCurrentPrice(destinationId: number): Observable<number> {
    return this.destinationService.getCalatorii().pipe(
      map((calatorii: any[]) => { 
        const filteredDestinations = calatorii.filter(dest => dest.destinationId === destinationId);
        if (filteredDestinations.length > 0) {
          return filteredDestinations[0].price;
        } else {
          throw new Error('Destinația nu a fost găsită.');
        }
      })
    );
  }
  
  getReservationsForDestination(destinationId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/reservations/${destinationId}`);
  }

  getDestinationStatistics(destinationId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/destination-statistics/${destinationId}`);
  }
  
}
