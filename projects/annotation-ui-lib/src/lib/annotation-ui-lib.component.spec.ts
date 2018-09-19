import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationUiLibComponent } from './annotation-ui-lib.component';

describe('AnnotationUiLibComponent', () => {
  let component: AnnotationUiLibComponent;
  let fixture: ComponentFixture<AnnotationUiLibComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationUiLibComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationUiLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
