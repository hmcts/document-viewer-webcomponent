declare const PDFJS: any;

export class PdfWrapper {

    constructor() {
        PDFJS.workerSrc = '/assets/js/pdf.worker.min.js';
    }

    getDocument(documentId): Promise<any> {
        return PDFJS.getDocument(documentId);
    }
}
