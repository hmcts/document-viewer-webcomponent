import {ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef} from '@angular/core';
import { AnnotationStoreService } from '../data/annotation-store.service';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { UnsupportedViewerComponent } from './unsupported-viewer/unsupported-viewer.component';
import { IAnnotationSet } from '../data/annotation-set.model';
import { AnnotationPdfViewerComponent } from './annotation-pdf-viewer/annotation-pdf-viewer.component';
import { EmLoggerService } from '../logging/em-logger.service';

@Injectable()
export class ViewerFactoryService {

    constructor(private componentFactoryResolver: ComponentFactoryResolver,
                private annotationStoreService: AnnotationStoreService,
                private log: EmLoggerService) {
        this.log.setClass('ViewerFactoryService');
    }

    private static isImage(mimeType: String) {
        return mimeType.startsWith('image/') || mimeType === 'image';
    }

    private static isPdf(mimeType: String) {
        return mimeType === 'application/pdf' || mimeType === 'pdf';
    }

    public getDocumentId(documentMetaData: any) {
        const docArray = documentMetaData._links.self.href.split('/');
        return docArray[docArray.length - 1];
    }

    buildComponent(viewContainerRef: ViewContainerRef, contentType: string,
                  url: string, baseUrl: string, originalUrl: string, annotate: boolean, annotationSet: any, rotate: boolean) {
        if (ViewerFactoryService.isPdf(contentType) && annotate) {
            this.log.info('Selected pdf viewer with annotations enabled');
            return this.buildAnnotateUi(url, viewContainerRef, baseUrl, annotate, annotationSet, rotate);

        } else if (ViewerFactoryService.isPdf(contentType) && !annotate) {
            this.log.info('Selected pdf viewer with annotations disabled');
            return this.buildAnnotateUi(url, viewContainerRef, baseUrl, annotate, null, rotate);
        } else if (ViewerFactoryService.isImage(contentType)) {
            this.log.info('Selected image viewer');
            return this.createComponent(ImageViewerComponent, viewContainerRef, originalUrl, url, rotate);

        } else {
            this.log.info('Unsupported type for viewer');
            return this.createComponent(UnsupportedViewerComponent, viewContainerRef, originalUrl, url);
        }
    }

    buildAnnotateUi(url: any, viewContainerRef: ViewContainerRef, baseUrl: string,
                    annotate: boolean, annotationSet: IAnnotationSet, rotate: boolean): ComponentRef<any>['instance'] {

      viewContainerRef.clear();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(AnnotationPdfViewerComponent);

      const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.annotate = annotate;
      componentRef.instance.annotationSet = annotationSet;
      componentRef.instance.outputDmDocumentId = null; // '4fbdde23-e9a7-4843-b6c0-24d5bf2140ab';
      componentRef.instance.baseUrl = baseUrl;
      componentRef.instance.url = url;
      componentRef.instance.rotate = rotate;

      return componentRef.instance;
    }

    createComponent(component: any, viewContainerRef: ViewContainerRef, originalUrl: string, url: string, rotate?: boolean) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
      viewContainerRef.clear();

      const componentRef: ComponentRef<any> = viewContainerRef.createComponent(componentFactory);
      componentRef.instance.originalUrl = originalUrl;
      componentRef.instance.url = url;
      componentRef.instance.rotate = rotate;
      return componentRef.instance;
    }

}
