import {Component} from '@angular/core';

@Component({
    selector: 'app-annotation-webapp',
    templateUrl: './annotation-webapp.component.html'
})
export class AnnotationWebappComponent {

  dmDocumentSelected: boolean = false;

    constructor() {
    }

    toggleDocumentSelection() {
      this.dmDocumentSelected = !this.dmDocumentSelected;
    }
}
