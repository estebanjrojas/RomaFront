import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartVentasDiariasComponent } from './chart-ventas-diarias.component';

describe('ChartVentasDiariasComponent', () => {
  let component: ChartVentasDiariasComponent;
  let fixture: ComponentFixture<ChartVentasDiariasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChartVentasDiariasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartVentasDiariasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
