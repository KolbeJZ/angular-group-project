import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, FieldPath } from '@angular/fire/firestore';
import { IArticle } from 'src/models/Article';
import { Users } from 'src/models/users';
import {AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase/app';
import { FirebaseLoginService } from './firebaseLogin';

@Injectable({
  providedIn: 'root'
})
export class DataBaseService {
  constructor(
    private db: AngularFirestore,
    public af: AngularFireAuth,
    // private log: FirebaseLoginService
  ) { }
  test$: any;
  getSingle() {
    return this.db.collection('users').valueChanges();
  }
  // like(art: any) {

  //   let current = this.log.currentUser();
  //     return this.db.collection('users').doc(current.uid).update(
  //       {
  //         favorites: firestore.FieldValue.arrayUnion(art)
  //        });
      
  //   }

//   newUserLogin(user: Users) {
//     let data = {
//       name: user.name,
//       userId: user.userId
//     }
//     console.log('new document added id', user);
//     return this.db.collection('users').doc(user.userId)
//     .set(data, {
//       merge: true
//     });
      
//   }
}
