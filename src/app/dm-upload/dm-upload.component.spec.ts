import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DmUploadComponent } from './dm-upload.component';

describe('DmUploadComponent', () => {
  let component: DmUploadComponent;
  let fixture: ComponentFixture<DmUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DmUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DmUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
