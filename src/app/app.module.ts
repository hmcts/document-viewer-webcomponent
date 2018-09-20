import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { AnnotationUiLibModule, ViewerComponent } from '../../projects/annotation-ui-lib/src/public_api';
import { LineComponent } from './line/line.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { CommentItemComponent } from './comment-item/comment-item.component';

const appRoutes: Routes = [
  { path: '',  component: ViewerComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LineComponent,
    CommentListComponent,
    CommentItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AnnotationUiLibModule,
    RouterModule.forRoot(
      appRoutes
    ),
    
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
