import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { IArticle } from 'src/models/Article';
import { NewsService } from 'src/services/news.service';
import { SubjectProvider } from 'src/services/subject-provider.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  @Input() category: string;
  articles: IArticle[];
  sliceIndexStart: number;
  sliceIndexEnd: number;
  slice: IArticle[];

  constructor(private newsService: NewsService,
              private subjectProvider: SubjectProvider) {

  }

  ngOnInit() {
    this.newsService.getNewsByCategory(this.category);
    this.subjectProvider.getObservable(this.category).subscribe(
      (data) => {
        this.articles = data;
        this.sliceIndexStart = 0;
        this.sliceIndexEnd = 3;
        this.slice = this.articles.slice(this.sliceIndexStart, this.sliceIndexEnd);
      }
    );

  }

  onClickLeft() {
    this.sliceIndexStart -= 1;
    this.sliceIndexEnd -= 1;
    this.slice = this.articles.slice(this.sliceIndexStart, this.sliceIndexEnd);
  }

  onClickRight() {
    this.sliceIndexStart += 1;
    this.sliceIndexEnd += 1;
    this.slice = this.articles.slice(this.sliceIndexStart, this.sliceIndexEnd);
  }

}
