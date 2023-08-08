import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TestCardService } from 'src/app/services/test-card.service';
import { TestCard } from '../../models/test-cards/test-cards';

@Component({
  selector: 'app-test-cards',
  templateUrl: './test-cards.component.html',
  styleUrls: ['./test-cards.component.css'],
  providers: [TestCardService],
})
export class TestCardsComponent implements OnInit {

  cards$: Observable<TestCard[]>;

  constructor(public testCardService: TestCardService) {
    this.cards$ = this.testCardService.cards$;
  }

  ngOnInit() {
    this.testCardService.initCards();
  }
}
