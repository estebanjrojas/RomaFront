import { TestBed } from '@angular/core/testing';

import { DetalleVentasDialogService } from './detalle-ventas-dialog.service';

describe('DetalleVentasDialogService', () => {
  let service: DetalleVentasDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleVentasDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
