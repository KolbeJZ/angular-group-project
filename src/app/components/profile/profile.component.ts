import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseService } from 'src/services/data-base.service';
import { FirebaseLoginService } from 'src/services/firebaseLogin';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  // template: `<div>{{ tester$[0].name }}</div>
  // <button (click)='this.dataService.like('test url')>Add Url to database</button>`,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tester$: any;
  constructor(private dataService: FirebaseLoginService) { }

  ngOnInit() {
   this.dataService.getSingle().subscribe((res) => {
    this.tester$ = res;
    // console.log('res',res, 'compo obser', this.tester$);
  });

  }

}
