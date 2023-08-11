import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITestCard } from 'src/app/models/test-card/test-card';
import { TestCardFacade } from 'src/app/core/store/test-card/test-card.facade';

@Component({
  selector: 'app-test-cards',
  templateUrl: './test-cards.component.html',
  styleUrls: ['./test-cards.component.css'],
})
export class TestCardsComponent implements OnInit {

  cards$: Observable<ITestCard[]>;

  constructor(public testCardFacade: TestCardFacade) {
    this.cards$ = this.testCardFacade.testCards$;
  }

  ngOnInit() {
    this.testCardFacade.load();
  }
}
