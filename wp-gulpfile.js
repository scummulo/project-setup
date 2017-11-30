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
  js: 'wp-content/themes/' + themeName + '/assets/js/',
  sass: 'wp-content/themes/' + themeName + '/dist/styles/*'
}

var OUT = {
  js: 'wp-content/themes/' + themeName + '/assets/js/',
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
