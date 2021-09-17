import { Injectable } from '@angular/core';
import { Observable, of, Subject, forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, map } from 'rxjs/operators';
import { IArticle } from 'src/models/Article';
import { SubjectProvider } from './subject-provider.service';

@Injectable()
export class NewsService {
  constructor(private http: HttpClient,
              private subjectProvider: SubjectProvider) {

  }

  private articlesSource = new Subject<IArticle[]>();
  selectedArticlesChanges$ = this.articlesSource.asObservable();

  private categoriesSource = new Subject<any>();
  selectedCategoriesChanges$ = this.categoriesSource.asObservable();

  private categorySource = new Subject<any>();
  selectedCategoryChanges$ = this.categorySource.asObservable();

  private searchSource = new Subject<any>();
  selectedSearchChanges$ = this.searchSource.asObservable();

  getTopNews(): void {
    this.http.get('http://newsapi.org/v2/top-headlines?country=' + localStorage.getItem('country'))
      .pipe(catchError(this.handleError<any>('getEvents', []))
            , map(result => {
              this.articlesSource.next(result.articles);
            }))
      .subscribe();
  }

  updateAllCategories(): void {
    const categories = ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'];
    categories.map((category) => {
      this.getNewsByCategory(category);
    });
  }

  getNewsByCategoryNonPaged(category): void {
    this.http.get('http://newsapi.org/v2/top-headlines?country='
                      + localStorage.getItem('country')
                      + '&category=' + category)
        .pipe(map((result: any) => {
          this.categorySource.next(result.articles);
        })).subscribe();
  }

  getNewsByCategory(category): void {
    this.http.get('http://newsapi.org/v2/top-headlines?country='
                      + localStorage.getItem('country')
                      + '&category=' + category
                      + '&pageSize=5')
        .pipe(map((result: any) => {
          this.subjectProvider.getSubject(category).next(result.articles);
        })).subscribe();
  }

  searchQuery(query): void {
    this.http.get('http://newsapi.org/v2/top-headlines?country='
                      + localStorage.getItem('country')
                      + '&q=' + query)
        .pipe(map((result: any) => {
          this.searchSource.next(result.articles);
        })).subscribe();
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(error);
      return of(result as T);
    };
  }
}
