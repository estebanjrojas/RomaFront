import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimientoDiarioChartComponent } from './rendimiento-diario-chart.component';

describe('RendimientoDiarioChartComponent', () => {
  let component: RendimientoDiarioChartComponent;
  let fixture: ComponentFixture<RendimientoDiarioChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RendimientoDiarioChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RendimientoDiarioChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
