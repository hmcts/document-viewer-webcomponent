# AnnotationUi
Import AnnotationUiLibModule from annotation-ui-lib in your app.module.ts and declare it in your NgModule imports.

Reference the followings scripts in your angular.json.
            "scripts": [
              "node_modules/annotation-ui-lib/assets/shared/pdf.js",
              "node_modules/annotation-ui-lib/assets/shared/pdf_viewer.js",
              "node_modules/annotation-ui-lib/assets/shared/pdf-annotate.js"
            ]

And styles
            "styles": [
              "node_modules/annotation-ui-lib/assets/_theme.scss",
              "src/styles.css"
            ],

Entry point is the ViewerComponent component and the selector is <app-viewer>. 

Bind a URL to the PDF you want to annotate to the ViewerComponent.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
