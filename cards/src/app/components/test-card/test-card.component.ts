import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TestCardDialogComponent } from './test-card-dialog/test-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { ITestCard, ITestCardDialogData, TestCard, TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-card/test-card';
import { TestCardFacade } from 'src/app/core/store/test-card/test-card.facade';



@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'cardItem';
  @Input() card?: ITestCard;

  constructor(private dialog: MatDialog, private testCardFacade: TestCardFacade) { }

  ngOnInit() {
    
  }


  addCard(card?: ITestCard) {
    const data: ITestCardDialogData = {
      ...card,
      status: card ? TestCardDialogDataStatuses.UPDATE_CARD : TestCardDialogDataStatuses.CREATE_CARD
    };

    const dialogRef = this.dialog.open(TestCardDialogComponent, {
      data
    });

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: ITestCard) => {

    });
  }

  deleteCard(e: Event, card: ITestCard) {
    e.stopPropagation();
    
    this.testCardFacade.removeSuccess$.pipe(take(1)).subscribe((id) => {
      console.log('deleted: ', id)
    });

    this.testCardFacade.removeFailure$.pipe(take(1)).subscribe(({ error, id }) => {
      console.error('Fail deleted: ', id , ', error: ', error);
    });

    this.testCardFacade.remove(card.id);

  }

  getDate() {
    console.log(new Date())
  }
}
