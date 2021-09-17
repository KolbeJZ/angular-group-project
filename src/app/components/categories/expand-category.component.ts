import { Component, OnInit } from '@angular/core';
import { NewsService } from 'src/services/news.service';
import { ActivatedRoute } from '@angular/router';
import { IArticle } from 'src/models/Article';

@Component({
  selector: 'app-news-list',
  templateUrl: './expand-category.component.html'
})
export class ExpandCategoryComponent implements OnInit {

  topNews: IArticle[];
  category: string;

  constructor(private newsService: NewsService,
              private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category');
      this.newsService.getNewsByCategoryNonPaged(this.category);
      this.newsService.selectedCategoryChanges$.subscribe(
        (data) => {
          this.topNews = data;
        }
      );
    });
  }

  getCountry() {
    return localStorage.getItem('country');
  }

}
