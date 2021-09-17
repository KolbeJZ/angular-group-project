import { Component, ApplicationRef } from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/services/news.service';
import { StorageService } from 'src/services/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {

  constructor(private router: Router,
              private newsService: NewsService,
              private storage: StorageService) {
    localStorage.setItem('country', 'us');
  }


  isDisabled() {
    return localStorage.getItem('isArticle') === 'true';
  }

  changeCountry(country: string) {
    const url = this.router.url;

    if (url === '/news') {
      this.newsService.getTopNews();
    }
    if (url === '/categories') {
      this.newsService.updateAllCategories();
    }
    if (url.startsWith('/expand')) {
      this.newsService.getNewsByCategoryNonPaged(url.split('/expand/')[1]);
    }
    if (url === '/search') {
      this.newsService.searchQuery(this.storage.retrieveQueryString());
    }
  }

}
