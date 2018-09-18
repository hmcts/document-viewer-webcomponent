import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfannotatorComponent } from './pdfannotator.component';

describe('PdfannotatorComponent', () => {
  let component: PdfannotatorComponent;
  let fixture: ComponentFixture<PdfannotatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfannotatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfannotatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
