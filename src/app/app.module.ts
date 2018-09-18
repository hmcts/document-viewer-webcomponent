import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AnnotationsModule } from './viewer/annotations.module';
import { RouterModule, Routes } from '@angular/router';
import { ViewerComponent } from './viewer/viewer/viewer.component';

const appRoutes: Routes = [
  { path: '',  component: ViewerComponent }
];


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AnnotationsModule,
    RouterModule.forRoot(
      appRoutes
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
