import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DestinationService } from '../destinations.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent {
  pageSize = 3;
  pageSizeOptions = [3, 6, 9];
  currentPage = 0;
  displayedDestinations: any[] = [];
  destinations: any[] = [];
  destinationsWithOffers: any[] = [];
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  userRole: string = '';

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private router: Router,
    private authService: AuthService,
  ) {
    this.destinationsWithOffers = this.getDestinationsWithOffers();
  }

  ngOnInit(): void {
    this.destinationService.getCalatorii().subscribe((calatorii: any[]) => {
      this.destinations = calatorii;
      this.updateDisplayedDestinations();
    });

    this.userRole = this.authService.userRole();
    console.log("User role", this.userRole);

  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex;
    this.updateDisplayedDestinations();
  }

  updateDisplayedDestinations(): void {
    const startIndex = this.currentPage * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    console.log("Start Index:", startIndex);
    console.log("End Index:", endIndex);
    this.displayedDestinations = this.getDestinationsToShow().slice(startIndex, endIndex);
  }

  getDestinationsToShow() {
    let destinationsToShow = this.destinations;
    if (this.isOnOffersRoute()) {
      destinationsToShow = destinationsToShow.filter(destination => destination.has_offer);
    }

    return destinationsToShow;
  }

  formatDate(date: Date): string {
    const year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');
    let day = date.getDate().toString().padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  isOnOffersRoute(): boolean {
    return this.route.snapshot.url.some(segment => segment.path === 'offers');
  }

  reserve(destinationId: number): void {
    this.router.navigate(['/reservation', destinationId]);
  }

  checkAvailability(): void {
    if (this.selectedStartDate && this.selectedEndDate) {
      const startDateFormatted = this.formatDate(this.selectedStartDate);
      const endDateFormatted = this.formatDate(this.selectedEndDate);
      console.log("ss", startDateFormatted);
      console.log("ee", endDateFormatted);
      this.displayedDestinations = [];

      this.destinationService.checkAvailability(startDateFormatted, endDateFormatted).subscribe((response: any) => {
        if (response && response.available_calatorii && response.available_calatorii.length > 0) {
          console.log("Destinațiile disponibile pentru datele selectate sunt:", response.available_calatorii);
          this.displayedDestinations = response.available_calatorii; 
        } else {
          console.log("Nu există destinații disponibile pentru datele selectate.");
          this.displayedDestinations = []; 
        }
      }, (error) => {
        console.error("Eroare la verificarea disponibilității:", error);
      });
    } else {
      console.log("Selectați o perioadă de călătorie pentru a verifica disponibilitatea.");
    }
  }



  getDestinationsWithOffers() {
    return this.destinations.filter(destination => destination.has_offer);
  }

  viewReservations(destination: any): void {
    const destinationId = destination.id;
    this.router.navigate(['/reservation-admin', destinationId]);
  }

}
