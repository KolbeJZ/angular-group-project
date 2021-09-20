import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore'

import { AppComponent } from './app.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsThumbnailComponent } from './components/news-thumbnails/news-thumbnail.component';
import { NavbarComponent } from './components/nav/navbar.component';
import { NewsService } from 'src/services/news.service';
import { NewsListResolver } from 'src/services/news-list-resolver.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from 'src/routes';
import { ArticleComponent } from './components/article/article.component';
import { StorageService } from 'src/services/storage.service';
import { AddTokenInterceptor } from 'src/services/interceptors/http-interceptor';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoryListComponent } from './components/categories/category-list.component';
import { SubjectProvider } from 'src/services/subject-provider.service';
import { CategoryThumbnailComponent } from './components/category-thumbnails/category-thumbnail.component';
import { ExpandCategoryComponent } from './components/categories/expand-category.component';
import { SearchComponent } from './components/search/search.component';
import { LoginComponent } from './components/login/login.component';
import { FirebaseLoginService } from 'src/services/firebaseLogin';
import { AngularFireAuth } from 'angularfire2/auth';
import { ProfileComponent } from './components/profile/profile.component';

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [
    AppComponent,
    NewsListComponent,
    NewsThumbnailComponent,
    NavbarComponent,
    ArticleComponent,
    CategoriesComponent,
    CategoryListComponent,
    CategoryThumbnailComponent,
    ExpandCategoryComponent,
    SearchComponent,
    LoginComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(
      appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [
    NewsService,
    NewsListResolver,
    StorageService,
    { provide: HTTP_INTERCEPTORS, useClass: AddTokenInterceptor, multi: true },
    SubjectProvider,
    FirebaseLoginService,
    AngularFireAuth
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
