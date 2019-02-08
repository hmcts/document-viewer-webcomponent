declare const PDFJS: any;

export class PdfWrapper {

    getDocument(documentId): Promise<any> {
        return PDFJS.getDocument(documentId);
    }
}
