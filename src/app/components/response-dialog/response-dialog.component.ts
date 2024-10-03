import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-response-dialog',
  templateUrl: './response-dialog.component.html',
  styleUrl: './response-dialog.component.css'
})
export class ResponseDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    private dialogRef: MatDialogRef<ResponseDialogComponent> // Inject MatDialogRef
  ) {}

  onClose(): void {
    this.dialogRef.close(); // Close the dialog
  }
}


