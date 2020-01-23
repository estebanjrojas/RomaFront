import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizacionVentasComponent } from './visualizacion-ventas.component';

describe('VisualizacionVentasComponent', () => {
  let component: VisualizacionVentasComponent;
  let fixture: ComponentFixture<VisualizacionVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizacionVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizacionVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
