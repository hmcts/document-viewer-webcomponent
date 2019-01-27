import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HmctsGlobalHeaderComponent } from './components/hmcts-global-header/hmcts-global-header.component';
import { HmctsPrimaryNavigationComponent } from './components/hmcts-primary-navigation/hmcts-primary-navigation.component';
import {RouterModule} from '@angular/router';

@NgModule({
    imports: [
        CommonModule,
        RouterModule
    ],
    declarations: [
        HmctsGlobalHeaderComponent,
        HmctsPrimaryNavigationComponent
    ],
    exports: [
        HmctsGlobalHeaderComponent,
        HmctsPrimaryNavigationComponent
    ]
})
export class HmctsModule {

}
