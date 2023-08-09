import { GetTestCards } from './../../core/store/actions/test-card.action';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TestCardFacade } from 'src/app/core/store/facades/test-card/test-card.facade';
import { ITestCard } from 'src/app/models/test-card/test-card';


@Component({
  selector: 'app-test-cards',
  templateUrl: './test-cards.component.html',
  styleUrls: ['./test-cards.component.css'],
})
export class TestCardsComponent implements OnInit {

  cards$: Observable<ITestCard[]>;

  constructor(public testCardFacade: TestCardFacade) {
    this.cards$ = this.testCardFacade.selectTestCardData$;
  }

  ngOnInit() {
    this.testCardFacade.dispatch(new GetTestCards());
  }
}
