const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const purgecss = require('gulp-purgecss');

// This function will compile the SASS code into CSS code.
function buildStyles() {
    // specify path of source SASS/ SCSS file
    return src('src/EasyElegance/**/*.scss')

        // Compile SCSS to minified CSS and catch errors
        //.pipe(sass({ outputStyle: 'compressed' }).on("error", sass.logError))

        // Compile SCSS to normal CSS
        .pipe(sass().on("error", sass.logError))

        // Purge repeated css file
        .pipe(purgecss({ content: ['dest/**/*.html'] }))

        // Save the CSS output file in this path
        .pipe(dest('dest/css'))
}


// This function will actively our source SASS file and then when we make changes to that file and sace them, It is automatically will run this build styles function for us.
function watchTask() {
    watch(['src/EasyElegance/**/*.scss'], buildStyles)
}

// We need to export these functions from this file to start using it
exports.default = series(buildStyles, watchTask)


/*
/// First we need to import a few things from gup package.
// src, dest, watch, series functions.
/// Second we need to import the gulp sass plugin that we installed.
*/