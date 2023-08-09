import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of, publishReplay, refCount, ReplaySubject, scan, share, shareReplay, Subject, switchMap, switchMapTo, tap } from 'rxjs';
import { ITestCard, ITestCardDialogData, TestCard, TestCardDialogDataStatuses } from '../models/test-card/test-card';
import { generateId } from '../shared/utils';



export type NoOptionals<T> = {
  [K in keyof T]-?: T[K];
};

interface ITestCardOperation extends Function {
  (testCards: ITestCard[]): ITestCard[];
}

@Injectable({
  providedIn: 'root'
})
export class TestCardService {
  addCard$: Subject<ITestCard> = new Subject<ITestCard>();
  initCards$: Subject<void> = new Subject<void>();
  
  updateCard$: Subject<ITestCard> = new Subject<ITestCard>();
  deleteCard$: Subject<ITestCard> = new Subject<ITestCard>();

  create$: Subject<ITestCard> = new Subject<ITestCard>();
  updates$: Subject<ITestCardOperation> = new Subject<ITestCardOperation>();

  cards$: ReplaySubject<ITestCard[]> = new ReplaySubject<ITestCard[]>(1);

  initialCards: ITestCard[] = [];

  constructor(private http: HttpClient) {
    this.updates$
      .pipe(
        scan(
          (cards: ITestCard[], operation: any) => {
            return operation(cards);
          },
        this.initialCards),
      ).subscribe(this.cards$)

    this.create$
      .pipe(
        map((card: ITestCard) => {
          return (cards: ITestCard[]) => {
            return cards.concat(card);
          };
        }),
      )
      .subscribe(this.updates$)

    this.addCard$
      .subscribe(this.create$);

    this.initCards$
      .pipe(
        switchMap(() => this.getCardsFromServer()),
        concatMap((val) => val),
      )
      .subscribe(this.create$);

    this.updateCard$
      .pipe(
        map((card: ITestCard) => {
          return (cards: ITestCard[]) => {
            const existingCardIndex = cards.findIndex(existingCard => existingCard.id == card.id);

            if (existingCardIndex !== -1) {
              const updatedCard = new TestCard(card.name, card.description, card.id, card.date);
              cards.splice(existingCardIndex, 1, updatedCard);
            }

            return [...cards];
          };
        }),
      )
      .subscribe(this.updates$);

    this.deleteCard$
      .pipe(
        map((card: ITestCard) => {
          return (cards: ITestCard[]) => {
            const existingCardIndex = cards.findIndex(existingCard => existingCard.id == card.id);

            if (existingCardIndex !== -1) {
              cards.splice(existingCardIndex, 1);
            }
            return [...cards];
          }
        })
      )
      .subscribe(this.updates$);
  }

  addCard(card: ITestCard): void {
    this.addCard$.next(card);
  }

  initCards(): void {
    this.initCards$.next();
  }

  updateCard(card: ITestCard): void {
    this.updateCard$.next(card);
  }

  deleteCard(card: ITestCard): void {
    this.deleteCard$.next(card);
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

  addOrUpdateCard(card: NoOptionals<ITestCardDialogData>): void {
    const { status: _, ...testCard } = card;

    this[card.status == TestCardDialogDataStatuses.UPDATE_CARD ? 'updateCard' : 'addCard'](
      testCard
    );
  }
  
}
