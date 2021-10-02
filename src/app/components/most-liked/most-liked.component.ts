import { Component, OnInit } from '@angular/core';
import { FirebaseLoginService } from 'src/services/firebaseLogin';
import {IArticle} from 'src/models/Article';
import { Subject } from 'rxjs';
import { switchMap, map } from 'rxjs/operators'
@Component({
  selector: 'app-most-liked',
  templateUrl: './most-liked.component.html',
  styleUrls: ['./most-liked.component.css']
})
export class MostLikedComponent implements OnInit {

  constructor(public db: FirebaseLoginService ) { }
  test$ = new Subject<string>();
  topNews: IArticle[];
  ngOnInit() {
    this.db.sort();
    this.db.sortChange$.subscribe(
      (res:any) => {
        console.log('hres is the sorting',res)
        this.topNews = res;
      }
    )
  
   
  }

}
