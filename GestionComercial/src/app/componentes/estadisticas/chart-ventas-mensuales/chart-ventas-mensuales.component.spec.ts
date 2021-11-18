import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVentasMensualesComponent } from './chart-ventas-mensuales.component';

describe('ChartVentasMensualesComponent', () => {
  let component: ChartVentasMensualesComponent;
  let fixture: ComponentFixture<ChartVentasMensualesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVentasMensualesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVentasMensualesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
