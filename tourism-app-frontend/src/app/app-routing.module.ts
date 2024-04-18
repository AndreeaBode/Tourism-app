import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { SearchComponent } from './search/search.component';
import { ContactComponent } from './contact/contact.component';
import { LoginComponent } from './login/login.component';
import { DestinationsAdminComponent } from './destinations-admin/destinations-admin.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AvailableDestinationsComponent } from './destinations/available-destinations/available-destinations.component';
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
    { path: 'home-page', component: HomePageComponent },
    { path: 'destinations', component: DestinationsComponent },  
    { path: 'destionations-admin', component: DestinationsAdminComponent , canActivate: [AuthGuard], data: { roles: ['agent'] }}, 
    { path: 'destinations/offers', component: DestinationsComponent, data: { filter: 'offers' } },
    { path: 'search', component: SearchComponent },
    { path: 'contact', component: ContactComponent },
    { path: 'login', component: LoginComponent },
    { path: 'reservation/:destinationId', component: ReservationComponent , canActivate: [AuthGuard]}, 
    { path: 'reservation-admin/:id', component: ReservationCalendarComponent , canActivate: [AuthGuard], data: { roles: ['agent'] }}, 
    { path: 'available-destinations', component: AvailableDestinationsComponent , canActivate: [AuthGuard]}, 
    { path: '', redirectTo: '/home-page', pathMatch: 'full' },
  ];
  

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
