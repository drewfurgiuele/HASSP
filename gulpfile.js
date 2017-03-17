'use strict';

let gulp = require('gulp');  
let ts = require('gulp-typescript');  

let typescriptSources = ['src/**/*.ts'];
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
    return gulp.watch(typescriptSources, ['build']);
})

gulp.task('default', [
    'build'
]);