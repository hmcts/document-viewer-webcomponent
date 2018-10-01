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
import { ConfigService } from '../config.service';

@Injectable({
    providedIn: 'root'
})
export class AuthInteceptor implements HttpInterceptor  {

    constructor(public router: Router, 
                private configService: ConfigService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // Set Auth tokens in local.config.js 
        const auth = this.configService.getAuthHeaders(this.configService.config);
        request = request.clone({
            setHeaders: {
                ServiceAuthorization: auth.serviceAuthorization,
                Authorization: auth.authorization
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
