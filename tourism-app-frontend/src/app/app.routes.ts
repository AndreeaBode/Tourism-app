import { Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DestinationsComponent } from './destinations/destinations.component';

export const routes: Routes = [
    { path: 'home-page', component: HomePageComponent },
    { path: 'destinations', component: DestinationsComponent }, // Remove leading slash
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  ];
  

