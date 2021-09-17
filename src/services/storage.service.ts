import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

  public data: any;
  public query: string;

  constructor() {

  }

  storeData(dataToStore: any) {
    this.data = dataToStore;
  }

  retrieveData(): any {
    return this.data;
  }

  storeQueryString(query: string) {
    this.query = query;
  }

  retrieveQueryString() {
    return this.query;
  }

}
