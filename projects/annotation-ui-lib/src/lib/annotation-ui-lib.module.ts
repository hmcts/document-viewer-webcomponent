import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnotationUiLibComponent } from './annotation-ui-lib.component';
import { ViewerComponent } from './viewer/viewer/viewer.component';
import { CommentsComponent } from './viewer/comments/comments.component';
import { CommentItemComponent } from './viewer/comments/comment-item/comment-item.component';
import { CommentFormComponent } from './viewer/comments/comment-form/comment-form.component';
import { ToolbarComponent } from './viewer/toolbar/toolbar.component';
import { AnnotationStoreService } from './viewer/services/annotation-store.service';
import { ScrollEventModule } from 'ngx-scroll-event';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ScrollEventModule,
    FormsModule
  ],
  declarations: [
    AnnotationUiLibComponent, 
    ViewerComponent,
    CommentsComponent,
    CommentItemComponent,
    CommentFormComponent,
    ToolbarComponent
  ],
  providers: [
    AnnotationStoreService
  ],
  exports: [
    AnnotationUiLibComponent,
    ViewerComponent
  ]
})
export class AnnotationUiLibModule { }
