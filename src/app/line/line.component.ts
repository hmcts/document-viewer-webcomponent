import { Component, OnInit, ViewChild, Input, EventEmitter, Output, ElementRef } from '@angular/core';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {

  @Input() label: string = '';
  @Input() min = 0;
  @Input() max = 1;
  @Input() value = 0;
  @Output() valueChange = new EventEmitter<number>();

  @ViewChild('slider') slider: ElementRef;
  cursorPt: SVGPoint = {x: 0, y: 0} as any;
  handle: Subscription;
  pt: SVGPoint;

  constructor() {
  }

  ngOnInit() {
      const scaledValue = (this.value - this.min) / (this.max - this.min);
      this.cursorPt = {x: 0, y: 128 - (scaledValue * 128)} as any;
  }

  ngAfterViewInit() {
      this.pt = this.slider.nativeElement.createSVGPoint();
  }

  ngOnDestroy() {
      this.handle.unsubscribe();
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

  connectDivs(leftId, rightId, color, tension) {
    var left = document.getElementById(leftId);
    var right = document.getElementById(rightId);
    
    var leftPos = this.findAbsolutePosition(left);
    var x1 = leftPos.x;
    var y1 = leftPos.y;
    x1 += left.offsetWidth;
    y1 += (left.offsetHeight / 2);
  
    var rightPos = this.findAbsolutePosition(right);
    var x2 = rightPos.x;
    var y2 = rightPos.y;
    y2 += (right.offsetHeight / 2);
  
    var width=x2-x1;
    var height = y2-y1;
  
    drawCircle(x1, y1, 3, color);
    drawCircle(x2, y2, 3, color);
    this.drawCurvedLine(x1, y1, x2, y2, color, tension);
  }

  drawCurvedLine(x1, y1: number, x2: number, y2, color, tension) {
    var svg = createSVG();
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
    svg.appendChild(shape);
    }
  }
}
