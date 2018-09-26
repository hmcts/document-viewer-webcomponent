import { DataFormat } from './api-data';
import { PdfData } from './pdf-data';

export class Mapper{
    comments: any[];
    annotations: any[];
    rectangles: any[];

    mapToApi(input: PdfData) {
        let output = new DataFormat();
        this.comments = [];
        this.annotations = [];

        // First get all the comments and put into friendly format
        input.annotationData.forEach(
            (annotation) => {
                if(annotation.class === 'Comment') {
                    let comment = new Object({
                        createdBy: null,
                        createdDate: null,
                        lastModifiedBy: null,
                        lastModifiedDate: null,
                        id: annotation.uuid,
                        annotationId: annotation.annotation,
                        content: annotation.content
                    }
                );
                this.comments.push(comment);
                }
        });

        // Then get all the annotations (highlights)
        input.annotationData.forEach(
            (annotation) => {

            // Check the if the highlight has any comments
            let annotationComments = [];
            this.comments.forEach(
                comments => {
                    if(comments.annotationId === annotation.uuid) {
                        annotationComments.push(comments);
                    }
                }
            )

            // Then get all the highlight rectangles
            if(annotation.class === 'Annotation') {
                this.rectangles = [];
                annotation.rectangles.forEach(
                    rectangle => {
                        let newRectangle = new Object({
                            createdBy: null,
                            createdDate: null,
                            lastModifiedBy: null,
                            lastModifiedDate: null,
                            id: null, 
                            x: rectangle.x,
                            y: rectangle.y,
                            width: rectangle.width,
                            height: rectangle.height,
                        });
                    this.rectangles.push(newRectangle);
                });

                // Then create the complete annotation object for the document
                this.annotations.push({
                    createdBy: null,
                    createdDate: null,
                    lastModifiedBy: null,
                    lastModifiedDate: null,
                    id: annotation.uuid,
                    page: annotation.page,
                    x: null,
                    y: null,
                    width: null,
                    height: null,
                    annotationSetId: null,
                    comments: annotationComments,
                    rectangles: this.rectangles,
                    type: annotation.type
                })
            };
        });

        return {
            createdBy: null,
            createdDate: null,
            lastModifiedBy: null,
            lastModifiedDate: null,
            id: 1202,
            documentId: null,
            annotations: this.annotations
        };
    }
}