import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EdoctaPage } from './edocta.page';

describe('EdoctaPage', () => {
  let component: EdoctaPage;
  let fixture: ComponentFixture<EdoctaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EdoctaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EdoctaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
