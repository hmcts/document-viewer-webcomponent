import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, Output, EventEmitter } from '@angular/core';
import { AnnotationService } from '../services/annotation.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit, OnChanges {

  @ViewChild("highlightTool") highlightTool: ElementRef;
  @ViewChild("pointerTool") pointerPool: ElementRef;
  @ViewChild("zoomTool") zoomTool: ElementRef;

  @Input() tool: string;
  @Output() toolChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(private annotationService: AnnotationService) {
  }

  ngOnInit() {
    this.handlePointerClick();
  }

  ngOnChanges() {
    if (this.tool == 'cursor') {
      this.annotationService.setCursorTool();
    } else {
      this.annotationService.setHighlightTool();
    }
  }

  handleClearAnnotations() {
    this.annotationService.clearAnnotations();
  }

  handleHighlightClick() {
    this.tool = 'highlight';
    this.toolChange.emit(this.tool);
  }

  handlePointerClick() {
    this.tool = 'cursor';
    this.toolChange.emit(this.tool);
  }

  onSaveClick() {
    this.annotationService.saveData();
  }

  // handleScaleChange(event: Event) {
  //   this.setScale(this.zoomTool.nativeElement.value)
  // }

  // setScale(scale) {
  //   this.annotationService.setScale(scale);
  // }
}
