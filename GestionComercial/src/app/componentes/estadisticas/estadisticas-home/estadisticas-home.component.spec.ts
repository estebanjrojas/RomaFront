import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadisticasHomeComponent } from './estadisticas-home.component';

describe('EstadisticasHomeComponent', () => {
  let component: EstadisticasHomeComponent;
  let fixture: ComponentFixture<EstadisticasHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstadisticasHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstadisticasHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
