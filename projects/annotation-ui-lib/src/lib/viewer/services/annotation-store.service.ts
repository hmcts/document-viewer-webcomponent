import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment } from '../../model/comment';
import { AnnotationService } from './annotation.service';
import { Observable, Subject } from 'rxjs';
declare const PDFAnnotate: any;

@Injectable()
export class AnnotationStoreService {

  constructor(private http: HttpClient,
              private annotationService: AnnotationService) { }

  annotationSetId: number;

  getAnnotationById(annotationId: any): any {
		var promise = new Promise((resolve, error) => {
      this.getAnnotation(
        annotationId, 
        annotation => {
          resolve(annotation);
        })
      }
    );
    return promise;
	}

  getAnnotationsForPage(pageNumber) {
    var promise = new Promise((resolve, error) => {
      this.getAnnotations(pageNumber,
        pageData => {
          resolve(pageData);
        })
    });
    return promise;
  }

  getCommentsForAnnotation(annotationId) {
    var promise = new Promise((resolve, error) => {
      this.getComments(
        annotationId, 
        comments => {
          comments.forEach(element => {
              element.createdDate = this.getCommentDate(annotationId);
              element.author = this.getCommentAuthor(annotationId);
          });
          resolve(comments);
        }
      );
    });
    return promise;
  }

  getCommentDate(annotationId) {
    return new Date();
  }

  getCommentAuthor(annotationId) {
    return "test author";
  }

  getAnnotation(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .getAnnotation(this.annotationService.getRenderOptions().documentId, annotationId)
		.then(callback);
  }

  getComments(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .getComments(this.annotationService.getRenderOptions().documentId, annotationId)
		.then(callback);
  }

  addComment(comment: Comment, callback ) {
    PDFAnnotate.getStoreAdapter()
		.addComment(this.annotationService.getRenderOptions().documentId, comment.annotationId, comment.content)
		.then(callback);
  }

  getAnnotations(pageNumber: number, callback) {
    PDFAnnotate.getStoreAdapter()
		.getAnnotations(this.annotationService.getRenderOptions().documentId, pageNumber)
		.then(callback);
  }
}
