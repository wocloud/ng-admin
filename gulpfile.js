/**
 * Created by sophia.wang on 17/3/6.
 */
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload');

//styles
gulp.task('less', function() {
    return gulp.src('src/main/webapp/style/*.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('css/'))
        .pipe(notify({ message: 'Less task compvare' }));
});

//watch all files change
gulp.task('watch', function() {

    gulp.watch('src/app/*.less', ['less']);

    livereload.listen();

});
