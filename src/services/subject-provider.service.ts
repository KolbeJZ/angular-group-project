import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class SubjectProvider {

  private technologySubject = new Subject<any>();
  private businessSubject = new Subject<any>();
  private sportSubject = new Subject<any>();
  private entertainmentSubject = new Subject<any>();
  private scienceSubject = new Subject<any>();
  private generalSubject = new Subject<any>();
  private healthSubject = new Subject<any>();

  private observables = {
    technology: this.technologySubject.asObservable(),
    business: this.businessSubject.asObservable(),
    science: this.scienceSubject.asObservable(),
    sport: this.sportSubject.asObservable(),
    entertainment: this.entertainmentSubject.asObservable(),
    general: this.generalSubject.asObservable(),
    health: this.healthSubject.asObservable()
  };

  private subjects = {
    technology: this.technologySubject,
    business: this.businessSubject,
    science: this.scienceSubject,
    sport: this.sportSubject,
    entertainment: this.entertainmentSubject,
    general: this.generalSubject,
    health: this.healthSubject
  };

  getObservable(category): Observable<any> {
    return this.observables[category];
  }

  getSubject(category): Subject<any> {
    return this.subjects[category];
  }
}
