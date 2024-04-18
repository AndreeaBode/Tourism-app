import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DestinationsComponent } from './destinations/destinations.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 
import { SearchComponent } from './search/search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { ContactComponent } from './contact/contact.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { DestinationsAdminComponent } from './destinations-admin/destinations-admin.component';
import {MatDialogModule} from '@angular/material/dialog';
import { AddDestinationDialogComponent } from './destinations-admin/add-destination-dialog/add-destination-dialog.component';
import { ReservationComponent } from './reservation/reservation.component';
import { AvailableDestinationsComponent } from './destinations/available-destinations/available-destinations.component';
import { ReservationCalendarComponent } from './reservation-calendar/reservation-calendar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DestinationsComponent,
    DestinationsAdminComponent,
    SearchComponent,
    ContactComponent,
    LoginComponent,
    AddDestinationDialogComponent,
    ReservationComponent,
    AvailableDestinationsComponent,
    ReservationCalendarComponent
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatPaginatorModule,
    CommonModule,
    HttpClientModule,
    MatDialogModule,
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
