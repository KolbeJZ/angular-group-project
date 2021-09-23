// import { Injectable } from "@angular/core";
// import { AngularFireAuth } from "@angular/fire/auth";
// import { AngularFirestore, DocumentReference } from '@angular/fire/firestore';
// import * as firebase from "firebase/app";
// // import firebase from 'firebase/app'
// import { Observable, pipe } from 'rxjs';
// import { tap } from 'rxjs/operators'
// import { IArticle } from "src/models/Article";
// enum DataExtension {
//   Favorites = 'favorites'
// }
// @Injectable({
//   providedIn: 'root'
// })
// export class UserService {
//   constructor(
//     public afAuth: AngularFireAuth, 
//     private auth: AngularFireAuth,
//     private store: AngularFirestore
//   ) {
//     this.auth.authState.subscribe(
//       user => {
//         console.log("User is being updated!")
//         this.user = user
//         // Clear previous observers
//         this.favorites = undefined
//         if (user?.uid) {
//           // Fetch user’s remote data from firestore and update local observables
//           const userDocumentReference = this.store.collection('users').doc(user.uid)
//           // Assuming all of these collections conform to MovieItem interface
//           this.favorites = (
//             userDocumentReference.collection(
//               DataExtension.Favorites,
//               ref => ref.orderBy('title')
//             ).valueChanges() as Observable<IArticle[]>
//           ).pipe(tap(console.log))
//       }})
//     }
//   // Read
//   user?: firebase.User | null
//   favorites?: Observable<Array<IArticle>>
//   // Create
//   addToFavorites(item: IArticle) {
//     this.addToList(item, DataExtension.Favorites)
//   }
//   // Delete
//   removeFromFavorites(item: number | IArticle) {
//     this.removeItemFromList(item, DataExtension.Favorites)
//   }
//   // TODO: - Implement update (not needed at this point)
//   loginWithGoogle() {
//     this.handleErrorsOn(this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()))
//   }
//   // handleErrorsOn(arg0: any) {
//   //   throw new Error("Method not implemented.");
//   // }
//   logout() {
//     this.handleErrorsOn(this.afAuth.auth.signOut());
//   }
//   // Dont allow setting error text
//   get errorMessage(): string {
//     return this.errorText
//   }
//   private addToList(item: IArticle, list: DataExtension) {
//     console.log(`Attempting to add article with id ${item.id} to list ${list}`)
//     return this.handleErrorsOn(
//       new Promise(
//         (resolve, reject) => {
//           const currentUserId = this.user?.uid
//           if (!currentUserId) {
//             reject('User is not signed in!')
//             return
//           }
//           // TODO: - Add duplication protection
//           this.store
//             .collection('users')
//             .doc(currentUserId)
//             .collection(list)
//             .add(item)
//             .then(resolve, reject)
//         }
//       )
//     )
//   }
//   private removeItemFromList(item: number | IArticle, list: DataExtension) {
//     console.log(`Attempting to delete article ${item} from list ${list}`)
//     return this.handleErrorsOn(
//       new Promise(
//         (resolve, reject) => {
//           const currentUserId = this.user?.uid
//           if (!currentUserId) {
//             reject('User is not signed in!')
//             return
//           }
//           let itemId: number
//           if (typeof(item) == 'number') {
//             itemId = item
//           } else {
//             itemId = item.id
//           }
//           console.log('fetching articles with id ' + itemId)
//           this.store
//             .collection('users')
//             .doc(currentUserId)
//             .collection(list)
//             .ref.where('id', '==', itemId)
//             .get()
//             .then(
//               snapshot => {
//                 console.log(snapshot.docs)
//                 Promise.all(
//                   snapshot.docs.map(item => item.ref.delete())
//                 )
//                 .then(resolve)
//                 .catch(reject)
//               }
//             )
//             .catch(reject)
//         }
//       )
//     )
//   }
//   private handleErrorsOn(item: Promise<any>): Promise<any> {
//     return item
//     .catch(
//       error => {
//         console.log('There was an error: ' + error)
//         this.errorText = error
//       }
//     )
//   }
//   private errorText: string = ""
// }