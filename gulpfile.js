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

var src = process.cwd() + '/src';
var dist = process.cwd() + '/dist';

//extract all dependencies
gulp.task('extract', function() {
    
});


//styles
gulp.task('less', function() {
    return gulp.src('src/style/*.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('css/'))
        .pipe(notify({ message: 'Less task compvare' }));
});
gulp.task('styles', ['less', 'fonts'], function() {
    return gulp.src('src/assets/css/*.css')
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleancss())
        .pipe(gulp.dest('dist/css/'))
        .pipe(notify({ message: 'Styles task compvare' }));
});

//fonts
gulp.task('fonts', function() {
    return gulp.src('src/assets/fonts/**')
        .pipe(gulp.dest('dist/assets/fonts'))
        .pipe(notify({ message: 'Fonts task compvare' }));
});

// html
gulp.task('html', function() {
    return gulp.src('src/index.html')
        .pipe(gulp.dest('dist/'))
        .pipe(notify({ message: 'html task compvare' }));
});

//pages
gulp.task('pages', function() {
    return gulp.src('src/app/**/*.ts')
        .pipe(gulp.dest('dist/app/'))
        .pipe(notify({ message: 'pages task compvare' }));
});

// clean asserts
gulp.task('clean', function () {
    return gulp.src(dist, {read: true}).pipe(clean())
});

gulp.task('build', ['clean'], function () {
    gulp.start('styles', 'html', 'scripts', 'pages');
});

//default task
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'html', 'scripts', 'pages');
});

//watch all files change
gulp.task('watch', function() {

    gulp.watch('src/app/*.less', ['less']);

    gulp.watch('views/**/*.html');

    //gulp.watch('src/**/.ts', ['scripts']);

    //gulp.watch('src/index.html', ['html']) ;

    livereload.listen();

    gulp.watch(['dist/**']).on('change', livereload.changed);

});
