
import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { TestCardDialogComponent } from './test-card-dialog/test-card-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { NoOptionals, TestCardService } from '../../services/test-card.service';
import { ITestCard, ITestCardDialogData, TestCard, TestCardDialogData, TestCardDialogDataStatuses } from 'src/app/models/test-card/test-card';
import { TestCardStatuses } from 'src/app/core/store/state/test-card.state';


@Component({
  selector: 'app-test-card',
  templateUrl: './test-card.component.html',
  styleUrls: ['./test-card.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestCardComponent implements OnInit {
  @HostBinding('attr.class') cssClass = 'cardItem';
  @Input() card?: ITestCard;

  constructor(private dialog: MatDialog, private testCardService: TestCardService) { }

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

    dialogRef.afterClosed().pipe(take(1)).subscribe((result: TestCardStatuses) => {

    });
  }

  deleteCard(e: Event, card: ITestCard) {
    e.stopPropagation();
    this.testCardService.deleteCard(card);
    
  }

  getDate() {
    console.log(new Date())
  }
}
