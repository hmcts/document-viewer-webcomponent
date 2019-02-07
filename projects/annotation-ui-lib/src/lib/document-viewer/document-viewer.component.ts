import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {ViewerAnchorDirective} from './viewer-anchor.directive';
import {DocumentViewerService} from './document-viewer.service';
import { ViewerFactoryService } from '../viewers/viewer-factory.service';
import { UrlFixerService } from '../data/url-fixer.service';
import { EmLoggerService } from '../logging/em-logger.service';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent implements OnChanges, OnInit {

    @ViewChild(ViewerAnchorDirective) viewerAnchor: ViewerAnchorDirective;
    @Input() url = '';
    @Input() annotate: boolean;
    @Input() baseUrl: string;
    @Input() isDM: boolean;
    @Input() contentType: string;

    viewerComponent: any;
    error: HttpErrorResponse;

    constructor(private log: EmLoggerService,
                private viewerFactoryService: ViewerFactoryService,
                private urlFixer: UrlFixerService,
                private documentViewerService: DocumentViewerService) {
        log.setClass('DocumentViewerComponent');
    }

    ngOnInit(): void {
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes.url || changes.annotate) {
          this.buildViewer();
        }
    }

    async buildViewer() {
        if (!this.url) {
            this.log.error('url is required argument');
            throw new Error('url is required argument');
        }
        if (this.isDM) {
          this.getDocumentMetadata().subscribe(response => {

            this.log.info(response);
            if (response && response._links) {
              const url = this.urlFixer.fixDm(response._links.binary.href, this.baseUrl);
              const annotationSet = this.getAnnotationSet(response);

              this.viewerComponent =
                this.viewerFactoryService.buildComponent(this.viewerAnchor.viewContainerRef, this.pdfWorker,
                  response.mimeType, url, this.baseUrl, response._links.self.href, this.annotate, annotationSet);
            }
          }, err => {
            this.log.error('An error has occured while fetching document' + err);
            this.error = err;
          });
        } else {
          this.viewerComponent = this.viewerFactoryService.buildComponent(this.viewerAnchor.viewContainerRef,
            this.contentType, this.url, this.baseUrl, this.url, this.annotate, null);
        }
    }

    getDocumentMetadata() {
      return this.documentViewerService.fetch(`${this.urlFixer.fixDm(this.url, this.baseUrl)}`);
    }

    getAnnotationSet(response) {
      const dmDocumentId = this.viewerFactoryService.getDocumentId(response);
      this.viewerFactoryService.getAnnotationSet(this.baseUrl, dmDocumentId).subscribe((annoSetResponse) => {
        return annoSetResponse.body;
      });
    }
}
