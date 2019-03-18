import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemarcationsPage } from './demarcations.page';

describe('DemarcationsPage', () => {
  let component: DemarcationsPage;
  let fixture: ComponentFixture<DemarcationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemarcationsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemarcationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
