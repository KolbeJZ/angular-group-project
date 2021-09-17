import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'src/models/Article';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html'
})
export class NewsListComponent implements OnInit {

  topNews: IArticle[];

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.newsService.getTopNews();
    this.newsService.selectedArticlesChanges$.subscribe(
      data => this.topNews = data
    );
  }

  getCountry() {
    return localStorage.getItem('country');
  }

}
