import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCitaFisioterapiaComponent } from './add-update-cita-fisioterapia.component';

describe('AddUpdateCitaFisioterapiaComponent', () => {
  let component: AddUpdateCitaFisioterapiaComponent;
  let fixture: ComponentFixture<AddUpdateCitaFisioterapiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCitaFisioterapiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCitaFisioterapiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
