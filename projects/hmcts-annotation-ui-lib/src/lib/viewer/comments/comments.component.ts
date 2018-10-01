import { Component, OnInit, ViewChild, Renderer2, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AnnotationService } from '../services/annotation.service';
import { AnnotationStoreService } from '../services/annotation-store.service';

declare const PDFAnnotate: any;

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: []
})
export class CommentsComponent implements OnInit {
  selectedAnnotationId: string;

  annotations;
  pageNumber: number;
  subscription: Subscription;
  
  @ViewChild("commentList") commentList: ElementRef;
  @ViewChild("commentForm") commentForm: ElementRef;
  @ViewChild("commentText") commentText: ElementRef;

  	constructor(private annotationStoreService: AnnotationStoreService,
				private annotationService: AnnotationService,
				private render: Renderer2, 
				private ref: ChangeDetectorRef) { 
			
	}

  	ngOnInit() {
		this.pageNumber = 1;
		this.showAllComments();

		this.subscription = this.annotationService.getPageNumber().subscribe(
			pageNumber => {
				this.pageNumber = pageNumber;
				this.showAllComments();
			});
	  };

	ngAfterViewInit() {
		document.querySelector('#viewer').addEventListener('click', this.handleAnnotationBlur.bind(this));
		PDFAnnotate.UI.addEventListener('annotation:click', this.handleAnnotationClick.bind(this));
	}

	ngOnDestroy() {
		//this.subscription.unsubscribe();
	}

	showAllComments() {
		this.annotationStoreService.getAnnotationsForPage(this.pageNumber).then(
			(pageData: any) => {
				
				let annotations = pageData.annotations.slice();
				this.sortByY(annotations);
				
				annotations.forEach(element => {
					this.getAnnotationComments(element);
				});
				this.annotations = annotations;
			});
	}
	
	sortByY(annotations) {
		annotations.sort(
			function(a, b){
				var keyA = a.rectangles[0].y,
					keyB = b.rectangles[0].y;
				if(keyA < keyB) return -1;
				if(keyA > keyB) return 1;
				return 0;
		});
	}

	getAnnotationCommentsById(annotationId) {
		this.annotationStoreService.getAnnotationById(annotationId).then(
			annotation => {
				this.annotations = this.getAnnotationComments(annotation);
			});
	}

	getAnnotationComments(annotation) {
		annotation.comments = [];
		this.annotationStoreService.getCommentsForAnnotation(annotation.id).then(
			comments => {
				annotation.comments = comments;
			});
	}

	handleAnnotationBlur() {
			this.selectedAnnotationId = null;
			this.showAllComments();
			this.addHighlightedCommentStyle(null);
	}

	supportsComments(target) {
		var type = target.getAttribute('data-pdf-annotate-type');
		return ['point', 'highlight', 'area'].indexOf(type) > -1;
	}

	handleAnnotationClick(event) {
		if (this.supportsComments(event)) {
			this.selectedAnnotationId = event.getAttribute('data-pdf-annotate-id');
			this.addHighlightedCommentStyle(this.selectedAnnotationId);
			this.ref.detectChanges();
		};
	}

	addHighlightedCommentStyle(linkedAnnotationId) {
		const idPageSelector = '#pageContainer' + this.pageNumber;
		const annotations = Array.from(document.querySelector(idPageSelector+' .annotationLayer').childNodes);

		annotations.forEach(annotation => {
			this.render.removeClass(annotation,"comment-selected");
			const annotationId = (<HTMLInputElement>annotation).dataset.pdfAnnotateId;
			if (annotationId === linkedAnnotationId) {
				this.render.addClass(annotation, "comment-selected");
			};
		});
	}
}
