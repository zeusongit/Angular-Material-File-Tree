import { Injectable } from '@angular/core';

export interface sharedData {
    value:string;
}

@Injectable({
    providedIn: 'root'
  })
  export class SharedDataService {
  sharingData: sharedData = { value: "" };
  saveSharedData(str) {
    this.sharingData.value = str;
  }
  getSharedData() {
    return this.sharingData.value;
  }
}
