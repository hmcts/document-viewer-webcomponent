import { Component, OnInit, ViewChild, ElementRef, Input, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.css']
})
export class CommentItemComponent implements OnInit {
  @Input() svg;
  @ViewChild("source") source: ElementRef;
  target: HTMLElement;
  
  constructor(@Inject(DOCUMENT) private document) { }

  ngOnInit() {
    this.getAnnotationDiv("annotationId");
  }

  getAnnotationDiv(annotationId: string) {
    this.target = this.document.getElementById("target");
  }
}
