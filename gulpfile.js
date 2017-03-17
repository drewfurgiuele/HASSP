'use strict';

let gulp = require('gulp');  
let ts = require('gulp-typescript');  
let mocha = require('gulp-mocha');
let runSequence = require('run-sequence');

let typescriptSources = ['src/**/*.ts'];
let unitTestSources = ['release/unit-tests/**/*.js'];
let releaseDirectory = 'release';

let tsProject = ts.createProject('./tsconfig.json'); 

gulp.task('compileTypeScript', () => {
    return gulp.src(typescriptSources)
        .pipe(tsProject())
        .pipe(gulp.dest(releaseDirectory));
});

gulp.task('build', [
    'compileTypeScript'
]);

gulp.task('watch', () => {
    return gulp.watch(typescriptSources, () => {
        runSequence('build', 'runTests');
    });
})

gulp.task("runTests", () => {
    gulp.src(unitTestSources, {read: false})
        .pipe(mocha({reporter: 'spec'}));
});

gulp.task('test', (callback) => {
    runSequence('build', 'runTests', callback);
});

gulp.task('default', [
    'build'
]);