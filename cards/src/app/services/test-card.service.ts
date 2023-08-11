import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of, publishReplay, refCount, ReplaySubject, scan, share, shareReplay, Subject, switchMap, switchMapTo, tap } from 'rxjs';
import { ITestCard, ITestCardDialogData, TestCard, TestCardDialogDataStatuses } from '../models/test-card/test-card';
import { generateId } from '../shared/utils';



export type NoOptionals<T> = {
  [K in keyof T]-?: T[K];
};

@Injectable({
  providedIn: 'root'
})
export class TestCardService {

  constructor(private http: HttpClient) {
  }
  

  getCardsFromServer(): Observable<ITestCard[]> {
    return new Observable((observer) => {
      const data: ITestCard[] = [
        new TestCard('Anton', 'Blablablabalabl  df df  df dfdfablablablal  df df dfBla blablabalabl a df df df blablablal Blablablabalabl ablablablal Blablablabalabl ablablablal Blablablabalabl ablablablal blabalabl ablablablal Blablablabalabl ablablabla', 1, new Date()),
        new TestCard('Boris', 'Blab22lablabalabl ablablablal', 2, new Date()),
      ];

      observer.next(data);
    });
  }

  addCardServer(card: ITestCard): Observable<ITestCard> {
    return new Observable((observer) => {
      const newCard = new TestCard(card.name, card.description, generateId(), card.date);
      observer.next(newCard);
    });
  }

  updateCardServer(card: ITestCard): Observable<ITestCard> {
    return new Observable((observer) => {
      const newCard = new TestCard(card.name, card.description, card.id, card.date);
      observer.next(newCard);
    });
  }

  deleteCardServer(id: number): Observable<number> {
    return new Observable((observer) => {
      observer.next(id);
    });
  }
  
}
