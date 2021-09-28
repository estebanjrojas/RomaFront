import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrediccionesHomeComponent } from './predicciones-home.component';

describe('PrediccionesHomeComponent', () => {
  let component: PrediccionesHomeComponent;
  let fixture: ComponentFixture<PrediccionesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrediccionesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrediccionesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
