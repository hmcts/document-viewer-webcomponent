import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { ViewerComponent } from "./viewer/viewer.component";
import { ScrollEventModule } from 'ngx-scroll-event';
import { ToolbarComponent } from "./toolbar/toolbar.component";
import { CommentsComponent } from "./comments/comments.component";
import { CommentItemComponent } from "./comments/comment-item/comment-item.component";
import { CommentFormComponent } from "./comments/comment-form/comment-form.component";
import { AnnotationStoreService } from "./services/annotation-store.service";

@NgModule(
    {
        declarations: [
            ViewerComponent,
            ToolbarComponent,
            CommentsComponent,
            CommentItemComponent,
            CommentFormComponent
        ],
        imports: [
            CommonModule,
            FormsModule,
            ScrollEventModule
        ],
        exports: [
            ViewerComponent
        ],
        providers: [
            AnnotationStoreService
        ]
    }
)
export class AnnotationsModule{
}