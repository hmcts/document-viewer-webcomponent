# Annotation UI 
### Annotation code is in /projects/annotation-ui-lib
## Running development application
Spin up ```docker dependencies - docker-compose -f docker-compose-dependencies.yml up```
Upload a document to Document management. Save the documentId and copy into url property ```src/app/app.component.html```
Get Auth JWT tokens - copy into ```/src/environment/environment.ts``` and ```api/middleware/auth``` insert jwtDecode('add-token-here') - A proper login page will be added soon.

npm install
npm run start-server
npm run start-client

Goto http://localhost:4200 and the viewer should load the document.

## To build annotation library
npm run package
Distributable will be copied to /dist/hmcts-annotation-ui-lib

## Instructions to add this library to your own angular app
Check demo app:
https://github.com/hmcts/rpa-annotation-ui-demo

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


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
