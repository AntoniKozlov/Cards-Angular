import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { concatMap, map, Observable, of, publishReplay, refCount, ReplaySubject, scan, share, shareReplay, Subject, switchMap, switchMapTo, tap } from 'rxjs';
import { TestCard, TestCardDialogData, TestCardDialogDataStatuses } from '../models/test-cards/test-cards';


export type NoOptionals<T> = {
  [K in keyof T]-?: T[K];
};

interface ITestCardOperation extends Function {
  (testCards: TestCard[]): TestCard[];
}

@Injectable()
export class TestCardService {
  addCard$: Subject<TestCard> = new Subject<TestCard>();
  initCards$: Subject<void> = new Subject<void>();
  
  updateCard$: Subject<TestCard> = new Subject<TestCard>();
  deleteCard$: Subject<TestCard> = new Subject<TestCard>();

  create$: Subject<TestCard> = new Subject<TestCard>();
  updates$: Subject<ITestCardOperation> = new Subject<ITestCardOperation>();

  cards$: ReplaySubject<TestCard[]> = new ReplaySubject<TestCard[]>(1);

  initialCards: TestCard[] = [];

  constructor(private http: HttpClient) {
    this.updates$
      .pipe(
        scan(
          (cards: TestCard[], operation: any) => {
            return operation(cards);
          },
        this.initialCards),
      ).subscribe(this.cards$)

    this.create$
      .pipe(
        map((card: TestCard) => {
          return (cards: TestCard[]) => {
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
        map((card: TestCard) => {
          return (cards: TestCard[]) => {
            const existingCardIndex = cards.findIndex(existingCard => existingCard.id == card.id);

            if (existingCardIndex !== -1) {
              cards.splice(existingCardIndex, 1, {
                  ...cards[existingCardIndex],
                  name: card.name, 
                  description: card.description
                }
              );
            }

            return [...cards];
          };
        }),
      )
      .subscribe(this.updates$);

    this.deleteCard$
      .pipe(
        map((card: TestCard) => {
          return (cards: TestCard[]) => {
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

  addCard(card: TestCard): void {
    this.addCard$.next(card);
  }

  initCards(): void {
    this.initCards$.next();
  }

  updateCard(card: TestCard): void {
    this.updateCard$.next(card);
  }

  deleteCard(card: TestCard): void {
    this.deleteCard$.next(card);
  }
  

  getCardsFromServer(): Observable<TestCard[]> {
    return new Observable((observer) => {
      observer.next([
        {id: 1, name: 'Anton', description: 'Blablablabalabl ablablablal', date: new Date()},
        {id: 2, name: 'Boris', description: 'Blab22lablabalabl ablablablal', date: new Date()},
      ]);
    });
  }

  addOrUpdateCard(card: NoOptionals<TestCardDialogData>): void {
    const { status: _, ...testCard } = card;

    this[card.status == TestCardDialogDataStatuses.UPDATE_CARD ? 'updateCard' : 'addCard'](
      testCard
    );
  }

  get generateId(): number {
    return Math.floor(Math.random() * 100);
  }

  get newDate(): Date {
    return new Date();
  }
  
}
