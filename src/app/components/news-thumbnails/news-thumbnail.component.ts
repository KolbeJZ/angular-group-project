import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { IArticle } from 'src/models/Article';
import { StorageService } from 'src/services/storage.service';
import { Router } from '@angular/router';
import { FirebaseLoginService} from 'src/services/firebaseLogin';

@Component({
  selector: 'app-news-thumbnail',
  templateUrl: './news-thumbnail.component.html',
  styleUrls: ['./news-thumbnail.component.css']
})
export class NewsThumbnailComponent {
  @Input() article: IArticle;

  @Input() selected: boolean;
  @Output() selectedChange = new EventEmitter<boolean>();

  constructor(private storage: StorageService,
              private router: Router,
              private db: FirebaseLoginService) {

  }

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
