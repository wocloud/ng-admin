/**
 * Created by sophia.wang on 17/3/6.
 */
'use strict';

var gulp = require('gulp'),
    less = require('gulp-less'),
    cleancss = require('gulp-clean-css'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    livereload = require('gulp-livereload'),
    rev = require('gulp-rev'),//添加时间戳
    revCollector = require('gulp-rev-collector'),//时间戳添加后在html 里面替换原有的文件;
    minifyHTML   = require('gulp-minify-html');

//styles
gulp.task('less', function() {
    return gulp.src('src/main/webapp/sources/style/**.less')
        .pipe(less())
        .pipe(concat('app.css'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(rev())
        .pipe(cleancss())
        //.pipe(gulp.dest('src/main/webapp/dist/css'))
        .pipe(gulp.dest('src/main/webapp/css'))
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('src/main/webapp/rev/css'))
        .pipe(notify({ message: 'Less task compvare' }));
});

//directives
gulp.task('directives', function() {
    return gulp.src('src/main/webapp/sources/js/directives/**.js')
        .pipe(concat('directives.js'))
        .pipe(rename({ suffix: '.min' }))
        //.pipe(rev())
        .pipe(uglify())
        //.pipe(gulp.dest('src/main/webapp/dist/js'))
        .pipe(gulp.dest('src/main/webapp/js/directives'))
        //.pipe(rev.manifest())
        //.pipe(gulp.dest('src/main/webapp/rev/js'))
        .pipe(notify({ message: 'Directives task compvare' }));
});

//rev
gulp.task('rev', function() {
    return gulp.src(['src/main/webapp/rev/**/*.json', 'src/main/webapp/*.html'])
        .pipe( revCollector({
            replaceReved: true,
            dirReplacements: {
                'css': 'src/main/webapp/dist/css',
                '/js/': 'src/main/webapp/dist/js',
                'cdn/': function(manifest_value) {
                    return '//cdn' + (Math.floor(Math.random() * 9) + 1) + '.' + 'exsample.dot' + '/img/' + manifest_value;
                }
            }
        }) )
        .pipe( minifyHTML({
            empty:true,
            spare:true
        }) )
        .pipe( gulp.dest('src/main/webapp/dist') );
});

//gulp.task('default', ['less', 'directives', 'rev']);
gulp.task('default', ['less', 'directives']);

//watch all files change
gulp.task('watch', function() {

    gulp.watch('src/main/webapp/style/**.less', ['less']);

    livereload.listen();

});
