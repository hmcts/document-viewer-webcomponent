import { Component, OnInit } from '@angular/core';
import { AnnotationSet } from 'projects/hmcts-annotation-ui-lib/src/lib/data/annotation-set.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'annotation-ui';
  annotationSet: AnnotationSet;
  
  constructor() {
  }

  ngOnInit() {
    this.annotationSet = new AnnotationSet(
      "id",
      "author",
      new Date(),
      "author",
      new Date(),
      "documentId",
      []
    );
  }
}
