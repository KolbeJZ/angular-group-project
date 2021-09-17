import { Component } from '@angular/core';
import { NewsService } from 'src/services/news.service';
import { IArticle } from 'src/models/Article';
import { StorageService } from 'src/services/storage.service';

@Component({
  templateUrl: './search.component.html',
  styles: [`input { width: 500px; }`]
})
export class SearchComponent {

  query;
  searchResults: IArticle[];

  constructor(private newsService: NewsService,
              private storage: StorageService) {

  }

  onSearch(object) {
    this.storage.storeQueryString(object.query);
    this.newsService.searchQuery(object.query);
    this.newsService.selectedSearchChanges$.subscribe(
      (data) => this.searchResults = data
    );
  }

  getCountry() {
    return localStorage.getItem('country');
  }
}
