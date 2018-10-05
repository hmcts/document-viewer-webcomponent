
import {HttpClient, HttpResponse} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {IDocumentTask} from "./document-task.model";
import {Observable, Subject} from "rxjs";
import { ConfigService } from "src/app/config.service";

@Injectable()
export class NpaService {

    documentTask: Subject<IDocumentTask>;
    outputDmDocumentId: Subject<string>;
    
    constructor(private configService: ConfigService,
                private httpClient: HttpClient) {
        this.outputDmDocumentId = new Subject<string>();
        this.documentTask = new Subject<IDocumentTask>();
    }

    exportPdf(dmDocumentId, outputDmDocumentId): Observable<HttpResponse<IDocumentTask>> {
        const url = `${this.configService.config.api_base_url}/api/em-npa/document-tasks`;
        const documentTasks = {
            inputDocumentId: dmDocumentId,
            outputDocumentId: outputDmDocumentId
        };
        return this.httpClient.post<IDocumentTask>(url, documentTasks, { observe: 'response' });
    }
}
