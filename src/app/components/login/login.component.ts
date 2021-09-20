import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from 'src/services/firebaseLogin';
import { DataBaseService } from 'src/services/data-base.service';

@Component({
  selector: 'app-login',
  // templateUrl: './login.component.html',
  template: "<button (click)='firebase.signIn()'>Login</button>",
  styleUrls: ['./login.component.css'],
  providers: [FirebaseLoginService]
})
export class LoginComponent implements OnInit {

  constructor(public firebase: FirebaseLoginService,
    private db: DataBaseService) { }

  ngOnInit() {
    this.db.getSingle();
  }

}
