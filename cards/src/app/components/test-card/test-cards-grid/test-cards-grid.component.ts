import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TestCard } from 'src/app/models/test-cards/test-cards';


@Component({
  selector: 'app-test-cards-grid',
  templateUrl: './test-cards-grid.component.html',
  styleUrls: ['./test-cards-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardsGridComponent implements OnInit {

  @Input() cards?: TestCard[] | null;

  constructor() {
    
  }

  ngOnInit() {

  }

  getDate() {
    console.log('home: ', new Date())
  }
}
