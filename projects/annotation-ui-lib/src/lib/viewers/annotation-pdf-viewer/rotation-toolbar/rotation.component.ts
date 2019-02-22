import {Component, Input, OnInit} from '@angular/core';
import { PdfRenderService } from '../../../data/pdf-render.service';
import { EmLoggerService } from '../../../logging/em-logger.service';


@Component({
    selector: 'app-rotation-toolbar',
    templateUrl: './rotation.component.html',
    styleUrls: ['./rotation.component.scss']
})
export class RotationComponent implements OnInit {
    rotationStyle = {};

    @Input() pageNumber: number;

    constructor(private pdfRenderService: PdfRenderService,
                private log: EmLoggerService) {
        this.log.setClass('RotationComponent');
    }

    ngOnInit() {
        this.rotationStyle = {
          'margin-top':
            `-${(<HTMLElement>document.getElementById('pageContainer' + this.pageNumber).querySelector('.textLayer')).style.height}`
        };
    }

    calculateRotation(rotateVal): number {
        const circleDegrees = 360;
        return (rotateVal % circleDegrees + circleDegrees) % circleDegrees;
    }

    onRotateClockwise() {
        const RENDER_OPTIONS = this.pdfRenderService.getRenderOptions();
        const rotation = RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate;
        RENDER_OPTIONS.rotationPages
            .find(rotatePage => rotatePage.page === this.pageNumber).rotate = this.calculateRotation(rotation + 90);
        this.pdfRenderService.setRenderOptions(RENDER_OPTIONS);
        this.pdfRenderService.render();
    }
}
