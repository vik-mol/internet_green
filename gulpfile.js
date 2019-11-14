"use strict";
const gulp = require('gulp');
const nunjucksRender = require('gulp-nunjucks-render');
const htmlbeautify = require('gulp-html-beautify');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync');
const gulpImagemin = require('gulp-imagemin');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const del = require('del');
const babel = require('gulp-babel');


// Js min
gulp.task('jsmin', function () {
  return gulp.src('build/scripts/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(uglify())
    .pipe(gulp.dest('build/scripts'));
});


// Concat and  compresed all libs
var scripts = [
  'src/dist/lib/scripts/jquery-3.4.1.js',
  'src/dist/lib/scripts/jquery.mask.js',
  'src/dist/scripts/main.js'
];

gulp.task('jscompain', function () {
  return gulp.src(scripts)
    .pipe(concat('libraries.js'))
    .pipe(uglify({
      "indent_char": "",
      "indent_level": 0,
      "indent_with_tabs": true,
      "preserve_newlines": true,
      "max_preserve_newlines": 1,
      "jslint_happy": true,
      "space_after_anon_function": true,
      "brace_style": "collapse",
      "keep_array_indentation": true,
      "keep_function_indentation": true,
      "space_before_conditional": true,
      "break_chained_methods": true,
      "eval_code": true,
      "unescape_strings": true,
      "wrap_line_length": 0,
      "wrap_attributes": "none",
      "wrap_attributes_indent_size": 0,
      "end_with_newline": true
    }))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('src/dist/lib'));
});

// Render tempaltes
gulp.task('render', function () {
  return gulp.src('src/templates/*.html')
    .pipe(nunjucksRender({
      path: 'src/templates/'
    }))
    .pipe(htmlbeautify())
    .pipe(gulp.dest('src'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

// SASS + autoprefixer
gulp.task('sass', function () {
  return gulp.src('./src/sass/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./src/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('jsbabel', function(){
  return gulp.src('src/es6/main.js')
  .pipe(babel({
    presets: ['@babel/env']
  }))
  .pipe(gulp.dest('src/scripts/'))
  .pipe(browserSync.reload({
    stream: true
  }));
});


// live server
gulp.task('server', function () {
  browserSync({
    server: {
      baseDir: './src/'
    },
    notify: false
  });
});


// Watching
gulp.task('watch', function () {
  gulp.watch('./src/sass/**/*.sass', gulp.series('sass'));
  gulp.watch(['./src/templates/**/*.html'], gulp.series('render'));
  gulp.watch('./src/es6/*.js', gulp.series('jsbabel'));
});


/*  From builds */

//Image min
gulp.task('img', function () {
  return gulp.src('src/dist/images/**/*.jpg')
    .pipe(gulpImagemin({
      interlaced: true,
      progressive: true,
      optimizationLevel: 5,
      svgoPlugins: [{
        removeViewBox: true
      }]
    }))
    .pipe(gulp.dest('build/images'))
});

// Css min
gulp.task('cssmin', function () {
  return gulp.src('src/dist/css/**/*.css')
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(cssnano())
    .pipe(autoprefixer())
    .pipe(gulp.dest('build/css'));
});


// Clean folder build
gulp.task('clean', async function () {
  return del.sync('build');
});

// Set project in build
gulp.task('carry', async function () {
  return gulp.src('src/dist/**/*')
    .pipe(gulp.dest('build'));
});


// build 
gulp.task('build', gulp.series('clean', 'carry', 'jsmin', 'cssmin', 'img'));

// Starting development
gulp.task('dev', gulp.series('sass', 'render', gulp.parallel('watch', 'server')));