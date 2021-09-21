import { Injectable, NgZone } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import {auth } from 'firebase/app';
import { Router } from '@angular/router';

@Injectable()
export class FirebaseLoginService  {
  constructor(
      public afAuth: AngularFireAuth, 
      private router: Router,
      private zone: NgZone,
      ) {

  }
 
  signIn() {
    this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(() => {

        console.log('sign in success');
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

}