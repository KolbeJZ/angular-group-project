import { NewsListComponent } from './app/components/news-list/news-list.component';
import { ArticleComponent } from './app/components/article/article.component';
import { CategoriesComponent } from './app/components/categories/categories.component';
import { ExpandCategoryComponent } from './app/components/categories/expand-category.component';
import { SearchComponent } from './app/components/search/search.component';
import { LoginComponent } from './app/components/login/login.component';
import { ProfileComponent } from './app/components/profile/profile.component';
import { GuardService } from './services/guard.service';
import { MostLikedComponent } from './app/components/most-liked/most-liked.component';

export const appRoutes = [
  { path: 'news', component: NewsListComponent },
  { path: 'article', component: ArticleComponent },
  { path: 'mostLiked', component: MostLikedComponent},
  { path: 'categories', component: CategoriesComponent },
  { path: 'expand/:category', component: ExpandCategoryComponent},
  { path: 'search', component: SearchComponent },
  { path: "login", component: LoginComponent},
  { path: 'profile', component: ProfileComponent, 
  canActivate:[GuardService]
},
  { path: '', redirectTo: '/news', pathMatch: 'full' }
];
