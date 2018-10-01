export class Comment {

    constructor(
      public id: string,
      public createdBy: string,
      public createdDate: Date,
      public content: string,
      public annotationId: string,
      public lastModifiedBy: string,
      public lastModifiedDate: Date
    ) {  }
  
  }