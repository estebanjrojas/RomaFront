import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantillaBaseBusquedaComponent } from './plantilla-base-busqueda.component';

describe('PlantillaBaseBusquedaComponent', () => {
  let component: PlantillaBaseBusquedaComponent;
  let fixture: ComponentFixture<PlantillaBaseBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlantillaBaseBusquedaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlantillaBaseBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
