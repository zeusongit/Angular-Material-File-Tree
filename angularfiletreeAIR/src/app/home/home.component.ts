import { UtilService } from '../shared/util.service';
import { SharedDataService } from "../shared/shared-data.service";
import { Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material';
import { UploadModalComponent } from '../modal/upload-modal/upload-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

  public uploadForm: FormGroup;
  private dialogConfig;
  public isShow: boolean;
  public isShowMsg: boolean;
 
  constructor(private location: Location, private util: UtilService, private dialog: MatDialog, public dataService:SharedDataService) { }
 
  ngOnInit() {
    this.isShow=false;
    this.isShowMsg=false;
    this.uploadForm = new FormGroup({
      fileName: new FormControl('', [Validators.required])
    });
    this.dialogConfig = {
      height: '80%',
      width: '50%',
      disableClose: true,
      data: { }
    }
  } 
  public hasError = (controlName: string, errorName: string) =>{
    return this.uploadForm.controls[controlName].hasError(errorName);
  }
  public onBrowse = () => {
    let apiUrl = '';
    this.util.getData(apiUrl)
      .subscribe(res => {
        console.log(res);
        this.dialogConfig.data=res;
        //call modal open
        let dialogRef = this.dialog.open(UploadModalComponent, this.dialogConfig);
        //after modal close
        dialogRef.afterClosed()
          .subscribe(result => {
              this.uploadForm.patchValue({              
                fileName:this.dataService.getSharedData()
              });
              this.isShowMsg=false  
        });
      },
      (error => {
        console.log(error);
      })
    )
  }

 
  public uploadFile = (uploadFileValue) => {
    if (this.uploadForm.valid) {
      this.executeFileUpload(uploadFileValue);
    }
  }
  private executeFileUpload = (uploadFileValue) => {
    let file = {
      name: uploadFileValue.fileName
    }
    console.log(file); 
    let apiUrl = 'upload';
    this.util.uploadFile(apiUrl, file)
      .subscribe(res => {
        console.log(res);
        this.isShow=true;
        setTimeout(function() {
          console.log("ngv");
          this.isShow = false;
          this.isShowMsg = true;
        }.bind(this), 5000);
      },
      (error => {
        console.log(error);
      })
    )
  }

}
