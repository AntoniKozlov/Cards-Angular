import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ITestCard } from 'src/app/models/test-card/test-card';



@Component({
  selector: 'app-test-cards-grid',
  templateUrl: './test-cards-grid.component.html',
  styleUrls: ['./test-cards-grid.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardsGridComponent implements OnInit {

  @Input() cards?: ITestCard[] | null;

  constructor() {
    
  }

  ngOnInit() {

  }

  getDate() {
    console.log('home: ', new Date())
  }
}
