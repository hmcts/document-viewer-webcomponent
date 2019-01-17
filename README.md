# Annotation UI 
### Annotation code is in /projects/annotation-ui-lib
## Running development application
Set environment variable to define if app connects to localhost or aat:
### export APP_ENV=local

yarn install; export S2S_SECRET={{insert secret here}}; export IDAM_SECRET={{insert secret here}}; export APP_ENV=local; yarn watch-dev-node;
yarn install; export S2S_SECRET={{insert secret here}}; export IDAM_SECRET={{insert secret here}}; export APP_ENV=local; yarn start-dev-proxy;

Goto http://localhost:3000 and the viewer should load the document.

## To build annotation library
npm run package
Distributable will be copied to /dist/hmcts-annotation-ui-lib

## Instructions to add this library to your another angular app
Check demo app:
https://github.com/hmcts/rpa-em-show

Import HmctsEmViewerUiModule and declare it in your NgModule imports.

For example:
```
import { HmctsEmViewerUiModule } from 'hmcts-annotation-ui-lib';

@NgModule({
  imports: [
    ...,
    HmctsEmViewerUiModule,
  ]
})
```
Import the assets to your angular.json
```
  {
      "glob": "**/*",
      "input": "node_modules/hmcts-annotation-ui-lib/assets",
      "output": "/assets"
  }
```
Reference the followings scripts in your angular.json.
```
"scripts": [
    "node_modules/hmcts-annotation-ui-lib/assets/javascripts/pdf.js",
    "node_modules/hmcts-annotation-ui-lib/assets/javascripts/pdf_viewer.js",
    "node_modules/hmcts-annotation-ui-lib/assets/javascripts/pdf-annotate.js"
    ...
]
```

And styles
```
"styles": [
  "node_modules/hmcts-annotation-ui-lib/assets/annotation-ui-theme.scss",
  ...
],
```

Copy pdf.worker.js into your assets folder too.

Component entry point:
```
<app-document-viewer
    [baseUrl]="'http://localhost:3000/api'"
    [annotate]="true"
    [pdfWorker]="'/public/javascripts/pdf-worker.js'"
    [url]="'https://dm-store-aat.service.core-compute-aat.internal/documents/35f3714e-30e0-45d6-b4fb-08f51c271f8e'"
></app-document-viewer>
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
