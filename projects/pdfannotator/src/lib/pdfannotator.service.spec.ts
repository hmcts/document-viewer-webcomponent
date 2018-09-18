import { TestBed, inject } from '@angular/core/testing';

import { PdfannotatorService } from './pdfannotator.service';

describe('PdfannotatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PdfannotatorService]
    });
  });

  it('should be created', inject([PdfannotatorService], (service: PdfannotatorService) => {
    expect(service).toBeTruthy();
  }));
});
