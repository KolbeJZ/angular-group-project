import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataBaseService } from 'src/services/data-base.service';
import { FirebaseLoginService } from 'src/services/firebaseLogin';
import { IArticle } from 'src/models/Article';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  // template: `<div>{{ tester$[0].name }}</div>
  // <button (click)='this.dataService.like('test url')>Add Url to database</button>`,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  tester$: any;
  likes: any;
  favorites: IArticle[];
  constructor(private dataService: FirebaseLoginService) { }

  ngOnInit() { 
   let dbCall = this.dataService.getLikes().subscribe(
     (res: any) => {
       this.favorites = res.favorites;
       console.log(res.favorites, this.favorites);
     }
   )
  //  this.dataService.subscribe((res) => {
  //   this.likes = res;
  //   console.log("these are the favorites",this.likes, res.favorites)
  //   // console.log('res',res, 'compo obser', this.tester$);
  // });

  }

}