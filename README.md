## Project

[Static project](#static-project)
[Angular project](#angular-project)
[Wordpress project](#wordpress-project)

## Static project

### Project structure
The file structure in static projects looks like this:

  - `index.html`
  - **assets**
    - **css** - css compiles
    - **scss** - scss files

### Gulp configuration

```javascript
// ******************** Variables
// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

// Paths
var IN = {
  sass: 'assets/scss/*'
}

var OUT = {
  css: 'assets/css/'
}

// Error
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
          // Customizing error title
          title: "Error running " + errTitle || "Error running Gulp"
        })
    });
}

// ******************** Tasks
// Sass
gulp.task('sass', function() {
  return gulp.src(IN.sass + '*')
    .pipe(newer(OUT.css + 'grid.css'))
    .pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
    .pipe(concat('grid.css', {newLine: ''}))
    .pipe(gulp.dest(OUT.css));
});

// Browser-sync
gulp.task('browserSync', ['sass'], function() {
  browserSync.init([OUT.css + '*', '*.html'], {
    port: 8888,
    server: {
        baseDir: "./"
    }
  })
});

// Watch
gulp.task('watch', ['browserSync'], function() {
  gulp.watch([IN.sass + '*.scss'], ['sass']);
  gulp.watch( '*.html' ).on( 'change', function( file ) {
    browserSync.reload();
  });
})

// Default
gulp.task('default', ['watch']);
```

## Angular project

### Create project
Type this in the terminal to create an Angular project with Angular Cli.

- **ng new projectName --style="scss"**

### Project structure
The file structure in Angular projects looks like this:

- **e2e** - End-to-end tests
- **node_modules** - Third party modules listed in package.json
- **src** - Development is done here. All Angular components, templates, styles, images, and anything else your app needs go here
  - **app** - static asset files (images, videos, fonts, etc.) - everything from this directory will be copied to dist folder
    - **components** - Components folder
      - **common** - Commom components
      - **custom** - Custom components
    - `app.component.html` - It is the root component of what will become a tree of nested components as the application evolves
    - `app.component.ts`
    - `app.module.ts` - The root module that tells Angular how to assemble the application
    - `app.routes.ts` - Routes module
  - **assets** - Static asset files (images, videos, fonts, etc.) - everything from this directory will be copied to dist folder
    - **fonts**
    - **img**
    - **js**
  - **environments** - This folder contains one file for each of your destination environments
  - **styles** - This folder contains all the global styles
    - `style.scss` - Main file where other stylesheets are imported
    - **settings** – Config, font, colors definitions...
    - **tools** – Mixins and functions
    - **generic** – Reset and/or normalize styles
    - **elements** – Basic HTML elements (H1, tables, lists, forms, links... )
    - **objects** – Grid, containers, media and animations
    - **components** - Custom component
    - **trumps** – Overrides
  - `favicon.ico`
  - `index.html`
  - `main.ts`
  - `polyfills.ts`
  - `test.ts`
  - `tsconfig.app.json`
  - `tsconfig.spec.json`
  - `typings.d.ts`
- `.angular-cli.json`
- `.editorconfig`
- `.gitignore`
- `.karma.conf.js`
- `package.json`
- `protractor.conf.js`
- `README.md`
- `tsconfig.json`
- `tslint.json`



## Wordpress project

### Project structure
The file structure in Wordpress projects looks like this:

- **wp** - WordPress installation
  - **wp-content**
    - **themes**
      - **your-theme**
        - **dist** - dist folder where CSS, JS and assets files are built
          - **assets** - Images, js and fonts
            - **img** - This folder contains all the images
            - **js** - This folder contains all JavaScripts files
            - **fonts** - This folder contains all the fonts
          - **styles** - This folder contains all the global styles
            - `style.scss` - Main file where other stylesheets are imported
            - **settings** – Config, font, colors definitions...
            - **tools** – Mixins and functions
            - **generic** – Reset and/or normalize styles
            - **elements** – Basic HTML elements (H1, tables, lists, forms, links... )
            - **objects** – Grid, containers, media and animations
            - **components** - Specific UI components
            - **trumps** – Overrides
        - **templates** - Custom templates
        - `index.php`
        - `functions.php`
        - `etc.`
  - **wp-admin**
  - **wp-includes**
  - `wp-config.php`

### Gulp configuration

```javascript
// ******************** Variables
// Dependencies
var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var newer = require('gulp-newer');
var cache = require('gulp-cache');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');
var plumber = require('gulp-plumber');
var notify = require('gulp-notify');
var browserSync = require('browser-sync');

// ******************** Change this
// Variables
var themeName = 'themeNameHere';
var serverAlias = 'http://localhost:8888/';

// Paths
var IN = {
  js: 'wp-content/themes/' + themeName + '/dist/assets/js/',
  sass: 'wp-content/themes/' + themeName + '/dist/styles/*'
}

var OUT = {
  js: 'wp-content/themes/' + themeName + '/dist/assets/js/',
  css: 'wp-content/themes/' + themeName + '/'
}

// Error
function customPlumber(errTitle) {
  return plumber({
    errorHandler: notify.onError({
          // Customizing error title
          title: "Error running " + errTitle || "Error running Gulp"
        })
    });
}

// ******************** Tasks
// Sass
gulp.task('sass', function() {
  return gulp.src(IN.sass + 'style.scss')
    .pipe(autoprefixer())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(concat('style.css', {newLine: ''}))
    .pipe(gulp.dest(OUT.css));
});

// Scripts
gulp.task('scripts', function() {
  return gulp.src(IN.js + 'custom.js')
    .pipe(customPlumber('Scripts'))
    .pipe(newer(OUT.js + 'custom.min.js'))
    .pipe(concat('custom.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(OUT.js));
});

// Cache
gulp.task('cache', function () {
  return cache.clearAll();
});

// Browser-sync
gulp.task('browserSync', ['sass', 'scripts', 'cache'], function() {
  browserSync.init([OUT.css + '*', IN.sass + '/*', OUT.js + '*', './**/*.php'], {
    proxy: serverAlias,
    port: 8080
  })
});

// Watch
gulp.task('watch', ['browserSync'], function() {
  gulp.watch([IN.sass + '/*.scss'], ['sass']);
  gulp.watch([IN.js + '*.js'], ['scripts']);
  gulp.watch( './**/*.php' ).on( 'change', function( file ) {
    browserSync.reload();
  });
})

// Default
gulp.task('default', ['watch']);
```
