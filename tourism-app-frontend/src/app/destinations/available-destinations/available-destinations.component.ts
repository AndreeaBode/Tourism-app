import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { DestinationService } from '../../destinations.service';

@Component({
  selector: 'app-available-destinations',
  templateUrl: './available-destinations.component.html',
  styleUrls: ['./available-destinations.component.scss']
})
export class AvailableDestinationsComponent {

  pageSize = 3;
  pageSizeOptions = [3, 6, 9];
  currentPage = 0;
  displayedDestinations: any[] = [];
  destinations: any[] = [];
  destinationsWithOffers: any[] = [];
  selectedStartDate: Date | null = null;
  selectedEndDate: Date | null = null;
  
  @ViewChild(MatPaginator) paginator!: MatPaginator; 

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationService,
    private router: Router
  ) {
    this.destinationsWithOffers = this.getDestinationsWithOffers();
  }

  ngOnInit(): void {
    this.displayedDestinations = []; 
    this.updateDisplayedDestinations();
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
    console.log("displayedDestinations", this.displayedDestinations);
    
    if (this.paginator) {
      this.paginator.length = this.destinations.length;
      console.log("pag", this.paginator.length);
    }
  
    this.currentPage = 0;
  }
  

  getDestinationsToShow() {
    return this.destinations;
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
  
      this.destinationService.checkAvailability(startDateFormatted, endDateFormatted).subscribe((response: any) => {
        if (response && response.available_calatorii && response.available_calatorii.length > 0) {
          console.log("Destinațiile disponibile pentru datele selectate sunt:", response.available_calatorii);
          this.destinations = response.available_calatorii;
          console.log("destinations", this.destinations);
          this.updateDisplayedDestinations(); // Actualizăm destinațiile afișate
          console.log("destinations lentgh", this.destinations.length);
          this.paginator.length = this.destinations.length; // Actualizăm lungimea totală a paginatorului cu numărul total de destinații
          console.log("paginator length", this.paginator.length);
          this.currentPage = 0; // Revenim la prima pagină
        } else {
          console.log("Nu există destinații disponibile pentru datele selectate.");
          this.displayedDestinations = []; 
          this.paginator.length = 0; // Resetăm la lungimea 0 a paginatorului
          this.currentPage = 0;
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
}
