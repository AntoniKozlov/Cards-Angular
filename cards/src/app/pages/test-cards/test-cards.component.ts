import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ITestCard } from 'src/app/models/test-card/test-card';
import { TestCardService } from 'src/app/services/test-card.service';


@Component({
  selector: 'app-test-cards',
  templateUrl: './test-cards.component.html',
  styleUrls: ['./test-cards.component.css'],
  providers: [TestCardService],
})
export class TestCardsComponent implements OnInit {

  cards$: Observable<ITestCard[]>;

  constructor(public testCardService: TestCardService) {
    this.cards$ = this.testCardService.cards$;
  }

  ngOnInit() {
    this.testCardService.initCards();
  }
}
