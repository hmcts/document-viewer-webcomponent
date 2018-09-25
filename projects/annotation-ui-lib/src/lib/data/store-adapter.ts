import { DataFormat } from "./api-data";

declare const PDFAnnotate: any;

export class PdfAdapter {

    getStoreAdapter(data) {

        const annotationSet = <DataFormat>JSON.parse(data.annotationData);

        let getAnnotations = (documentId, pageNumber) => {
            return new Promise((resolve, reject) => {
                console.log(annotationSet.annotations);
                resolve(annotationSet.annotations);
            }); 
        };

        let getComments = (documentId, annotationId) => {
            return new Promise(function(resolve, reject) {
                resolve(annotationSet.comments);
            });
        };

        let getAnnotation = (documentId, annotationId) => {
            return new Promise(function(resolve, reject) {
                resolve(annotationSet.comments);
            });
        };

        let addAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise(function(resolve, reject) {
                console.log(documentId);
                resolve(annotationSet.comments);
            });
        };

        let editAnnotation = (documentId, pageNumber, annotation) => {
            return new Promise(function(resolve, reject) {
                resolve(annotationSet.comments);
            });
        };

        let deleteAnnotation = (documentId, annotationId) => {
            return new Promise(function(resolve, reject) {
                resolve(annotationSet.comments);
            });
        };

        let addComment = (documentId, annotationId, content) => {
            return new Promise(function(resolve, reject) {
                resolve(annotationSet.comments);
            });
        };

        let deleteComment = (documentId, commentId) => {
            return new Promise(function(resolve, reject) {
                resolve(annotationSet.comments);
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