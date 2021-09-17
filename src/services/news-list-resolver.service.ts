import { NewsService } from './news.service';
import { Resolve } from '@angular/router';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable()
export class NewsListResolver implements Resolve<any> {
  constructor(private newsService: NewsService) {

  }

  resolve() {
    return this.newsService.getTopNews();
  }
}
