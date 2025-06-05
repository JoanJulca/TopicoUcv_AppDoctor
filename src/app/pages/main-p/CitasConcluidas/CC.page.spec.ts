import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CCPage } from './CC.page';

describe('CCPage', () => {
  let component: CCPage;
  let fixture: ComponentFixture<CCPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CCPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
