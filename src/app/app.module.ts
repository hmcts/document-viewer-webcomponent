import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { AnnotationUiLibModule, ViewerComponent, AnnotationResolver, DocumentResolver} from '../../projects/hmcts-annotation-ui-lib/src/public_api';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';

const appRoutes: Routes = [
  { path: '',  
  component: ViewerComponent,
  resolve: {
    documentData: DocumentResolver,
    annotationData: AnnotationResolver
  } 
 }
];

@NgModule({
  declarations: [
    AppComponent
    
  ],
  imports: [
    BrowserModule,
    AnnotationUiLibModule,
    RouterModule.forRoot(
      appRoutes
    ),
    HttpClientModule,
    AuthModule
  ],
  providers: [
    ConfigService, 
    TransferState, 
    AnnotationResolver, 
    DocumentResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
