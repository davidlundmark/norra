var gulp = require('gulp');
var watch = require('gulp-watch');

var source = '../';
var project_destination = 'C:/projects/dev/src/Project/Norra/code/src/';
var wwwroot_destination = 'C:/inetpub/wwwroot/Norra/Website/src/';

gulp.task('default', ['watch:sync-project', 'watch:sync-wwwroot', 'webpack:watch']);

//sync files to VS project
gulp.task('watch:sync-project', function() {
    gulp.src(source, { base: source })
        //.pipe(watch(source + 'assets/' + '/**/*', { base: source + 'assets/' }))
        .pipe(watch(source + 'assets/', { base: source }))
        .pipe(watch(source + 'scripts.min.js', { base: source }))
        .pipe(watch(source + 'styles.min.css', { base: source }))
        .pipe(gulp.dest(project_destination));
});

//sync files to wwwroot
gulp.task('watch:sync-wwwroot', function() {
    gulp.src(source, { base: source })
        //.pipe(watch(source + 'assets/' + '/**/*', { base: source + 'assets/' }))
        .pipe(watch(source + 'assets/', { base: source }))
        .pipe(watch(source + 'scripts.min.js', { base: source }))
        .pipe(watch(source + 'styles.min.css', { base: source }))
        .pipe(gulp.dest(wwwroot_destination));
});

//trigger webpack --watch
var spawn = require('cross-spawn');

gulp.task('webpack:watch', (cb) => {
  const webpack_watch = spawn('webpack', ['--watch --progress --colors']);

  webpack_watch.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });

  webpack_watch.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  webpack_watch.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});

