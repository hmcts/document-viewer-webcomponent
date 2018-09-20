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
  
  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.svg = document.querySelector('#pageContainer1 .annotationLayer');
    this.getAnnotationElement(this.targetAnnotation);
  }

  getAnnotationElement(linkedAnnotationId: string) {
    const annotations = Array.from(document.querySelector('#pageContainer1 .annotationLayer').childNodes);
    
		annotations.forEach(annotation => {
      const annotationId = (<HTMLInputElement>annotation).dataset.pdfAnnotateId;
      
			if (annotationId === linkedAnnotationId) {
        this.connectDivs(annotation, this.source, "blue", 0.4);
      }
		});
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

  convertCoords(x,y, target): {x: number, y:number} {

    var offset = this.svg.getBoundingClientRect();
    var matrix = target.getScreenCTM();
    
    return {
      x: (matrix.a * x) + (matrix.c * y) + matrix.e - offset.left,
      y: (matrix.b * x) + (matrix.d * y) + matrix.f - offset.top
    };
  }

  connectDivs(target, source, color, tension) {

    var bBox = target.getBBox();
    var absoluteCoords = this.convertCoords(bBox.x + bBox.width, bBox.y, target);

    var pos = this.findAbsolutePosition(source);
    const contentYOffset = 167;
    var x2 = pos.x;
    var y2 = pos.y - contentYOffset;
    
    this.drawCurvedLine(absoluteCoords.x, absoluteCoords.y, x2, y2, color, tension);
  }

  drawCurvedLine(x1, y1: number, x2: number, y2, color, tension) {
    var shape = document.createElementNS("http://www.w3.org/2000/svg", 
                                         "path");{

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

    shape.setAttributeNS(null, "d", path);
    shape.setAttributeNS(null, "fill", "none");
    shape.setAttributeNS(null, "stroke", color);
    this.svg.appendChild(shape);
    }
  }
}
