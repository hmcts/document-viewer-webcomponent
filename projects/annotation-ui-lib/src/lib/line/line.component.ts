import { Component, OnInit, Input, ElementRef } from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  svg;
  @Input() source: ElementRef;
  @Input() targetAnnotation: string;
  shape;

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.svg = document.querySelector('#pageContainer1 .annotationLayer');
    this.getAnnotationElement(this.targetAnnotation);
  }

  getAnnotationElement(linkedAnnotationId: string) {
    const key = '#pdf-annotate-screenreader-' + linkedAnnotationId +'-end';
    const highlightHtml = document.querySelector(key);
    this.connectDivs(highlightHtml.parentElement, this.source, "blue", 0.4);
  }
  
  findAbsolutePosition(htmlElement: any) {
    var x = <number>htmlElement.offsetLeft;
    var y = <number>htmlElement.offsetTop;
    for (var x=0, y=0, el=htmlElement; 
         el != null; 
         el = el.offsetParent) {
           x += el.offsetLeft;
           y += el.offsetTop;
    }
    return {
        "x": x,
        "y": y
    };
  }

  offset(el) {
    var rect = el.getBoundingClientRect(),
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
}

  connectDivs(target: HTMLElement, source, color, tension) {

    const scrollPos = document.querySelector('#content-wrapper').scrollTop;
    console.log(scrollPos);
    var pos2 = pos2;
    var x1s = target.style.left;
    let x1 = parseInt(x1s.slice(0, -2));

    var y1s = target.style.top;
    let y1 = parseInt(y1s.slice(0, -2));
    console.log("target cord: " + x1+ " : " + y1);

    var pos = this.findAbsolutePosition(source);
    console.log("source cord: " + pos.x + " : " + pos.y);
    const contentYOffset = 160;
    var x2 = pos.x;
    var y2 = pos.y - contentYOffset  + scrollPos;
    this.drawCurvedLine(x1, y1, x2, y2, color, tension);
  }

  drawCurvedLine(x1, y1: number, x2: number, y2, color, tension) {
    console.log(x1, y1)

    try {
      this.svg.removeChild(this.shape);
    }catch(e) {
      console.log(e);
    }
      this.shape = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");
    
    if (tension<0) {
        var delta = (y2-y1)*tension;
        var hx1=x1;
        var hy1=y1-delta;
        var hx2=x2;
        var hy2=y2+delta;
        var path = "M " + x1 + " " + y1 + 
                  " C " + hx1 + " " + hy1 + " "  
                        + hx2 + " " + hy2 + " " 
                        + x2 + " " + y2;
    } else {
        var delta = (x2-x1)*tension;
        var hx1=x1+delta;
        var hy1=y1;
        var hx2=x2-delta;
        var hy2=y2;
        var path = "M " + x1 + " " + y1 + 
                  " C " + hx1 + " " + hy1 + " "  
                        + hx2 + " " + hy2 + " " 
                        + x2 + " " + y2;
    }

    this.shape.setAttributeNS(null, "d", path);
    this.shape.setAttributeNS(null, "fill", "none");
    this.shape.setAttributeNS(null, "stroke", color);
    this.svg.appendChild(this.shape);
    
  }
}
