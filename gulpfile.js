'use strict';

let gulp = require('gulp');  
let ts = require('gulp-typescript');  

let typescriptSources = ['src/**/*.ts'];
let releaseDirectory = 'release';

let tsProject = ts.createProject('./tsconfig.json'); 

gulp.task('compile.TypeScript', () => {
    return gulp.src(typescriptSources)
        .pipe(tsProject())
        .pipe(gulp.dest(releaseDirectory));
});

gulp.task('compile', [
    'compile.TypeScript'
]);

gulp.task('build', [
    'compile'
]);

gulp.task('default', [
    'build'
]);