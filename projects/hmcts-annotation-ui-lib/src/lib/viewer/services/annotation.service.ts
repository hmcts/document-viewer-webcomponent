import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
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
  documentData: any;

  constructor(private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute,
              private pdfAdapter: PdfAdapter) {}
  
  preRun() {
      this.pdfAdapter.setStoreData(this.annotationData);
      PDFAnnotate.setStoreAdapter(this.pdfAdapter.getStoreAdapter());

      this.PAGE_HEIGHT = void 0;
      this.UI = PDFAnnotate.UI;

      this.pageNumber = new Subject();
      this.pageNumber.next(1);
  }

  fetchData(documentId): Observable<any> {
    return this.http.get('http://localhost:3000/api/annotation/annotation-sets/' + "uuid2")     
  };

  saveData() {
    this.annotationData.annotations = this.pdfAdapter.data;

    this.annotationData.annotations.forEach(annotation => {
      this.saveAnnotation(annotation).subscribe(
        response => console.log(response),
        error => console.log(error)
      );
    });
  }

  saveAnnotation(annotation): Observable<any> {
    return this.http.post('http://localhost:3000/api/annotation/annotations', annotation);
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
    PDFJS.workerSrc = '/dist/hmcts-annotation-ui-lib/assets/shared/pdf.worker.js';
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
