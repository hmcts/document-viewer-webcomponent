import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotationResolver } from './annotation-resolver';

describe('AppResolverComponent', () => {
  let component: AnnotationResolver;
  let fixture: ComponentFixture<AnnotationResolver>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotationResolver ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotationResolver);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
