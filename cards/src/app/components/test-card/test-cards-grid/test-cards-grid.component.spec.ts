/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { TestCardsGridComponent } from './test-cards-grid.component';

describe('TestCardsGridComponent', () => {
  let component: TestCardsGridComponent;
  let fixture: ComponentFixture<TestCardsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestCardsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestCardsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
