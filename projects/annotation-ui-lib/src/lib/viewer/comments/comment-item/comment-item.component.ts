import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild, Inject, AfterViewInit } from '@angular/core';
import { AnnotationService } from '../../services/annotation.service';
import { Comment } from '../comment';
import { NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { element } from 'protractor';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit, AfterViewInit {

  @Input() comment;
  @Output() commentSubmitted: EventEmitter<string> = new EventEmitter<string>();
  @Output() commentSelected: EventEmitter<String> = new EventEmitter<String>();

  // Draw line from here to annotation
  @Input() svg;
  @ViewChild("source") source: ElementRef;
  targetAnnotation: string;

  @ViewChild("commentTextField") commentTextField: ElementRef;
  @ViewChild("annotationIdField") annotationIdField: ElementRef;
  @ViewChild("commentItem") commentItem: NgForm;

  model = new Comment(null, null, null, null, null, null);

  constructor(
    private annotationService: AnnotationService, 
    private render: Renderer2) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.targetAnnotation = this.comment.annotation;
  }

  onSubmit() {  
    let comment: Comment;
    comment = this.annotationService.convertFormToComment(this.commentItem);
    comment.modifiedDate = new Date();

    this.annotationService.editComment(
      comment,
      function() {});

    this.commentSubmitted.emit(comment.annotationId);
  }

	handleDeleteComment(event, commentId, annotationId) {
		this.annotationService.deleteComment(
			commentId,
      function() {});
      
    this.commentSubmitted.emit(annotationId);
  }
  
  handleCommentClick (event) {
		this.removeCommentSelectedStyle();
    this.render.addClass(this.commentTextField.nativeElement, "comment-selected");
    
    this.commentSelected.emit(this.commentItem.value.annotationId);
  }

	removeCommentSelectedStyle() {
		let listItems = Array.from(document.querySelectorAll('#comment-wrapper .comment-list-item textarea'));
		listItems.forEach(item => {
			this.render.removeClass(item, "comment-selected")
		});
	}
}
