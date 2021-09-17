import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { API_KEY } from 'src/config/apiKeys';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const jsonReq: HttpRequest<any> = req.clone({
      setHeaders: {
        'X-API-KEY' : API_KEY
      }
    });

    return next.handle(jsonReq);
  }

}
