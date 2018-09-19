import { TestBed, inject } from '@angular/core/testing';

import { AnnotationUiLibService } from './annotation-ui-lib.service';

describe('AnnotationUiLibService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnnotationUiLibService]
    });
  });

  it('should be created', inject([AnnotationUiLibService], (service: AnnotationUiLibService) => {
    expect(service).toBeTruthy();
  }));
});
