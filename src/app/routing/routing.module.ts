import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RedirectionService } from './redirection.service';
import { GovukModule } from '../govuk/govuk.module';
import { HmctsModule } from '../hmcts/hmcts.module';
import { GenericPageComponent } from './pages/generic-page/generic-page.component';
import { AnnotationWebappComponent } from '../annotation-webapp/annotation-webapp.component';
import { CookiesComponent } from './pages/cookies/cookies.component';
import { HmctsEmViewerUiModule } from '../../../projects/hmcts-annotation-ui-lib/src/lib/hmcts-em-viewer-ui.module';

const routes: Routes = [
    {
        path: '',
        component: GenericPageComponent,
        children: [
            {
                path: '',
                component: AnnotationWebappComponent,
                canActivate: [AuthGuardService],
            }
        ]
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot(routes, {
            scrollPositionRestoration: 'enabled',
            anchorScrolling: 'enabled'
        }),
        HttpClientModule,
        ReactiveFormsModule,
        GovukModule,
        HmctsModule,
        HmctsEmViewerUiModule
    ],
    declarations: [
        GenericPageComponent,
        CookiesComponent,
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
