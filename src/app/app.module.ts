import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationUiLibModule, ViewerComponent, AppResolverComponent } from '../../projects/annotation-ui-lib/src/public_api';

const appRoutes: Routes = [
  { 
    path: '',  
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
    )
  ],
  providers: [AppResolverComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
