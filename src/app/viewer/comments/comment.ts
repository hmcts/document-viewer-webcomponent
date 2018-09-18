export class Comment {

    constructor(
      public id: string,
      public author: string,
      public comment: string,
      public annotationId: string,
      public createdDate: Date,
      public modifiedDate: Date
    ) {  }
  
  }