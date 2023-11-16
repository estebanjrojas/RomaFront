import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleVentasDialogComponent } from './detalle-ventas-dialog.component';

describe('DetalleVentasDialogComponent', () => {
  let component: DetalleVentasDialogComponent;
  let fixture: ComponentFixture<DetalleVentasDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleVentasDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleVentasDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
