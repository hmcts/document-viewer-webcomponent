import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})

export class AppComponent {
    title = 'Document Viewer Demo App';
    documentUrl: Observable<string>;
    documentTypeToShow = 'nonDM_PDF';

    constructor(private httpClient: HttpClient) {}

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {

      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');

      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('files', file, file.name);
      formData.append('classification', 'PUBLIC');

      this.documentUrl = this.httpClient.post<any>('/documents', formData, { headers })
        .pipe(
          map(resp => resp._embedded.documents['0']._links.self.href)
        );
    }
  }

  toggleDocumentSelection(selectedDocumentType: string) {
    this.documentTypeToShow = selectedDocumentType;
  }

  tabLinkStyle(documentType: string) {
    return `govuk-tabs__tab ${this.documentTypeToShow === documentType ? 'govuk-tabs__tab--selected' : ''}`;
  }
}
