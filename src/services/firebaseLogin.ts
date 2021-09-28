import { Injectable, NgZone, OnInit } from '@angular/core';
import {AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference, FieldPath } from '@angular/fire/firestore';
import { DataBaseService } from 'src/services/data-base.service';
import {auth } from 'firebase/app';
import { Router } from '@angular/router';
import { Users } from 'src/models/users';
import { UserService } from 'src/services/user.service';
import { firestore } from 'firebase/app';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class FirebaseLoginService implements OnInit {
  logout(arg0: { returnTo: string; }) {
    throw new Error('Method not implemented.');
  }
  userData$ = JSON.parse(localStorage.getItem('user'));
  constructor(
      public afAuth: AngularFireAuth, 
      private router: Router,
      private zone: NgZone,
      private db: AngularFirestore,
    //   public af: AngularFireAuth,
      ) {

  }
  ngOnInit() {
    if(JSON.parse(localStorage.getItem('user'))) {
      this.userData$ = JSON.parse(localStorage.getItem('user'));
    }
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
        this.newUserLogin(log);
        this.afAuth.authState.subscribe(user => {
            if (user) {
              this.userData$ = user;
              localStorage.setItem('user', JSON.stringify(this.userData$));
              JSON.parse(localStorage.getItem('user'));
            } else {
              localStorage.setItem('user', null);

              JSON.parse(localStorage.getItem('user'));
            }
          })
        

          this.zone.run(()=>this.router.navigate(['/profile']));
          location.reload();
    }
    ).catch(() => {

        console.log('sign in failed');
    }
    );
  }
  signOut() {
      this.afAuth.auth.signOut();
      localStorage.removeItem('user');
  }
   get currentUser() {
      return JSON.parse(localStorage.getItem('user'));
  }
  getSingle() {
    return this.db.collection('users').valueChanges();
  }
  getLikes() {
    let id = JSON.parse(localStorage.getItem('user')).uid;
    console.log(id);
    return this.db.collection('users').doc(id).valueChanges();
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
    this.addMostLiked(art);
    let current = JSON.parse(localStorage.getItem('user'));
      return this.db.collection('users').doc(current.uid).update(
        {
          favorites: firestore.FieldValue.arrayUnion(art)
         });
    }

    delete(art: any) {
        let current = JSON.parse(localStorage.getItem('user'));
        return this.db.collection('users').doc(current.uid).update(
          {
            favorites: firestore.FieldValue.arrayRemove(art)
           });
    }
// like(art: any) {
//     let current = this.afAuth.auth.currentUser;
//       return this.db.collection('users').doc(current.uid).update(
//         {
//           favorites: firestore.FieldValue.arrayUnion(art)
//          });
      
//     }
    addMostLiked(art) {
      let popular = this.db.collection('mostLiked').doc('f1qDNHX3CTyhvlODZTs2').valueChanges().subscribe(
        (res: any) => {

          this.db.collection('mostLiked').doc('f1qDNHX3CTyhvlODZTs2').set({
            topArticles: firestore.FieldValue.arrayUnion({article: {article: art,totalLikes: 0}, merge:{merge: true}})
          })
          console.log("db likes",res.topArticles);
          res.topArticles.forEach((x, index) => {
            console.log("this is ofre each",x)
            if(x.article === art) {
              console.log('it was found')
              return this.db.collection('mostLiked').doc('f1qDNHX3CTyhvlODZTs2').update({
                topArticles: firestore.FieldValue.arrayUnion({
                  article: 'test',
                  totalLikes: x.totalLikes + 1
                })
              })
            }
          });
        }
      )
    }
}