import { Component, ApplicationRef, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { NewsService } from 'src/services/news.service';
import { StorageService } from 'src/services/storage.service';
import { FirebaseLoginService } from 'src/services/firebaseLogin';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  
})
export class NavbarComponent implements OnInit{
  logged = false;
  current$;
  constructor(private router: Router,
              private newsService: NewsService,
              private storage: StorageService,
              private db: FirebaseLoginService) {
    localStorage.setItem('country', 'us');
  }

  ngOnInit() {
    // this.db.userData$.subscribe(res => {
    //   console.log('waht',res)
    // })
    console.log('wat', this.db.userData$)
    if(JSON.parse(localStorage.getItem('user'))) {
      this.logged = true;
      this.current$ = JSON.parse(localStorage.getItem('user'));
      // this.current = this.db.userData$;
    } else {

    }
  }
  isDisabled() {
    return localStorage.getItem('isArticle') === 'true';
  }
  get currentUser() {
    return JSON.parse(localStorage.getItem('user'));
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
  navigate(str) {
    this.router.navigate([str]);
  }

  signOut() {
    this.logged = false;
    this.db.signOut();
  }
  signIn() {

    this.db.signIn();
    this.db.userData$.subscribe((res)=> {
      this.current$ = res;
      this.router.navigate(['/profile'])
    });
    this.logged = true;
    
    

  }
}
