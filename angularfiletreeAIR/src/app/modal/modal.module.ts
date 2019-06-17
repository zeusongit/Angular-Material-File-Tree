import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UploadModalComponent } from './upload-modal/upload-modal.component';

@NgModule({
  declarations: [UploadModalComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ],
  exports: [
    MaterialModule,
    FlexLayoutModule,
    UploadModalComponent
  ],
  entryComponents: [
    UploadModalComponent
  ]
})
export class ModalModule { }
