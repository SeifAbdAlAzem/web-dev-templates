// Importing required modules
import gulp from 'gulp';               // Gulp task runner
import sass from 'gulp-dart-sass';     // Sass compiler for Gulp
import pug from 'gulp-pug';            // Pug (formerly Jade) template engine for Gulp
import gulpPrefixer from 'gulp-autoprefixer';       // Automatic CSS prefixer for Gulp
import sourceMaps from 'gulp-sourcemaps'; // Source mapping support for Gulp
import notify from 'gulp-notify';      // Notification plugin for Gulp
import zip from 'gulp-zip';            // Zip compression plugin for Gulp


// Define paths for source and destination files
const paths = {
    styles: {
        src: 'src/sass/main.scss',    // Source Sass file
        dest: 'dist/css/'              // Destination directory for compiled CSS
    },
    pugPath: {
        src: 'src/pug/*.pug',          // Source Pug (HTML) files
        dest: 'dist/'                  // Destination directory for compiled HTML
    }
};

/**
 * Task: Compile SASS
 * Description: Compiles the specified Sass file into CSS and saves the compiled CSS file to the distribution directory.
 * Usage: Run 'gulp compileSASS' in the terminal to execute this task.
 */

gulp.task('compileSASS', () => {
    return gulp.src(paths.styles.src)
            .pipe(sourceMaps.init()) // Initialize sourcemaps
            .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError)) // Compile Sass with expanded output style
            .pipe(gulpPrefixer())
            .pipe(sourceMaps.write('.')) // Write sourcemaps
            .pipe(gulp.dest(paths.styles.dest)) // Output compiled CSS
            .pipe(notify('The SASS Files are compiled')); // Notify on successful compilation
});

/**
 * Task: Compile Pug
 * Description: Compiles the specified Pug template file into HTML and saves the compiled HTML file to the distribution directory.
 * Usage: Run 'gulp compilePug' in the terminal to execute this task.
 */

gulp.task('compilePug', function () {
    return gulp.src(paths.pugPath.src)
            .pipe(pug({ pretty: true }))    // Compile Pug templates with pretty formatting
            .pipe(gulp.dest(paths.pugPath.dest))      // Output compiled HTML
});

/**
 * Task: Compress Project
 * Description: Compresses the contents of the './dist/' directory into a ZIP archive named 'archive.zip'.
 * The resulting ZIP archive is saved to the './compressed/' directory.
 * Usage: Run 'gulp compressProject' in the terminal to execute this task.
 */

gulp.task('compressProject', function () {
    return gulp.src('./dist/**/*.*')
            .pipe(zip('archive.zip')) // Compress files into a ZIP archive
            .pipe(gulp.dest('./compressed'))        // Output compressed file
            .pipe(notify({ message: 'Project compressed successfully', onLast: true }));    // Notify on successful compression
});

/**
 * Task: Watch Tasks
 * Description: Watches for changes in files within the './src/' directory and triggers compilation tasks accordingly.
 * Usage: Run 'gulp watchTasks' in the terminal to execute this task.
 */

gulp.task('watchTasks', function () {
    // Watch Sass and Pug files for changes and trigger respective compilation tasks
    gulp.watch(paths.styles.src, gulp.series('compileSASS'));
    gulp.watch(paths.pugPath.src, gulp.series('compilePug'));
});

/**
 * Task: default
 * Description: Sets the default task to 'watchTasks'.
 * When 'gulp' is executed without specifying a task, 'watchTasks' will be executed by default.
 * Usage: Run 'gulp' in the terminal to execute the default task.
 */
gulp.task('default', gulp.series('watchTasks'));