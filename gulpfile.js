/**
 * Created by sophia.wang on 17/3/6.
 */
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload');

//styles
gulp.task('less', function() {
    return gulp.src('src/main/webapp/style/**.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('src/main/webapp/css/'))
        .pipe(notify({ message: 'Less task compvare' }));
});

//watch all files change
gulp.task('watch', function() {

    gulp.watch('src/main/webapp/style/**.less', ['less']);

    livereload.listen();

});
