import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';
import { HmctsModule } from './hmcts/hmcts.module';
import { GovukModule } from './govuk/govuk.module';
import { RouterModule } from '@angular/router';
import { RoutingModule } from './routing/routing.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AuthModule,
    HmctsModule,
    GovukModule,
    RouterModule,
    RoutingModule,
    BrowserTransferStateModule
  ],
  providers: [
    ConfigService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
