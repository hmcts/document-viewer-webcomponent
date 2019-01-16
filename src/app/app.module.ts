import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';
import { HmctsEmViewerUiModule } from 'projects/hmcts-annotation-ui-lib/src/public_api';
import { RoutingModule } from './routing/routing.module';
import { HmctsModule } from './hmcts/hmcts.module';
import { GovukModule } from './govuk/govuk.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    HmctsEmViewerUiModule,
    HmctsModule,
    GovukModule,
    RoutingModule
  ],
  providers: [
    ConfigService,
    TransferState
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
