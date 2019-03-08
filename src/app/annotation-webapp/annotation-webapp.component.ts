import {Component} from '@angular/core';

@Component({
    selector: 'app-annotation-webapp',
    templateUrl: './annotation-webapp.component.html'
})
export class AnnotationWebappComponent {

    documentTypeToShow: string = 'nonDM_PDF';

    constructor() {}

    toggleDocumentSelection(selectedDocumentType: string) {
      this.documentTypeToShow = selectedDocumentType;
    }
}
