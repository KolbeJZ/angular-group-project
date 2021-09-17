import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IArticle } from 'src/models/Article';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news-thumbnail',
  templateUrl: './news-thumbnail.component.html',
  styleUrls: ['./news-thumbnail.component.css']
})
export class NewsThumbnailComponent {
  @Input() article: IArticle;

  constructor(private storage: StorageService,
              private router: Router) {

  }

  onMoreClick(article: IArticle) {
    this.storage.storeData(article);
    this.router.navigate(['/article']);
  }
}
