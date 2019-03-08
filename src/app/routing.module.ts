import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from './auth/auth-guard.service';
import { RedirectionService } from './auth/redirection.service';
import { AnnotationWebappComponent } from './annotation-webapp/annotation-webapp.component';
import { DocumentViewerModule } from '@hmcts/document-viewer-webcomponent';

const routes: Routes = [{
    path: '',
    component: AnnotationWebappComponent,
    canActivate: [AuthGuardService]
}];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        }),
        HttpClientModule,
        ReactiveFormsModule,
        DocumentViewerModule
    ],
    declarations: [
        AnnotationWebappComponent
    ],
    providers: [
        RedirectionService
    ],
    exports: [
        RouterModule
    ]
})

export class RoutingModule {
}
