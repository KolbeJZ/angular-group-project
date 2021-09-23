import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IArticle } from 'src/models/Article';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';
import { FirebaseLoginService} from 'src/services/firebaseLogin';

@Component({
  selector: 'app-category-thumbnail',
  templateUrl: './category-thumbnail.component.html',
  styleUrls: ['./category-thumbnail.component.css']
})
export class CategoryThumbnailComponent {
  @Input() article: IArticle;

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();
  user: any;

  constructor(private storage: StorageService,
              private router: Router,
              private db: FirebaseLoginService) {

  }
  // addToFavorites(item: IArticle) {
  //   this.user.addToFavorites(item)
  // }

  onMoreClick(article: IArticle) {
    this.storage.storeData(article);
    this.router.navigate(['/article']);
  }

  public toggleSelected(article: IArticle) {
    this.selected = !this.selected;
    this.selectedChange.emit(this.selected);
    if(this.selected) {
      this.db.like(article.url);
    } else {
      this.db.delete(article.url);
    }
  }
}
