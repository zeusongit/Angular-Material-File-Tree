import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule, MatProgressBarModule, MatToolbarModule, MatTreeModule, MatIconModule, MatButtonModule, MatListModule, MatCardModule, MatFormFieldModule, MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTreeModule,
    MatProgressBarModule,
    MatTableModule,
    CommonModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatDialogModule,
    MatTreeModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTableModule
  ]
})
export class MaterialModule { }
