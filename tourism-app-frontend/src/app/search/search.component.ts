import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DestinationService } from '../destinations.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})

export class SearchComponent implements OnInit {
  searchQuery: string = '' ;

  constructor(private router: Router, private destinationService :  DestinationService) { }

  ngOnInit(): void {
    this.getLocationAndSave();
  }
  destinations: any[] = [];
  displayedDestinations: any[] = [];

  search(location: string) {
    this.destinationService.getCalatorii().subscribe((calatorii: any[]) => {
      const filteredDestinations = calatorii.filter(dest => dest.location === location);
      this.displayedDestinations = filteredDestinations;
    });
  }
  
  

  getLocationAndSave() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => { // specificăm tipul GeolocationPosition
          this.saveLocation(position);
        },
        (error) => {
          console.error('Error getting geolocation:', error); // gestionăm eventualele erori
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  saveLocation(position: GeolocationPosition) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Salvăm locația într-un cookie pentru a o folosi ulterior în backend
    document.cookie = `user_location=${latitude},${longitude}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    
    console.log(`Location saved: Latitude ${latitude}, Longitude ${longitude}`);
  }
}
