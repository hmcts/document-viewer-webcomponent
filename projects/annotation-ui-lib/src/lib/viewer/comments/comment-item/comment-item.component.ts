import { Component, OnInit, Input, Output, EventEmitter, Renderer2, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AnnotationService } from '../../services/annotation.service';
import { Comment } from '../../../model/comment';

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

  focused: boolean;

  model = new Comment(null, null, null, null, null, null, null);

  constructor(private annotationService: AnnotationService, private render: Renderer2) { }

  ngOnInit() {
    this.focused = false;
  }
  
  onSubmit() {  
    let comment: Comment;
    comment = this.convertFormToComment(this.commentItem);
    comment.lastModifiedDate = new Date();

    this.annotationService.editComment(
      comment,
      function() {});

    this.commentSubmitted.emit(this.annotation);
  }

  onFocus() {
    this.focused = true;
  }

  onBlur() {
    setTimeout(() => {
      this.removeCommentSelectedStyle();
      this.focused = false;
    }, 200);
  }

  convertFormToComment(commentForm: NgForm) {
    return new Comment(
      commentForm.value.commentId, 
      commentForm.value.createdBy, 
      null,
      commentForm.value.content, 
      commentForm.value.annotationId,
      null,
      null
      );
  }

	handleDeleteComment(event, commentId, annotationId) {
		this.annotationService.deleteComment(
			commentId,
      function() {});

      console.log("delete called");
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
