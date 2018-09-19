import { Component, ViewChild, Input, OnChanges, Output, EventEmitter } from '@angular/core';
import { Comment } from '../comment';
import { NgForm } from '@angular/forms';
import { AnnotationService } from '../../services/annotation.service';


@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['../comments.component.scss']
})
export class CommentFormComponent implements OnChanges {

  @ViewChild("commentForm") commentForm: NgForm;
	
  @Input() selectedAnnotationId;
  @Input() authorId;

  @Output() commentSubmitted: EventEmitter<string> = new EventEmitter<string>();
   
  model = new Comment(null, null, null, null, null, null);
  constructor(private annotationService: AnnotationService) {
  }

  ngOnChanges() {
    this.model = new Comment(null, this.authorId, this.commentForm.value.comment, this.selectedAnnotationId, new Date(), null);
  }

  onSubmit() {
    this.annotationService.addComment(
			this.model,
      function() {});
      
    this.commentSubmitted.emit(this.model.annotationId);
    this.commentForm.reset();
    this.model = new Comment(null, null, null, null, null, null);
  }

  get diagnostic() { return JSON.stringify(this.model); }
}
