import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppResolverComponent } from './app-resolver.component';

describe('AppResolverComponent', () => {
  let component: AppResolverComponent;
  let fixture: ComponentFixture<AppResolverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppResolverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppResolverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
