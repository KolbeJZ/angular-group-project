import { Injectable } from '@angular/core';
import { AngularFirestore, SnapshotOptions } from 'angularfire2/firestore';
@Injectable({
  providedIn: 'root'
})
export class DataBaseService {

  constructor(
    private db: AngularFirestore,
  ) { }
  getSingle() {
    // let res = this.db.collection('users').doc('DQSyNE14AD2wi7th8zXn'))
    

  }
}
