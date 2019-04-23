import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { DocumentViewerModule } from '@hmcts/document-viewer-webcomponent';
import { DocumentViewerWrapperComponent } from './document-viewer-wrapper.component';

@NgModule({
  declarations: [
    AppComponent,
    DocumentViewerWrapperComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserTransferStateModule,
    DocumentViewerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
