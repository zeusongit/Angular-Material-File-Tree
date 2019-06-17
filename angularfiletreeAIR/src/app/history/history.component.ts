import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { UtilService } from '../shared/util.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  public displayedColumns = ['name'];
  public dataSource = new MatTableDataSource<string>();
 
  constructor(private util: UtilService) { }
 
  ngOnInit() {
    this.getUploadHistory();
  }

  public clearAll = () => {
    let apiUrl = 'clear';
    this.util.clearAll(apiUrl)
      .subscribe(res => {
        console.log(res);
        this.dataSource.data = res as string[];
      },
      (error => {
        console.log(error);        
      })
    )
  }
 
  public getUploadHistory = () => {
    this.util.getHistoryData('history')
    .subscribe(res => {
      this.dataSource.data = res as string[];
    })
  }

}
