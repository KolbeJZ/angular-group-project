import { Component, Input, ViewEncapsulation } from '@angular/core';
import { IArticle } from 'src/models/Article';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category-thumbnail',
  templateUrl: './category-thumbnail.component.html',
  styleUrls: ['./category-thumbnail.component.css']
})
export class CategoryThumbnailComponent {
  @Input() article: IArticle;

  constructor(private storage: StorageService,
              private router: Router) {

  }

  onMoreClick(article: IArticle) {
    this.storage.storeData(article);
    this.router.navigate(['/article']);
  }
}
