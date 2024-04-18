import { Component, AfterViewInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import { ReservationService } from '../reservation.service';
import { ActivatedRoute } from '@angular/router';
import dayGridPlugin from '@fullcalendar/daygrid';
import Chart from 'chart.js/auto'; // Importă Chart.js

@Component({
  selector: 'app-reservation-calendar',
  templateUrl: './reservation-calendar.component.html',
  styleUrls: ['./reservation-calendar.component.scss']
})
export class ReservationCalendarComponent implements AfterViewInit {

  @ViewChild('calendar') calendarRef!: ElementRef;
  @ViewChild('chartCanvas') chartCanvas!: ElementRef<HTMLCanvasElement>; // Reference to the canvas element

  destinationId: number = 0;
  reservations: any[] = [];
  statisticsData: any = [];

  monthNames: string[] = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
  ];

  constructor(private reservationService: ReservationService, 
              private route: ActivatedRoute,
              private renderer: Renderer2) {}

  ngAfterViewInit(): void {
      this.route.params.subscribe(params => {
        this.destinationId = +params['id'];
      });

      this.loadReservations(this.destinationId);
      this.loadStatistics(this.destinationId);
  }

  loadReservations(destinationId: number): void {
    console.log("ID", destinationId);
    this.reservationService.getReservationsForDestination(destinationId)
      .subscribe(reservations => {
        this.reservations = this.formatReservations(reservations);
        this.renderCalendar();
      });
  }

  loadStatistics(destinationId: number): void {
    this.reservationService.getDestinationStatistics(destinationId)
      .subscribe((data: any[]) => { // Explicitly specify the type for 'data'
        this.statisticsData = this.formatStatisticsData(data);
        console.log("statistics", this.statisticsData);
        this.renderChart();
      });
  }

  formatReservations(reservations: any[]): any[] {
    let formattedReservations: any[] = [];
    reservations.forEach(reservation => {
        let startDate = new Date(reservation.start_date);
        let endDate = new Date(reservation.end_date);
        formattedReservations.push({ title: 'Reserved', start: startDate, end: endDate });
    });
    return formattedReservations;
  }

  formatStatisticsData(data: any[]): any {
    let formattedData: any = {};
    data.forEach(item => {
      let monthName = this.monthNames[item.month - 1]; // Translate month number to month name
      formattedData[monthName] = item.reservations_count;
    });
    return formattedData;
  }

  renderChart(): void {
    const canvas: HTMLCanvasElement = this.chartCanvas.nativeElement;
    const context: CanvasRenderingContext2D | null = canvas.getContext('2d');
  
    console.log("Data for chart:", this.statisticsData); // Adăugarea console.log pentru afișarea datelor pentru grafic
  
    if (context) {
      const months = Object.keys(this.statisticsData);
      const counts = Object.values(this.statisticsData);
  
      console.log("Months:", months);
      console.log("Counts:", counts);
  
      new Chart(context, {
        type: 'bar',
        data: {
          labels: months,
          datasets: [{
            label: 'Number of Reservations',
            data: counts,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    } else {
      console.error('Canvas context is null.');
    }
  }
  

  renderCalendar(): void {
    const calendarEl: HTMLElement = this.calendarRef.nativeElement;
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin],
        initialView: 'dayGridMonth',
        events: this.reservations
    });
    calendar.render();
  }
}
