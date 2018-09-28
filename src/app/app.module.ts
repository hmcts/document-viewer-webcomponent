import { BrowserModule, TransferState } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationUiLibModule, ViewerComponent, AppResolverComponent } from '../../projects/annotation-ui-lib/src/public_api';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth/auth.module';
import { ConfigService } from './config.service';

const appRoutes: Routes = [
  { path: '',  
  component: ViewerComponent,
  resolve: {
    annotationData: AppResolverComponent
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
  providers: [ConfigService, TransferState, AppResolverComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
