// Require all the things
const gulp = require('gulp'),
      argv  = require('yargs').argv,
      when = require('gulp-if'),
      browserSync = require('browser-sync').create(),
      sass = require('gulp-sass'),
      plumber = require('gulp-plumber'),
      rename = require('gulp-rename'),
      minifyCSS = require('gulp-clean-css'),
      prefixer = require('gulp-autoprefixer'),
      minify = require('gulp-uglify'),
      htmlmin = require('gulp-htmlmin'),
      watch = require('gulp-watch'),
      critical = require('critical'),
      shell = require('gulp-shell'),
      download = require('gulp-download');

// Set the path variables
const base_path = './',
  src = base_path + 'assets',
  dist = base_path + 'assets',
  paths = {
    js: src + '/js/*.js',
    scss: [ src +'/css/*.scss',
            src +'/css/**/* .scss',
            src +'/css/**/**/*.scss'],
    jekyll: ['index.html', '_posts/*', '_pages/*', '_layouts/*', '_includes/*' , 'assets/*', 'assets/**/*'],
    html: [
            base_path +'_site/index.html',
            base_path +'_site/*/*.html',
            base_path +'_site/**/*/*.html',
            base_path +'_site/*.html',
          ]
  };

// Compile sass to css
gulp.task('compile-sass', () => {
  gulp.src(paths.scss)
    .pipe( plumber((error) => {
        gulp.task('compile-sass').emit('end');
      })
    )
    .pipe(sass())
    .pipe(when(argv.prod, prefixer('last 3 versions', 'ie 9') ))
    .pipe(when(argv.prod, minifyCSS() ))
    .pipe(rename({dirname: dist + '/css'}))
    .pipe(gulp.dest('./'))
});

// Critical CSS
gulp.task('critical-css', function () {
  return gulp.src('assets/css/critical.scss')
    .pipe(plumber((error) => {
      gulp.task('critical-css').emit('end');
    }))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: ['scss']
    }))
    .pipe(prefixer('last 3 versions', 'ie 9'))
    .pipe(when(argv.prod, minifyCSS() ))
    .pipe(gulp.dest('_includes/critical'));
});
gulp.task('critical', function () {
  critical.generate({
    base: './',
    src: '_site/index.html',
    css: '_site/assets/css/style.css',
    dest: '_includes/critical/critical.css',
    width: 320,
    height: 480,
    minify: true
  });
});

// Minify JS
gulp.task('compress-js', function () {
  return gulp.src(paths.js)
    .pipe(plumber())
    .pipe(when(argv.prod, minify()))
    .pipe(gulp.dest(src + '/js/dist'))
    .on('error', function(err) {
      console.error('Error in compress task', err.toString());
    });
});

// Minify HTML
gulp.task('minify-html', function() {
  return gulp.src("./_site/index.html")
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, gulp.dest("./_site")))

  return gulp.src("./_site/**/*.html")
    .pipe(when(argv.prod, htmlmin({
      removeComments: true,
      collapseWhitespace: true,
      collapseBooleanAttributes: false,
      removeAttributeQuotes: false,
      removeRedundantAttributes: false,
      minifyJS: true,
      minifyCSS: true
    })))
    .pipe(when(argv.prod, gulp.dest("./_site/./")))
});

// Google Analytics
gulp.task('fetch-newest-analytics', function() {
  return download('https://www.google-analytics.com/analytics.js')
    .pipe(when(argv.prod, gulp.dest('./assets/js')));
});

// Rebuild Jekyll
gulp.task('build-jekyll', (code) => {
  if (!argv.prod) {
    gulp.task('build-jekyll', shell.task(['bundle exec jekyll build --incremental --config _config.yml,_config.dev.yml']));
  } else if (argv.prod) {
    gulp.task('build-jekyll', shell.task(['JEKYLL_ENV=production jekyll build']));
  }
})

// Setup Server
gulp.task('sync', function () {
  browserSync.init({
    server: "./_site",
    port: 4000,
    browser: "google chrome"
  });
});

// Watch files
gulp.task('watch', () => {
  gulp.watch(paths.js, ['compress-js']);
  gulp.watch(paths.scss, ['critical-css']);
  gulp.watch(paths.scss, ['compile-sass']);
  gulp.watch(paths.html, ['minify-html']);
  gulp.watch(['fetch-newest-analytics']);
  gulp.watch(paths.jekyll, ['build-jekyll']);
  gulp.watch('_site/**/*.*').on('change', browserSync.reload);
});

// Start Everything with the default task
gulp.task('default', [ 'compress-js', 'compile-sass', 'minify-html', 'fetch-newest-analytics', 'build-jekyll', 'sync', 'watch' ]);
