export class DataFormat {
    public createdBy: string;
    public createdDate: string;
    public lastModifiedBy: string;
    public lastModifiedDate: string;
    public id: number;
    public documentId: string;
    public annotations: [{
        createdBy: string,
        createdDate: string,
        lastModifiedBy: string,
        lastModifiedDate: string,
        id: number, 
        page: number,
        x: number,
        y: number,
        width: number,
        height: number,
        annotationSetId: number
        }
    ];
    public comments: [{
        createdBy: string,
        createdDate: string,
        lastModifiedBy: string,
        lastModifiedDate: string,
        id: number, 
        content: string,
        annotationId: number
    }];
    public rectangles: [{
        createdBy: string,
        createdDate: string,
        lastModifiedBy: string,
        lastModifiedDate: string,
        id: number, 
        x: number,
        y: number,
        width: number,
        height: number,
        annotationSetId: number
    }];
    public type: any
}