import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { StorageService } from 'src/services/storage.service';
import { IArticle } from 'src/models/Article';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ArticleComponent implements OnInit, OnDestroy {

  articleData: IArticle;

  constructor(private storage: StorageService) {

  }

  ngOnInit() {
    this.articleData = this.storage.retrieveData() as IArticle;
    localStorage.setItem('isArticle', 'true');
  }

  ngOnDestroy() {
    localStorage.setItem('isArticle', 'false');
  }

}
