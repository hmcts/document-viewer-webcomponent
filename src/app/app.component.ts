import { Component, OnInit, Input, SimpleChanges, Inject, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { DOCUMENT } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  svg: SVGSVGElement;
  
  constructor(@Inject(DOCUMENT) private document) {
  }

  ngOnInit() {
    this.createSVG();
  }

  ngAfterViewInit() {
  }

  createSVG() {
      this.svg = this.document.createElementNS("http://www.w3.org/2000/svg", 
                                     "svg");
      this.svg.setAttribute('id', 'svg-canvas');
      this.svg.setAttribute('style', 'position:absolute;top:0px;left:0px');
      this.svg.setAttribute('width', this.document.body.clientWidth);
      this.svg.setAttribute('height', this.document.body.clientHeight);
      this.svg.setAttributeNS("http://www.w3.org/2000/xmlns/", 
                         "xmlns:xlink", 
                         "http://www.w3.org/1999/xlink");
      this.document.body.appendChild(this.svg);
  }
}
