import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddUpdateCitaOculistaComponent } from './add-update-cita-oculista.component';

describe('AddUpdateCitaOculistaComponent', () => {
  let component: AddUpdateCitaOculistaComponent;
  let fixture: ComponentFixture<AddUpdateCitaOculistaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUpdateCitaOculistaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddUpdateCitaOculistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
