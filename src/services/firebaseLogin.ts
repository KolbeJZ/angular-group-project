import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, FieldPath } from '@angular/fire/firestore';
import { DataBaseService } from 'src/services/data-base.service';
import {auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Users } from 'src/models/users';
import { UserService } from 'src/services/user.service';
import { firestore } from 'firebase/app';

@Injectable()
export class FirebaseLoginService  {
  logout(arg0: { returnTo: string; }) {
    throw new Error('Method not implemented.');
  }
  constructor(
      public afAuth: AngularFireAuth, 
      private router: Router,
      private zone: NgZone,
      private db: AngularFirestore,
      public af: AngularFireAuth,
      ) {

  }
 
  signIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then((user) => {
        console.log('sign in success');
        let uid = this.afAuth.auth.currentUser.uid;
        // console.log(this.afAuth.auth.currentUser)
        let log: Users = {
            name: this.afAuth.auth.currentUser.displayName,
            userId: this.afAuth.auth.currentUser.uid,
            favorites: []
          }
        // this.db.newUserLogin(log);
        this.like('test5');
        this.zone.run(()=>this.router.navigate(['/profile']));
    }
    ).catch(() => {

        console.log('sign in failed');
    }
    );
  }
  signOut() {
      this.afAuth.auth.signOut();
  }
    currentUser() {
      return this.afAuth.auth.currentUser;
  }
  getSingle() {
    return this.db.collection('users').valueChanges();
  }
//   SetUserData(user) {
//     const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
//     const userData: User = {
//       uid: user.uid,
//       email: user.email,
//       displayName: user.displayName,
//       photoURL: user.photoURL,
//       emailVerified: user.emailVerified
//     }
//     return userRef.set(userData, {
//       merge: true
//     })
//   }
newUserLogin(user: Users) {
    let data = {
      name: user.name,
      userId: user.userId
    }
    console.log('new document added id', user);
    return this.db.collection('users').doc(user.userId)
    .set(data, {
      merge: true
    });
      
  }

like(art: any) {
    let current = this.afAuth.auth.currentUser;
      return this.db.collection('users').doc(current.uid).update(
        {
          favorites: firestore.FieldValue.arrayUnion(art)
         });
      
    }

}