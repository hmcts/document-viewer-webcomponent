import { Component, Input } from '@angular/core';

@Component({
  selector: 'document-viewer-wrapper',
  templateUrl: 'document-viewer-wrapper.component.html'
})
export class DocumentViewerWrapperComponent {

  @Input() documentTypeToShow: string;
  @Input() documentUrl: string;

  constructor() {}

  tabStyle(documentType: string) {
    return `govuk-tabs__panel ${this.documentTypeToShow !== documentType ? 'govuk-tabs__panel--hidden' : ''}`;
  }
}
