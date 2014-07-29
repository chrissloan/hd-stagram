var gulp      = require('gulp'),
    coffee    = require('gulp-coffee'),
    concat    = require('gulp-concat'),
    ngmin     = require('gulp-ngmin'),
    uglify    = require('gulp-uglify'),
    gutil     = require('gulp-util'),
    karma     = require('gulp-karma'),
    ngHtml2Js = require("gulp-ng-html2js");

var file_name     = 'hdStagram.js',
    min_file_name = 'hdStagram.min.js';

var paths = {
  coffee   : './src/coffee/*.coffee',
  js_dest  : './src/js/',
  js       : './src/js/*.js',
  dist     : './dist/',
  demo     : './demo/',
  min      : './dist/hdStagram.min.js',
  test     : './test/*.spec.js',
  templates: './src/templates/*.html'
};

gulp.task('coffee', function() {
  gulp.src(paths.coffee)
    .pipe(coffee({bare: true})).on('error', gutil.log)
    .pipe(gulp.dest(paths.js_dest))
});

gulp.task('templates', function(){
  gulp.src(paths.templates)
    .pipe(ngHtml2Js({
        moduleName: "haideeStagram.templates",
        prefix: "/templates/"
    }))
    .pipe(gulp.dest(paths.js_dest));
});

gulp.task('concat', function() {
  gulp.src(paths.js)
    .pipe(concat(file_name))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minify', function() {
  gulp.src(paths.js)
    .pipe(concat(min_file_name))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('ngMin', function () {
  gulp.src(paths.min)
    .pipe(ngmin())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('uglify', function() {
  gulp.src(paths.min)
    .pipe(uglify())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('test', function() {
  gulp.src('./faker')
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: 'watch'
  }))
  .on('error', function(err) {
    throw err;
  });
});

gulp.task('copy_to_demo', function(){
  gulp.src('./dist/hdStagram.js')
    .pipe(gulp.dest(paths.demo));
});

gulp.task('build', ['concat', 'minify', 'uglify', 'copy_to_demo']);

gulp.task('watch', function(){
  gulp.watch(paths.coffee, ['coffee']);
  gulp.watch(paths.templates, ['templates']);
  gulp.watch(paths.js, ['build']);
});

gulp.task('default', ['templates', 'coffee', 'build', 'watch']);
