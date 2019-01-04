import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';
import { DmUploadComponent } from './dm-upload/dm-upload.component';

import { HmctsEmViewerUiModule } from 'projects/hmcts-annotation-ui-lib/src/public_api';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
      path: '',
      component: AppComponent,
  }
];
@NgModule({
  declarations: [
    AppComponent,
    DmUploadComponent
  ],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
    BrowserModule,
    HttpClientModule,
    AuthModule,
    HmctsEmViewerUiModule
  ],
  providers: [
    ConfigService,
    TransferState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
