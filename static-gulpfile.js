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
    port: 5000,
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
