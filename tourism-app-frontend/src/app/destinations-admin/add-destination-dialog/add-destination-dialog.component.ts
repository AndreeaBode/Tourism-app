// add-destination-dialog.component.ts

import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Destination } from '../../destination';
import { DestinationService } from '../../destinations.service';

@Component({
  selector: 'app-add-destination-dialog',
  templateUrl: './add-destination-dialog.component.html',
  styleUrls: ['./add-destination-dialog.component.scss']
})
export class AddDestinationDialogComponent implements OnInit {
  isEdit: boolean;
  destination: Destination;

  constructor(
    public dialogRef: MatDialogRef<AddDestinationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private destinationService: DestinationService
  ) {
    this.isEdit = data.isEdit;
    this.destination = data.destination || { location: '', price_per_night: 0, available_seats: 0, offer_percentage: 0, imageUrl: '' };
  }
  
  ngOnInit(): void {
  }

  save(): void {
    if (this.isEdit) {
      this.destinationService.update(this.destination.id, this.destination).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      this.destinationService.add(this.destination).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }
}
