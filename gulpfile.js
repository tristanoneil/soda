var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    mainBowerFiles = require('main-bower-files'),
    swig = require('gulp-swig'),
    concat = require('gulp-concat');

//
// Compile all application SCSS files
// to /dist/css
//
gulp.task('sass', function () {
  gulp.src('app/scss/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(reload({stream:true}));
});

//
// Concat all JS.
//
gulp.task('js', function() {
  var scripts = mainBowerFiles();
  scripts.push('app/js/**/*.js');

  gulp.src(scripts)
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/js'))
    .pipe(reload({stream:true}));
});

//
// Copy static files to dist
//
gulp.task('copy', function() {
  gulp.src('app/**/*.html')
    .pipe(swig({defaults: { cache: false }}))
    .pipe(gulp.dest('dist'))
    .pipe(reload({stream:true}));

  gulp.src('app/images/*')
    .pipe(gulp.dest('dist/images'));
});

//
// Setup browser sync server pointed at the dist folder
//
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'dist'
    }
  });
});

//
// Compile SASS, copy index and start browser sync server
// then watch for any changes.
//
gulp.task('default', ['sass', 'js', 'copy', 'browser-sync'], function () {
  gulp.watch('app/scss/*.scss', ['sass']);
  gulp.watch('app/js/*.js', ['js']);
  gulp.watch('app/**/*.html', ['copy']);
});
