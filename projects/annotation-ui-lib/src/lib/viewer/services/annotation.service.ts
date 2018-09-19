import { Injectable, OnInit } from '@angular/core';
import { AnnotationStoreService } from './annotation-store.service';
import { Comment } from '../comments/comment';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

declare const PDFJS: any;
declare const PDFAnnotate: any;

@Injectable()
export class AnnotationService implements OnInit{

  PAGE_HEIGHT;
  UI;
  comments;
  private RENDER_OPTIONS: { documentId: string, pdfDocument: any, scale: any, rotate: number };	
  pdfPages: number;

  constructor(private annotationStoreService: AnnotationStoreService,
    private router: Router,
    private route: ActivatedRoute) {
    
    PDFAnnotate.setStoreAdapter(new PDFAnnotate.LocalStoreAdapter());

    PDFJS.workerSrc = '/node_modules/annotation-ui-lib/assets/shared/pdf.worker.js';
    
    this.PAGE_HEIGHT = void 0;
    this.UI = PDFAnnotate.UI;
  }

  ngOnInit() {
  }

  setRenderOptions(RENDER_OPTIONS: { documentId: string; pdfDocument: null; scale: number; rotate: number; }): any {
    this.RENDER_OPTIONS = RENDER_OPTIONS;
  }

  render() {
    PDFJS.getDocument(this.RENDER_OPTIONS.documentId)
      .then(pdf => {
        this.RENDER_OPTIONS.pdfDocument = pdf;

        const viewer = document.getElementById('viewer');
        viewer.innerHTML = '';
        const NUM_PAGES = pdf.pdfInfo.numPages;
        for (let i = 0; i < NUM_PAGES; i++) {
          const page = this.UI.createPage(i + 1);
          viewer.appendChild(page);
        }
      this.pdfPages = NUM_PAGES;

      this.UI.renderPage(1, this.RENDER_OPTIONS)
        .then(_ref => {
          const _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
          const _ref2 = _slicedToArray(_ref, 2);

          const pdfPage = _ref2[0];
          const annotations = _ref2[1];
          this.PAGE_HEIGHT = pdfPage.getViewport(this.RENDER_OPTIONS.scale, this.RENDER_OPTIONS.rotate);
      });
    }).catch(
      (error) => {
        let message = "Unable to render your supplied PDF. " + this.RENDER_OPTIONS.documentId + ". Error is: " + error;
        this.router.navigate(['error', message], {relativeTo: this.route});
      }
    );
  }

  renderPage(visiblePageNum: number) {
    PDFAnnotate.UI.renderPage(visiblePageNum, this.RENDER_OPTIONS);	
  }

  addComment(comment: Comment, callback ) {
    PDFAnnotate.getStoreAdapter()
		.addComment(this.RENDER_OPTIONS.documentId, comment.annotationId, comment.comment)
		.then(callback);
  }

  getComments(annotationId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .getComments(this.RENDER_OPTIONS.documentId, annotationId)
		.then(callback);
  }

  getAnnotations(pageNumber: number, callback) {
    PDFAnnotate.getStoreAdapter()
		.getAnnotations(this.RENDER_OPTIONS.documentId, pageNumber)
		.then(callback);
  }

  deleteComment(commentId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .deleteComment(this.RENDER_OPTIONS.documentId, commentId)
    .then(callback);
  }

  readComments(annotationId, callback) {
		this.comments = [];
		this.getComments(
			annotationId, 
			callback
		);
  }
  
  editComment(comment: Comment, callback){
    const localKey = this.RENDER_OPTIONS.documentId + "/annotations";
    const annotations = localStorage.getItem(localKey);
    let jsonAnnotations = JSON.parse(annotations);

    jsonAnnotations.forEach(element => {
      if (element.uuid === comment.id){
        element.content = comment.comment;
      }
    });

    localStorage.setItem(localKey, JSON.stringify(jsonAnnotations));
    callback;
  }

  convertFormToComment(commentForm: NgForm) {
    return new Comment(
      commentForm.value.commentId, 
      commentForm.value.author, 
      commentForm.value.comment, 
      commentForm.value.annotationId,
      null,
      null
      );
  }

  setHighlightTool() {
    localStorage.setItem(this.RENDER_OPTIONS.documentId + '/tooltype', 'highlight');
    PDFAnnotate.UI.enableRect('highlight');
    PDFAnnotate.UI.disableEdit();
  }

  setCursorTool() {
    PDFAnnotate.UI.disableRect();
    PDFAnnotate.UI.enableEdit();
    localStorage.setItem(this.RENDER_OPTIONS.documentId + '/tooltype', 'cursor');
  }

  clearAnnotations() {
    if (confirm('Are you sure you want to clear annotations?')) {
      for (let i = 0; i < this.pdfPages; i++) {
        document.querySelector('div#pageContainer' + (i + 1) + ' svg.annotationLayer').innerHTML = '';
      }
      localStorage.removeItem(this.RENDER_OPTIONS.documentId + '/annotations');
    }
  }

  setScale(scale) {
    scale = parseFloat(scale);
    if (this.RENDER_OPTIONS.scale !== scale) {
      this.RENDER_OPTIONS.scale = scale;
      localStorage.setItem(this.RENDER_OPTIONS.documentId + '/scale', this.RENDER_OPTIONS.scale);
      this.render();
    }
  }
}
