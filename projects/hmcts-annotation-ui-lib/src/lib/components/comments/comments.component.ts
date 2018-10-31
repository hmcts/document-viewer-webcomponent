import { Component, OnInit, Renderer2, ChangeDetectorRef, AfterViewInit, OnDestroy, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import {Subscription} from 'rxjs';
import {PdfService} from '../../data/pdf.service';
import {AnnotationStoreService} from '../../data/annotation-store.service';
import { Annotation } from '../../data/annotation-set.model';

declare const PDFAnnotate: any;

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
    providers: []
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {

    dataLoadedSub: Subscription;
    selectedAnnotationId: string;
    annotations: [Annotation];
    pageNumber: number;
    pageNumSub: Subscription;
    annotationSub: Subscription;

    constructor(private annotationStoreService: AnnotationStoreService,
                private pdfService: PdfService,
                private render: Renderer2,
                private ref: ChangeDetectorRef,
                @Inject(DOCUMENT) private document: any) {
    }

    ngOnInit() {
        this.dataLoadedSub = this.pdfService.getDataLoadedSub().subscribe(isDataLoaded => {
            if (isDataLoaded) {
                this.preRun();
            }
        });
    }

    preRun() {
        this.pageNumber = 1;
        this.showAllComments();

        this.annotationSub = this.pdfService.getAnnotationClicked().subscribe(
            annotationId => {
                this.selectedAnnotationId = annotationId;
                this.addHighlightedCommentStyle(annotationId);
            });

        this.pageNumSub = this.pdfService.getPageNumber().subscribe(
            pageNumber => {
                this.pageNumber = pageNumber;
                if (!this.selectedAnnotationId) {
                    this.showAllComments();
                }
            });
    }

    ngAfterViewInit() {
        this.document.querySelector('#viewer').addEventListener('click', this.handleAnnotationBlur.bind(this));
        PDFAnnotate.UI.addEventListener('annotation:click', this.handleAnnotationClick.bind(this));
    }

    ngOnDestroy() {
        this.ref.detach();
        if (this.pageNumSub) {
            this.pageNumSub.unsubscribe();
        }
        if (this.dataLoadedSub) {
            this.dataLoadedSub.unsubscribe();
        }
    }

    showAllComments() {
        // todo - refactor this out of component
        this.annotationStoreService.getAnnotationsForPage(this.pageNumber).then(
            (pageData: any) => {
                const annotations = pageData.annotations.slice();
                this.sortByY(annotations);
                this.annotations = annotations;
            });
    }

    sortByY(annotations) {
        annotations.sort(
            function (a, b) {
                const keyA = a.rectangles[0].y,
                    keyB = b.rectangles[0].y;
                if (keyA < keyB) { return -1; }
                if (keyA > keyB) { return 1; }
                return 0;
            });
    }

    handleAnnotationBlur() {
        this.selectedAnnotationId = null;
        this.showAllComments();
        this.addHighlightedCommentStyle(null);
        this.annotationStoreService.setToolBarUpdate(null, null);
    }

    handleAnnotationClick(event) {
            this.selectedAnnotationId = event.getAttribute('data-pdf-annotate-id');
            this.annotationStoreService.getAnnotationById(this.selectedAnnotationId).then(
                (annotation: Annotation) => {
                    this.annotationStoreService.setCommentFocusSubject(annotation);
                    this.annotationStoreService.setToolBarUpdate(annotation, true);
                });

            this.addHighlightedCommentStyle(this.selectedAnnotationId);
            if (!this.ref['destroyed']) {
                this.ref.detectChanges();
            }
    }

    addHighlightedCommentStyle(linkedAnnotationId) {
        const annotations = Array.from(this.document.querySelector(`#pageContainer${this.pageNumber} .annotationLayer`).childNodes);

        annotations.forEach(annotation => {
            this.render.removeClass(annotation, 'comment-selected');
            const annotationId = (<HTMLInputElement>annotation).dataset.pdfAnnotateId;
            if (annotationId === linkedAnnotationId) {
                this.render.addClass(annotation, 'comment-selected');
            }
        });
    }
}