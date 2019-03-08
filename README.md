# @hmcts/document-viewer-webcomponent 
[![Coverage Status](https://coveralls.io/repos/github/hmcts/document-viewer-webcomponent/badge.svg?branch=upload-npm-in-pipeline)](https://coveralls.io/github/hmcts/document-viewer-webcomponent?branch=upload-npm-in-pipeline)
[![Build Status](https://travis-ci.com/hmcts/document-viewer-webcomponent.svg?branch=master)](https://travis-ci.com/hmcts/document-viewer-webcomponent)

This is an angular library that provides components to view and annotate PDF documents, as well as view images.

### Building annotation library
- npm run package
- distributable will be created under dist/document-viewer-webcomponent

### Add as a dependency in your angular app
- add @hmcts/document-viewer-webcomponent as a dependency in package.json
- import HmctsEmViewerUiModule and declare it in your NgModule imports.

  For example:
  ```
  import { DocumentViewerModule } from 'document-viewer-webcomponent';

  @NgModule({
    imports: [
      ...,
      HmctsEmViewerUiModule,
    ]
  })
  ```
- import assets to your angular.json
  ```
    {
        "glob": "**/*",
        "input": "node_modules/@hmcts/document-viewer-webcomponent/assets",
        "output": "/assets"
    }
  ```
- and styles
  ```
  "styles": [
    "node_modules/@hmcts/document-viewer-webcomponent/assets/aui-styles.scss",
    ...
  ],
  ```
- import JS dependencies as scripts within angular.json
  ```
  "scripts": [
      "node_modules/@hmcts/document-viewer-webcomponent/assets/js/pdf.combined.min.js",
      "node_modules/@hmcts/document-viewer-webcomponent/assets/js/pdf_viewer.min.js",
      "node_modules/@hmcts/document-viewer-webcomponent/assets/js/pdf-annotate.min.js"
      ...
  ]
  ```
- component entry point:
  ```
  <app-document-viewer
      [baseUrl]="'http://localhost:3000/api'"
      [annotate]="true"
      [url]="'https://dm-store-aat.service.core-compute-aat.internal/documents/35f3714e-30e0-45d6-b4fb-08f51c271f8e'"
  ></app-document-viewer>
  ```
  
  for non document store files:
    ```
    <app-document-viewer
        [baseUrl]="'http://localhost:3000/api'"
        [annotate]="false"
        [url]="'http://localhost:3000/assets/non-dm.pdf'"
        [isDM]="false"
        [contentType]="'pdf'">
    </app-document-viewer>
    ```
    Note: The file needs to be retrievable.
  
### Running development application (only for use with hmcts document store)
- set environment variable to define if app connects to localhost or aat:
  ```
  export APP_ENV=local
  ```
- start app server
  ```
  yarn install; export S2S_SECRET={{insert secret here}}; export IDAM_SECRET={{insert secret here}}; export APP_ENV=local; yarn start-dev-proxy;
  ```
- start node server
  ```
  yarn install; export S2S_SECRET={{insert secret here}}; export IDAM_SECRET={{insert secret here}}; export APP_ENV=local; yarn watch-dev-node;
  ``` 
- go to http://localhost:3000 and the viewer should load the document.
