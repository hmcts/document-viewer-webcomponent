import { Component, OnInit, ViewChild, ElementRef, Inject, OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollEvent } from 'ngx-scroll-event';
import { DOCUMENT } from '@angular/common';
import { AnnotationService } from '../services/annotation.service';
import { AnnotationStoreService } from '../services/annotation-store.service';
import { Viewer } from '../../viewer';

@Component({
  selector: 'app-viewer',
  templateUrl: './viewer.component.html',
  styleUrls: ['./viewer.component.scss'],
  providers: []
})

export class ViewerComponent implements OnInit, OnChanges, Viewer {
  renderedPages: {};
  url: string;
  originalUrl: string;
	annotate: boolean;
  page: number;
  numPages: number;
  pageChanged;
  prevPage;
  nextPage;
  tool: String;

  @ViewChild("contentWrapper") contentWrapper: ElementRef;

  constructor(private annotationStoreService: AnnotationStoreService,
              private annotationService: AnnotationService, 
              private route: ActivatedRoute,
              private router: Router, 
              @Inject(DOCUMENT) private document: any) {

		this.route.queryParams.subscribe(
      params => {
        if (params.url) {
          this.url = params.url;
        }else {
          let error = "Please provide a url for your PDF. For debugging, copy your PDF into the root assets folder and reference it like http://localhost:4200?url=/assets/example.pdf.";
          this.router.navigate(['error', error],  {relativeTo: this.route});
        }
    });
  }

  ngOnInit() {
    // From resolver
    this.route.data.subscribe((data) => {
      this.annotationService.annotationData = data;
      this.annotationService.preRun();
    });


    this.annotationService.setRenderOptions({
      documentId: this.url,
      pdfDocument: null,
      scale: parseFloat("1.33"),
      rotate: parseInt(localStorage.getItem(this.url + '/rotate'), 10) || 0
    });

    this.renderedPages = {};
    this.annotationService.render();

    this.page = 1;
    this.annotationService.setPageNumber(1);
    this.tool = 'cursor';
  }

  ngOnChanges() {
    
  }

  getClickedPage(event) {
    let currentParent = event.target;
    for (let step = 0; step < 5; step++) {
        const pageNumber = currentParent.parentNode.getAttribute('data-page-number');
        if (pageNumber != null) {
          this.annotationService.setPageNumber(parseInt(pageNumber));
          break;
        };
      currentParent = currentParent.parentNode;
    }
    this.tool = 'cursor';
  }

	handlePdfScroll(event: ScrollEvent) {
    
    const element = event.originalEvent.currentTarget as HTMLInputElement;
		const visiblePageNum = Math.round(element.scrollTop / 1056) + 1; // Hardcoded page height as 1056
    const visiblePage = this.document.querySelector('.page[data-page-number="' + visiblePageNum + '"][data-loaded="false"]');

		if (visiblePage && !this.renderedPages[visiblePageNum]) {
			// Prevent invoking UI.renderPage on the same page more than once.
        this.renderedPages[visiblePageNum] = true;
        setTimeout(this.annotationService.renderPage(visiblePageNum));
    }
    if (this.page != visiblePageNum) {
      this.page = visiblePageNum;
      if (!isNaN(visiblePageNum)) {
        this.annotationService.setPageNumber(visiblePageNum);
      }
    }
  }
}
