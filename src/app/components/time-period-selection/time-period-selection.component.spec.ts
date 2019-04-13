import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodSelectionPage } from './time-period-selection.page';

describe('TimePeriodSelectionPage', () => {
  let component: TimePeriodSelectionPage;
  let fixture: ComponentFixture<TimePeriodSelectionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimePeriodSelectionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimePeriodSelectionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
