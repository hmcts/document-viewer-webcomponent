import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';
import { ScrollEventModule } from 'ngx-scroll-event';
import { FormsModule } from '@angular/forms';
import { AnnotationUiLibComponent } from './annotation-ui-lib.component';
import { ViewerComponent } from './viewer/viewer/viewer.component';
import { CommentsComponent } from './viewer/comments/comments.component';
import { CommentItemComponent } from './viewer/comments/comment-item/comment-item.component';
import { CommentFormComponent } from './viewer/comments/comment-form/comment-form.component';
import { ToolbarComponent } from './viewer/toolbar/toolbar.component';
import { AnnotationStoreService } from './viewer/services/annotation-store.service';
import { ErrorComponent } from './error/error.component';
import { AnnotationService } from './viewer/services/annotation.service';
import { LineComponent } from './line/line.component';

const appRoutes: Routes = [
  { path: 'error/:error',  component: ErrorComponent }
];

@NgModule({
  imports: [
    CommonModule,
    ScrollEventModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forChild(
      appRoutes
    )
  ],
  declarations: [
    AnnotationUiLibComponent, 
    ViewerComponent,
    CommentsComponent,
    CommentItemComponent,
    CommentFormComponent,
    ToolbarComponent,
    ErrorComponent,
    LineComponent
  ],
  providers: [
    AnnotationStoreService,
    AnnotationService
  ],
  exports: [
    AnnotationUiLibComponent,
    ViewerComponent
  ]
})
export class AnnotationUiLibModule { }
