import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInteceptor } from './auth-inteceptor';

@NgModule({
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInteceptor,
            multi: true
        }
    ]
})
export class AuthModule {}
