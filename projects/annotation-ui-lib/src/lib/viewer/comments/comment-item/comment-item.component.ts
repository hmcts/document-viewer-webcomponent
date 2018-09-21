import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { AnnotationService } from '../../services/annotation.service';
import { Comment } from '../../../model/comment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss']
})
export class CommentItemComponent implements OnInit {

  @Input() comment;
  @Input() selectedAnnotationId;
  @Input() annotation;
  
  @Output() commentSubmitted: EventEmitter<any> = new EventEmitter<any>();
  @Output() commentSelected: EventEmitter<String> = new EventEmitter<String>();

  @ViewChild("commentTextField") commentTextField: ElementRef;
  @ViewChild("annotationIdField") annotationIdField: ElementRef;
  @ViewChild("commentItem") commentItem: NgForm;

  model = new Comment(null, null, null, null, null, null);

  constructor(private annotationService: AnnotationService, private render: Renderer2) { }

  ngOnInit() {
  }

  // handleEditComment() {
	// 	alert("did something");
  // }
  
  onSubmit() {  
    let comment: Comment;
    comment = this.annotationService.convertFormToComment(this.commentItem);
    comment.modifiedDate = new Date();

    this.annotationService.editComment(
      comment,
      function() {});

    this.commentSubmitted.emit(this.annotation);
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
