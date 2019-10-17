import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExistenciasPage } from './existencias.page';

describe('ExistenciasPage', () => {
  let component: ExistenciasPage;
  let fixture: ComponentFixture<ExistenciasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExistenciasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExistenciasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
