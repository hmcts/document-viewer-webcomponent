import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PdfService } from './pdf.service';
import { v4 as uuid } from 'uuid';
import { Annotation, Comment, IAnnotation, IAnnotationSet } from './annotation-set.model';
import { PdfAdapter } from './pdf-adapter';
import { ConfigService } from 'src/app/config.service';

declare const PDFAnnotate: any;

@Injectable()
export class AnnotationStoreService {

  constructor(private pdfAdapter: PdfAdapter,
              private pdfService: PdfService,
              private httpClient: HttpClient,
              private configService: ConfigService) {   
  }

  preLoad(annotationData: IAnnotationSet) {
    if(annotationData != null) {
      this.pdfAdapter.setStoreData(annotationData);
      PDFAnnotate.setStoreAdapter(this.pdfAdapter.getStoreAdapter());
    }else{
      PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());
    }
  }

  fetchData(dmDocumentId): Observable<HttpResponse<IAnnotationSet>> {
    const url = `${this.configService.config.api_base_url}/api/em-anno/annotation-sets/${dmDocumentId}`;
    return this.httpClient.get<IAnnotationSet>(url, { observe: 'response'}).pipe(
          catchError((err) => { 
          if( err instanceof HttpErrorResponse ) {
              switch(err.status) {
                  case 400: {
                      return Observable.throw(err.error);
                  }
                  case 404: {
                      return this.httpClient.post<IAnnotationSet>(`${this.configService.config.api_base_url}/api/em-anno/annotation-sets`, 
                      {
                        documentId: dmDocumentId, 
                        id: uuid()
                      }, { observe: 'response'}
                    );
                  }
                  case 500:{
                      return Observable.throw(new Error('Internal server error: ' + err));
                  }
             };
          };
    }));
  };

  deleteAnnotationApi(annotation: Annotation): Observable<HttpResponse<IAnnotation>> {
    const url = `${this.configService.config.api_base_url}/api/em-anno/annotations/${annotation.id}`;
    return this.httpClient.delete<IAnnotation>(url, { observe: 'response' });
  }

  saveAnnotationApi(annotation: Annotation): Observable<HttpResponse<IAnnotation>> {
    const url = `${this.configService.config.api_base_url}/api/em-anno/annotations`;
    return this.httpClient.post<IAnnotation>(url, annotation, { observe: 'response' });
  }

  saveData() {
    let loadedData: IAnnotationSet;
    let tempAnnotations: IAnnotation[];
    let toKeepAnnotations: IAnnotation[];
    let toRemoveAnnotations: IAnnotation[];

    loadedData = this.pdfAdapter.annotationSet;
    tempAnnotations = loadedData.annotations;

    toKeepAnnotations = tempAnnotations
          .filter((annotation: IAnnotation) => this.pdfAdapter.annotations.includes(annotation));

    toRemoveAnnotations = tempAnnotations
          .filter((annotation: IAnnotation) => !this.pdfAdapter.annotations.includes(annotation));

    tempAnnotations = toKeepAnnotations;

    tempAnnotations.forEach((annotation: Annotation) => {
      this.saveAnnotationApi(annotation).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    });

    toRemoveAnnotations.forEach((annotation: Annotation) => {
      this.deleteAnnotationApi(annotation).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    });

    this.pdfAdapter.annotationSet = loadedData;
  }

  clearAnnotations() {
    if (confirm('Are you sure you want to clear annotations?')) {
      this.pdfAdapter.annotations = [];
      this.pdfService.render();
    }
  }

  editComment(comment: Comment){
      this.pdfAdapter.editComment(comment);
  }

  getAnnotationById(annotationId: string): Promise<Annotation> {
		return new Promise<Annotation>((resolve) => {
      this.getAnnotation(
        annotationId, 
        annotation => {
          resolve(annotation);
        })
      });
	}

  getAnnotationsForPage(pageNumber): Promise<Annotation[]> {
    return new Promise<Annotation[]>((resolve) => {
      this.getAnnotations(
        pageNumber,
        pageData => {
          resolve(pageData);
        })
    });
  }

  getCommentsForAnnotation(annotationId): Promise<Comment[]> {
    return new Promise<Comment[]>((resolve) => {
      this.getComments(
        annotationId, 
        comments => {
          resolve(comments);
        });
    });
  }

  getAnnotation(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
      .getAnnotation(this.pdfService.getRenderOptions().documentId, annotationId)
      .then(callback);
  }

  getComments(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
      .getComments(this.pdfService.getRenderOptions().documentId, annotationId)
      .then(callback);
  }

  addComment(comment: Comment ) {
    PDFAnnotate.getStoreAdapter()
      .addComment(this.pdfService.getRenderOptions().documentId, comment.annotationId, comment.content)
      .then();
  }

  getAnnotations(pageNumber: number, callback) {
    PDFAnnotate.getStoreAdapter()
      .getAnnotations(this.pdfService.getRenderOptions().documentId, pageNumber)
      .then(callback);
  }

  deleteComment(commentId: string) {
    PDFAnnotate.getStoreAdapter()
      .deleteComment(this.pdfService.getRenderOptions().documentId, commentId)
      .then();
  }
}
