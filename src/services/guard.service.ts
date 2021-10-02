import { Injectable } from '@angular/core';
import {CanActivate} from '@angular/router';
import { FirebaseLoginService } from 'src/services/firebaseLogin';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{
  canActivate() {
    
   
    if(JSON.parse(localStorage.getItem('user'))) {
      console.log('route is activated');
      return true;
    } else {
      console.log('route not activated');
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
  constructor(private login: FirebaseLoginService, private router: Router) { }
}
