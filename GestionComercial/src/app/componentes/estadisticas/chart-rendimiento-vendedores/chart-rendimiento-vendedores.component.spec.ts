import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartRendimientoVendedoresComponent } from './chart-rendimiento-vendedores.component';

describe('ChartRendimientoVendedoresComponent', () => {
  let component: ChartRendimientoVendedoresComponent;
  let fixture: ComponentFixture<ChartRendimientoVendedoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartRendimientoVendedoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartRendimientoVendedoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
