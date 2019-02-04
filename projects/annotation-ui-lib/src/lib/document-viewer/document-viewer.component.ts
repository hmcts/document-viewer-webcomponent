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

    mimeType: string;
    docName: string;
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
          this.buildComponent();
        }
    }

    buildComponent() {
        if (!this.url) {
            this.log.error('url is required argument');
            throw new Error('url is required argument');
        }
        if (this.isDM) {
          this.getDocumentMetadata().subscribe(resp => {

            this.log.info(resp);
            if (resp && resp._links) {
              this.docName = resp.originalDocumentName;
              this.viewerComponent =
                this.viewerFactoryService.buildDMViewer(resp, this.annotate,
                  this.viewerAnchor.viewContainerRef, this.baseUrl);
            }
          }, err => {
            this.log.error('An error has occured while fetching document' + err);
            this.error = err;
          });
        } else {
          this.viewerComponent = this.viewerFactoryService.buildNonDMViewer(this.contentType, this.viewerAnchor.viewContainerRef,
            this.url, this.baseUrl, this.annotate);
        }
    }

    getDocumentMetadata() {
      return this.documentViewerService.fetch(`${this.urlFixer.fixDm(this.url, this.baseUrl)}`);
    }
}
