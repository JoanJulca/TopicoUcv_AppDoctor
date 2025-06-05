import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainPPage } from './main-p.page';

describe('MainPPage', () => {
  let component: MainPPage;
  let fixture: ComponentFixture<MainPPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
