import { Component, OnInit } from '@angular/core';
import { IArticle } from 'src/models/Article';
import { NewsService } from 'src/services/news.service';

@Component({
  templateUrl: './categories.component.html'
})
export class CategoriesComponent implements OnInit {

  constructor(private newsService: NewsService) {

  }

  ngOnInit() {

  }

  getCountry() {
    return localStorage.getItem('country');
  }

}
