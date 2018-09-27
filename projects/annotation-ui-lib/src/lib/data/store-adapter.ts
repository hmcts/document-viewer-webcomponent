import { v4 as uuid } from 'uuid';

declare const PDFAnnotate: any;

export class PdfAdapter {
    data: any;
    commentData: any[];

    setStoreData(data) {
        this.data = data.annotations;
        this.commentData = [];
        this.data.forEach(annotation => {
            annotation.comments.forEach(comment => {
                this.commentData.push(comment);
            }); 
        });
    }

    updateAnnotations(documentId, annotations) {
        const newAnnotation = annotations[annotations.length-1];
        console.log(newAnnotation);
        // this.data.push(newAnnotation);
        // console.log(this.data);
        // PDFAnnotate.setStoreAdapter(this.getStoreAdapter());
    }

    updateComments(documentId, comment) {
        this.commentData.push(comment);
        console.log(this.commentData);
    }

    _getAnnotations(documentId) {
        return this.data || [];
    }

    _getComments(documentId) {
        return this.commentData || [];
    }

    getStoreAdapter() {
        
        let getAnnotations = (documentId, pageNumber) => {
            return new Promise((resolve, reject) => {
                // console.log(this.data);
                var annotations = this._getAnnotations(documentId).filter(function (i) {
                    return i.page === pageNumber && i.class === 'Annotation';
                  });
                resolve({
                    documentId: documentId,
                    pageNumber: pageNumber,
                    annotations: annotations
                  });
            }); 
        };

        let getComments = (documentId, annotationId) => {
            return new Promise((resolve, reject) => {
                resolve(this._getComments(documentId).filter(function (i) {
                    return i.annotationId === annotationId;
                  }));
            });
        };

        let getAnnotation = (documentId, annotationId) => {
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        let addAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise((resolve, reject) => {

                annotation.class = 'Annotation';
                annotation.uuid = uuid();
                annotation.page = pageNumber;
      
                var annotations = this._getAnnotations(documentId);
                annotations.push(annotation);
                this.updateAnnotations(documentId, annotations);
      
                resolve(annotation);
            });
        };

        let editAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        let deleteAnnotation = (documentId, annotationId) => {
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        let addComment = (documentId, annotationId, content) => {
            return new Promise((resolve, reject) => {
                var comment = {
                    class: 'Comment',
                    uuid: uuid(),
                    annotationId: annotationId,
                    content: content
                  };

 
                this.updateComments(documentId, comment);
                        // this.updateAnnotations(documentId, comment);
                resolve(comment);
                    
            });
        };

        let deleteComment = (documentId, commentId) => {
            return new Promise(function(resolve, reject) {
                resolve(this.data.comments);
            });
        };

        return new PDFAnnotate.StoreAdapter({
            getAnnotations,
            getComments,
            getAnnotation,
            addAnnotation,
            editAnnotation,
            deleteAnnotation,
            addComment,
            deleteComment
        })
    }
}