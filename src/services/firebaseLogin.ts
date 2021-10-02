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
import { IArticle } from 'src/models/Article';
import { map, catchError, mergeMap} from 'rxjs/operators';
import { ArrayType } from '@angular/compiler';

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
  getSingle2(docId: any) {
    return this.db.collection('mostLiked').doc(docId).valueChanges();
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
    // this.sort();
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
      let rand = art.author + art.publishedAt;
      // this.db.collection('mostLiked').doc(rand)
      // .set({
      //   article: art
      // })
      this.db.collection('count').doc(rand)
      .set({
          // [rand]: firestore.FieldValue.increment(1),
          id: rand,
          article: art,
          count: firestore.FieldValue.increment(1)
          
      }, 
      {merge: true}
      )
    }
  //   getMostLiked() {
  //     let ref;
  //     this.db.collection('count', ref => ref.orderBy('count', 'desc'))
  //     .valueChanges()
  //     .subscribe(
  //       (res: any) => {
  //       let ref = res.map((x: any) => {
  //         console.log('cjee',x.article)
  //         return x.article;
  //       }
        
  //     ) 
  //     console.log(ref)
  //   })
  // }
    private liked = new Subject<IArticle[]>();
    likedChange$ = this.liked.asObservable();
    getMostLiked() {
      console.log('running')
      this.db.collection('mostLiked').valueChanges()
      .pipe(
        map((x: any) => {
          x.map(y => {
            console.log('map',y.article)
          let item = y.article;
            return item;
        })
        this.liked.next(x);
      }
        
      ))
      .subscribe();
    } 
    private sorting = new Subject<String[]>();
    sortChange$ = this.sorting.asObservable();
    sort() {
      return this.db.collection('count', ref => ref.orderBy('count', 'desc'))
      .valueChanges()
      .pipe(
        map((x: any)=> {
          console.log('sort',x);
          let m = x.filter((y, i) => i < 40)
          .map((q, i:any) => {
            let item = q.article;
            console.log( 'item', item)
            return item
          });
          this.sorting.next(m);
        }))
      .subscribe();
    }
    getSorted(arr) {
      return this.db.collection('userLikes', ref => ref.where('id', 'in', arr)).valueChanges();
    }
    // getMostLiked() {
    //   console.log('running')
    //   this.db.collection('mostLiked').valueChanges()
    //   .pipe(
    //     map((x: any) => {
    //       x.map(y => {
    //         console.log('map',y.article)
    //       let item = y.article;
    //         return item;
    //     })
    //     this.liked.next(x);
    //   }
        
    //   ))
    //   .subscribe();
    // } 
    // getMostLiked() {
     
    //   return this.db.collection('count', ref => ref.orderBy('count', 'desc')).valueChanges();  
    //   return this.db.collection('mostLiked').valueChanges();
    // } 
    // addMostLiked(art) {
    //   let popular = this.db.collection('mostLiked').doc('f1qDNHX3CTyhvlODZTs2').valueChanges().subscribe(
    //     (res: any) => {

    //       this.db.collection('mostLiked').doc('f1qDNHX3CTyhvlODZTs2').set({
    //         topArticles: firestore.FieldValue.arrayUnion({article: {article: art,totalLikes: 0}, merge:{merge: true}})
    //       })
    //       console.log("db likes",res.topArticles);
    //       res.topArticles.forEach((x, index) => {
    //         console.log("this is ofre each",x)
    //         if(x.article === art) {
    //           console.log('it was found')
    //           return this.db.collection('mostLiked').doc('f1qDNHX3CTyhvlODZTs2').update({
    //             topArticles: firestore.FieldValue.arrayUnion({
    //               article: 'test',
    //               totalLikes: x.totalLikes + 1
    //             })
    //           })
    //         }
    //       });
    //     }
    //   )
    // }
}