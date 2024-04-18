import { Component } from '@angular/core';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})
export class ReservationComponent {
  destination: string = '';
  startDate: string = '';
  endDate: string = '';
  totalCost: number | null = 0;
  destinationId: number = 0;
  startDateFormatted: string = '';
  endDateFormatted: string = '';
  showMakeReservationButton: boolean = false;

  constructor(private reservationService: ReservationService,private route: ActivatedRoute) {}
  

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.destinationId = +params['destinationId'];
    });
  }

  checkAvailability(): void {
    console.log("t", this.startDate)
    console.log("e", this.endDate)
    if (typeof this.startDate === 'object' && typeof this.endDate === 'object') {
      this.startDateFormatted = this.formatDate(this.startDate as Date);
      this.endDateFormatted = this.formatDate(this.endDate as Date);
      console.log('start', this.startDateFormatted);
      console.log('end', this.endDateFormatted);
    }
    this.reservationService.checkAvailability(this.destinationId, this.startDateFormatted, this.endDateFormatted)
        .subscribe((response: any) => {
            if (response.available) {
                const nights = (new Date(this.endDate).getTime() - new Date(this.startDate).getTime()) / (1000 * 3600 * 24);
                this.totalCost = response.totalCost;
                this.showMakeReservationButton = true;
            } else {
                this.totalCost = null;
                alert('Destinația nu este disponibilă pentru această perioadă.');
                this.showMakeReservationButton = false;
            }
        });
}

formatDate(date: Date): string {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString();
    let day = date.getDate().toString();
    
    if (month.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    
    return `${year}-${month}-${day}`;
}

  makeReservation(): void {
    if (this.totalCost !== null) {
      this.reservationService.reservation(this.destinationId, this.startDateFormatted, this.endDateFormatted, this.totalCost)
        .subscribe(() => {
          alert('Rezervare efectuată cu succes!');
        });
    } else {
      alert('Nu se poate face rezervarea, destinația nu este disponibilă.');
    }
  }
}
