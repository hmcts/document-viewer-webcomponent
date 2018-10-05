import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dm-upload',
  templateUrl: './dm-upload.component.html',
  styleUrls: ['./dm-upload.component.css']
})
export class DmUploadComponent implements OnInit {


  fileToUpload: File = null;

  constructor(private router: Router,
              private http: HttpClient) { }

  ngOnInit() {
  }

  handleFileInput(file: File) {
    this.fileToUpload = file;
  }

  uploadDocument() {
    if (this.fileToUpload) {
      this.postFile();
    } else{
      console.log(new Error(' You have not selcted a file for upload.').message);
    }
  }

  postFile() {
    const metadataObj: Map<string, string> = new Map<string, string>();
    // metadataObj.set('title', 'some random Title');
    // metadataObj.set('author', 'Joe');
    // metadataObj.set('cake', 'yesplease');
    this.sendToApi('PRIVATE', metadataObj)
      .subscribe( () => this.goToViewer(),
        err => {
          console.log(err);
        }
      );
  }

    sendToApi(classification: string, metaDate: Map<string, string>) {
      let formData: FormData = new FormData();
      formData.append('classification', classification);
      formData.append('files', this.fileToUpload, this.fileToUpload.name);
  
      if (metaDate) {
        metaDate.forEach( (v, k) => {
          formData.append('metadata[' + k + ']', v);
          console.log('metadata[' + k + '] = ' + v);
        });
      }
      console.log('files' + this.fileToUpload + this.fileToUpload.name);
      // Post to Node API
      return this.http.post<any>('http://localhost:3000/api/dm/documents', formData);
    }
  

  goToViewer() {
    const uuid = ''; 
    this.router.navigate(['/viewer/?url=' + uuid])
  }
}
