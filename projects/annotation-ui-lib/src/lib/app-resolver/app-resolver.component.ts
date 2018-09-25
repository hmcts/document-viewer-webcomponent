import { Component } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AnnotationService } from '../viewer/services/annotation.service';


@Component({
  selector: 'aui-app-resolver',
  templateUrl: './app-resolver.component.html',
  styleUrls: ['./app-resolver.component.css']
})
export class AppResolverComponent implements Resolve<any> {

  constructor(private annotationService: AnnotationService) { }

  resolve(route: ActivatedRouteSnapshot, rstate: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.annotationService.fetchData(route.params.url);
  }

}
