// destinations-admin.component.ts

import { Component, OnInit } from '@angular/core';
import { Destination } from '../destination';
import { DestinationService } from '../destinations.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDestinationDialogComponent } from './add-destination-dialog/add-destination-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-destinations-admin',
  templateUrl: './destinations-admin.component.html',
  styleUrls: ['./destinations-admin.component.scss']
})
export class DestinationsAdminComponent implements OnInit {
  destinations: Destination[] = [];
  paginatedDestinations: Destination[] = [];
  newDestination: Destination = new Destination();
  currentPage: number = 1;
  pageSize: number = 3;
  pageSizeOptions: number[] = [3, 5, 10];

  constructor(private destinationService: DestinationService, public dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.getDestinations();
  }

  getDestinations(): void {
    this.destinationService.getDestinations()
      .subscribe(destinations => {
        this.destinations = destinations;
        this.updatePaginatedDestinations();
      });
  }

  updatePaginatedDestinations(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedDestinations = this.destinations.slice(startIndex, startIndex + this.pageSize);
  }


  deleteDestination(id: number): void {
    this.destinationService.delete(id)
      .subscribe(() => this.getDestinations());
    this.getDestinations();
  }

  showAddForm(): void {
    const dialogRef = this.dialog.open(AddDestinationDialogComponent, {
      width: '400px',
      data: {}
    });
  
    dialogRef.afterClosed().subscribe(() => {
      this.getDestinations();
      this.router.navigate(['/destinations-admin']);
    });
  }
  

  showEditForm(destination: Destination): void {
    this.dialog.open(AddDestinationDialogComponent, {
      width: '400px',
      data: { destination: destination }
    });
  }

  onPageChange(event: any): void {
    this.currentPage = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.updatePaginatedDestinations();
  }
}
