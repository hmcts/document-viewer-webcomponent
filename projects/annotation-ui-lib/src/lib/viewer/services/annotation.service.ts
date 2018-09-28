import { Injectable } from '@angular/core';
import { Comment } from '../../model/comment';
import { Router, ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { PdfAdapter } from '../../data/store-adapter';

declare const PDFJS: any;
declare const PDFAnnotate: any;

@Injectable()
export class AnnotationService {

  PAGE_HEIGHT;
  UI;
  comments;
  private RENDER_OPTIONS: { documentId: string, pdfDocument: any, scale: any, rotate: number };	
  private pageNumber: Subject<number>;

  annotationData: any;
  pdfPages: number;

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private pdfAdapter: PdfAdapter) {
      
    }
  
  preRun() {
      PDFJS.workerSrc = '/node_modules/hmcts-annotation-ui-lib/assets/shared/pdf.worker.js';

      this.pdfAdapter.setStoreData(this.annotationData.annotationData);
      PDFAnnotate.setStoreAdapter(this.pdfAdapter.getStoreAdapter());

      this.PAGE_HEIGHT = void 0;
      this.UI = PDFAnnotate.UI;

      this.pageNumber = new Subject();
      this.pageNumber.next(1);
  }

  fetchData(documentId) {
    // this.annotationData = {
    //   "createdBy": null,
    //   "createdDate": null,
    //   "lastModifiedBy": null,
    //   "lastModifiedDate": null,
    //   "id": 1202,
    //   "documentId": "uuid2",
    //   "annotations": [
    //     {
    //       "createdBy": null,
    //       "createdDate": null,
    //       "lastModifiedBy": null,
    //       "lastModifiedDate": null,
    //       "id": "c831162f-89ec-4890-ad8e-a57af0f0d2b7",
    //       "page": 1,
    //       "x": null,
    //       "y": null,
    //       "width": null,
    //       "height": null,
    //       "annotationSetId": null,
    //       "comments": [
    //         {
    //           "createdBy": null,
    //           "createdDate": null,
    //           "lastModifiedBy": null,
    //           "lastModifiedDate": null,
    //           "id": "5bb12ea4-2259-4612-83ba-7f69a9079643",
    //           "annotationId": "c831162f-89ec-4890-ad8e-a57af0f0d2b7",
    //           "content": "A comment here"
    //         }
    //       ],
    //       "rectangles": [
    //         {
    //           "createdBy": null,
    //           "createdDate": null,
    //           "lastModifiedBy": null,
    //           "lastModifiedDate": null,
    //           "id": null,
    //           "x": 93.48291382753759,
    //           "y": 188.85636867437145,
    //           "width": 14.738269318315318,
    //           "height": 11.619946472626879
    //         },
    //         {
    //           "createdBy": null,
    //           "createdDate": null,
    //           "lastModifiedBy": null,
    //           "lastModifiedDate": null,
    //           "id": null,
    //           "x": 108.29630686824483,
    //           "y": 188.85636867437145,
    //           "width": 72.81434482201597,
    //           "height": 11.619946472626879
    //         }
    //       ],
    //       "type": "highlight",
    //       "color": "FFFF00"
    //     },
        // {
        //   "createdBy": null,
        //   "createdDate": null,
        //   "lastModifiedBy": null,
        //   "lastModifiedDate": null,
        //   "id": "9bac4cdc-0823-48be-9a19-f3550c437417",
        //   "page": 1,
        //   "x": null,
        //   "y": null,
        //   "width": null,
        //   "height": null,
        //   "annotationSetId": null,
        //   "comments": [],
        //   "rectangles": [
        //     {
        //       "createdBy": null,
        //       "createdDate": null,
        //       "lastModifiedBy": null,
        //       "lastModifiedDate": null,
        //       "id": null,
        //       "x": 115.25849077038298,
        //       "y": 204.88721804511277,
        //       "width": 92.24449673989662,
        //       "height": 11.619946472626879
        //     }
        //   ],
        //   "type": "highlight",
        //   "color": "FFFF00"
        // }
    //   ]
    // };
    
    // return this.annotationData;
    return this.http.get('http://localhost:3000/api/annotation/annotation-sets/' + "uuid2");
  };

  saveData() {
    this.annotationData.annotationData.annotations = this.pdfAdapter.data;
    console.log(JSON.stringify(this.annotationData));
  }


  getPageNumber(): Subject<number> {
    return this.pageNumber;
  }
  
  setPageNumber(pageNumber: number) {
    this.pageNumber.next(pageNumber);
  }

  getRenderOptions() {
    return Object.assign({}, this.RENDER_OPTIONS);
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

  deleteComment(commentId: string, callback) {
    PDFAnnotate.getStoreAdapter()
    .deleteComment(this.RENDER_OPTIONS.documentId, commentId)
    .then(callback);
  }
  
  editComment(comment: Comment, callback){
    const localKey = this.RENDER_OPTIONS.documentId + "/annotations";
    const annotations = localStorage.getItem(localKey);
    let jsonAnnotations = JSON.parse(annotations);

    jsonAnnotations.forEach(element => {
      if (element.id === comment.id){
        element.content = comment.content;
      }
    });

    localStorage.setItem(localKey, JSON.stringify(jsonAnnotations));
    callback;
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
