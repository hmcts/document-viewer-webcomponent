import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferState } from '@angular/platform-browser';
import { CookieModule, CookieService } from 'ngx-cookie';
import { DocumentViewerWrapperComponent } from './document-viewer-wrapper.component';
import { DocumentViewerModule } from '@hmcts/document-viewer-webcomponent';
describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DocumentViewerModule,
        RouterTestingModule,
        CookieModule.forRoot()
      ],
      declarations: [DocumentViewerWrapperComponent],
      providers: [TransferState, CookieService]
    }).compileComponents();
  }));

  it('should create the document viewer wrapper', async(() => {
    const fixture = TestBed.createComponent(DocumentViewerWrapperComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
