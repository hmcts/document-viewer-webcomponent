import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { TransferState } from '@angular/platform-browser';
import { CookieService } from 'ngx-cookie';
import { DocumentViewerWrapperComponent } from './document-viewer-wrapper.component';
import { DocumentViewerModule } from '@hmcts/document-viewer-webcomponent';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DocumentViewerModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: [
        AppComponent, DocumentViewerWrapperComponent
      ],
      providers: [TransferState, CookieService]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'Document Viewer Demo App'`, async(() => {
    const component = fixture.debugElement.componentInstance;
    expect(component.title).toEqual('Document Viewer Demo App');
  }));

  it('should set document url when file is uploaded', async(() => {

    const httpMock = TestBed.get(HttpTestingController);
    let fileList = new DataTransfer();
    fileList.items.add(new File(['upload-document'], 'filename'));

    app.fileChange({ target: { files: fileList.files }});

    app.documentUrl.subscribe(resp => {
      expect(resp).toEqual('document-url');
    });

    const req = httpMock.expectOne('/documents');
    expect(req.request.method).toEqual('POST');
    req.flush({ _embedded: { documents: [{ _links: { self: { href: 'document-url'}}}] }});

    httpMock.verify();
  }));

  it('should not set document url when no file is added', () => {
    app.fileChange({ target: { files: [] }});

    expect(app.documentUrl).toBe(undefined);
  });

  it('should toggle selection', () => {
    app.toggleDocumentSelection('selectedType');

    expect(app.documentTypeToShow).toBe('selectedType');
  });

  it('should set tab link style', () => {
    const tabLinkStyle = app.tabLinkStyle('nonDM_PDF');

    expect(tabLinkStyle).toBe('govuk-tabs__tab govuk-tabs__tab--selected');
  });

  it('should set tab link style', () => {
    const tabLinkStyle = app.tabLinkStyle('other type');

    expect(tabLinkStyle).toBe('govuk-tabs__tab ');
  });
});
