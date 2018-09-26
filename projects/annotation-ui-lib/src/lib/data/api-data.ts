export class DataFormat {
    public createdBy: string;
    public createdDate: string;
    public lastModifiedBy: string;
    public lastModifiedDate: string;
    public id: string;
    public documentId: string;
    public annotations: [{
        createdBy: string,
        createdDate: string,
        lastModifiedBy: string,
        lastModifiedDate: string,
        id: string, 
        page: number,
        x: number,
        y: number,
        width: number,
        height: number,
        annotationSetId: number,
        comments: [{
            createdBy: string,
            createdDate: string,
            lastModifiedBy: string,
            lastModifiedDate: string,
            id: string, 
            content: string,
            annotationId: number
        }],
        rectangles: [{
            createdBy: string,
            createdDate: string,
            lastModifiedBy: string,
            lastModifiedDate: string,
            id: string, 
            x: number,
            y: number,
            width: number,
            height: number,
            annotationSetId: number
        }],
        type: any
        }
    ];
}