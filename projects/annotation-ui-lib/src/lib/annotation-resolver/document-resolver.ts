import { Component } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { DocumentViewerService } from 'src/app/document-viewer.service';


@Component({
  selector: 'aui-document-resolver',
  template: ''
})
export class DocumentResolver implements Resolve<any> {

  constructor(private documentViewerService: DocumentViewerService) {}

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.documentViewerService.fetch(route.params.url);
  }
}
