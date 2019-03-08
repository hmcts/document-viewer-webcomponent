import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import {ViewerAnchorDirective} from './viewer-anchor.directive';
import {DocumentViewerService} from './document-viewer.service';
import { ViewerFactoryService } from '../viewers/viewer-factory.service';
import { UrlFixerService } from '../data/url-fixer.service';
import { EmLoggerService } from '../logging/em-logger.service';
import {AnnotationStoreService} from '../data/annotation-store.service';

@Component({
    selector: 'app-document-viewer',
    templateUrl: './document-viewer.component.html'
})
export class DocumentViewerComponent implements OnChanges, OnInit {

    @ViewChild(ViewerAnchorDirective) viewerAnchor: ViewerAnchorDirective;
    @Input() url = '';
    @Input() annotate = false;
    @Input() baseUrl = '';
    @Input() isDM = true;
    @Input() contentType: string;
    @Input() rotate = false;

    viewerComponent: any;
    error: HttpErrorResponse;

    constructor(private log: EmLoggerService,
                private viewerFactoryService: ViewerFactoryService,
                private annotationStoreService: AnnotationStoreService,
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

    buildViewer() {
        if (!this.url) {
            this.log.error('url is required argument');
            throw new Error('url is required argument');
        }
        if (this.isDM) {
          this.documentViewerService.getDocumentMetadata(`${this.urlFixer.fixDm(this.url, this.baseUrl)}`).subscribe(metadata => {

            this.log.info(metadata);
            if (metadata && metadata._links) {
              const url = this.urlFixer.fixDm(metadata._links.binary.href, this.baseUrl);
              const dmDocumentId = this.viewerFactoryService.getDocumentId(metadata);
              if (this.annotate) {
                this.annotationStoreService.getAnnotationSet(this.baseUrl, dmDocumentId).subscribe(annotationSet => {
                  this.buildComponent(metadata, url, annotationSet.body);
                });
              } else {
                this.buildComponent(metadata, url, null);
              }
            }
          }, err => {
            this.log.error('An error has occured while fetching document' + err);
            this.error = err;
          });
        } else {
          this.viewerComponent = this.viewerFactoryService.buildComponent(this.viewerAnchor.viewContainerRef,
            this.contentType, this.url, this.baseUrl, this.url, this.annotate, null, this.rotate);
        }
    }

    buildComponent(metadata, url, annotationSet?) {
      this.viewerFactoryService.buildComponent(this.viewerAnchor.viewContainerRef,
        metadata.mimeType, url, this.baseUrl, metadata._links.self.href, this.annotate, annotationSet, this.rotate);
    }

}
