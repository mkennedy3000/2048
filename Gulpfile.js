'use strict';

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();

//----------------------------------------------------------------------------------------------------------------------
// JS
//----------------------------------------------------------------------------------------------------------------------

gulp.task('js', ['templates'], function () {
    gulp.src([
        './bower_components/angular/angular.min.js',
        './bower_components/lodash/lodash.min.js',
        './tmp/templates.js',
        './src/app/**/*.js',
        '!./src/app/**/*.spec.js'
    ])
        .pipe(plugins.order([
            'bower_components/**/*',
            'src/app/**/*.module.js',
            'tmp/templates.js',
            'src/app/**/*.js'
        ], {base: './'}))
        .pipe(plugins.concat('app.js'))
        .pipe(gulp.dest('./dist/static/js'));
});

//----------------------------------------------------------------------------------------------------------------------
// SCSS
//----------------------------------------------------------------------------------------------------------------------

gulp.task('scss', function () {
    gulp.src('./src/scss/styles.scss')
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(gulp.dest('./dist/static/css'));
});

gulp.task('scss:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});

//----------------------------------------------------------------------------------------------------------------------
// HTML
//----------------------------------------------------------------------------------------------------------------------

gulp.task('copyIndexPage', function () {
    gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist'));
});

gulp.task('templates', function () {
    gulp.src('src/app/**/*.html')
        .pipe(plugins.angularTemplatecache('templates.js'))
        .pipe(gulp.dest('tmp'));
});

//----------------------------------------------------------------------------------------------------------------------
// Resources
//----------------------------------------------------------------------------------------------------------------------

gulp.task('copyImages', function () {

});

//----------------------------------------------------------------------------------------------------------------------
// Default tasks
//----------------------------------------------------------------------------------------------------------------------

gulp.task('default', [
    'js',
    'scss',
    'copyIndexPage'
]);