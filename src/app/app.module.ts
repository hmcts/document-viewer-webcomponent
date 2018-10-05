import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';
import { DmUploadComponent } from './dm-upload/dm-upload.component';

import { HmctsAnnotationUiModule } from 'projects/hmcts-annotation-ui-lib/src/public_api';

@NgModule({
  declarations: [
    AppComponent,
    DmUploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    HmctsAnnotationUiModule
  ],
  providers: [
    ConfigService, 
    TransferState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
