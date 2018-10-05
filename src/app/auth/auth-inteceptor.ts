import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthInteceptor implements HttpInterceptor  {

    constructor(public router: Router) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Set Auth tokens in local.config.js 
        request = request.clone({
            setHeaders: {
                ServiceAuthorization: environment.serviceAuthorization,
                Authorization: environment.authorization
            }
        });

        return next.handle(request).pipe(
            tap((event: HttpEvent<any>) => {
            // Carry on
        }, (err: any) => {
            console.log(err);
            })
        );
    }
}
