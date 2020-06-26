const { src, dest, parallel } = require('gulp');
const { series } = require('gulp');
const del = require('del');
const path = require('path');
const slash = require('slash');
const ts = require('gulp-typescript');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const shell = require('gulp-shell');


const TYPEDOC_THEME = {
    SRC: slash(path.join(__dirname, 'src')),
    DIST: slash(path.join(__dirname, 'dist')),
    STYLES: {
        ENTRY: slash(path.join('assets', 'css', 'main.sass')),
        OUT: slash(path.join('assets','css')),
        MAPS: slash(__dirname),
        CONFIG: {
            outputStyle: 'compressed'
        }
    }
};

const typedocCopyImages = () => {
  return src(slash(path.join(TYPEDOC_THEME.SRC, 'assets', 'images/**/*.{png,gif,jpg,svg}')))
    .pipe(dest(slash(path.join(TYPEDOC_THEME.DIST, 'assets', 'images'))));
};
typedocCopyImages.displayName = 'typedoc:copy-images';

const typedocCleanImages = async () => {
  return await del(slash(path.join(TYPEDOC_THEME.DIST, 'assets', 'images')), { force: true });
};
typedocCleanImages.displayName = 'typedoc:clean-images';

const typedocCopyHBS = () => {
  return src([
    slash(path.join(TYPEDOC_THEME.SRC, 'layouts/**/*')),
    slash(path.join(TYPEDOC_THEME.SRC, 'partials/**/*')),
    slash(path.join(TYPEDOC_THEME.SRC, 'templates/**/*')),
  ], {
    base: TYPEDOC_THEME.SRC
  })
  .pipe(dest(TYPEDOC_THEME.DIST));
};
typedocCopyHBS.displayName = 'typedoc:copy-hbs';

const typedocCleanHBS = async () => {
  return await del([
    slash(path.join(TYPEDOC_THEME.DIST, 'layouts')),
    slash(path.join(TYPEDOC_THEME.DIST, 'partials')),
    slash(path.join(TYPEDOC_THEME.DIST, 'templates')),
  ], { force: true });
};
typedocCleanHBS.displayName = 'typedoc:clean-hbs';

const typedocCopyStyles = () => {
  const prefixer = postcss([autoprefixer({
    overrideBrowserslist: ['last 5 versions', '> 3%'],
    cascade: false,
    grid: false
  })]);

  return src(slash(path.join(TYPEDOC_THEME.SRC, TYPEDOC_THEME.STYLES.ENTRY)))
    .pipe(sourcemaps.init())
    .pipe(sass.sync(TYPEDOC_THEME.STYLES.CONFIG).on('error', sass.logError))
    .pipe(prefixer)
    .pipe(sourcemaps.write('./'))
    .pipe(dest(slash(path.join(TYPEDOC_THEME.DIST, TYPEDOC_THEME.STYLES.OUT))));
};
typedocCopyStyles.displayName = 'typedoc:copy-styles';

const typedocCleanStyles = async () => {
  return await del(slash(path.join(TYPEDOC_THEME.DIST, 'assets', 'css')), { force: true });
};
typedocCleanStyles.displayName = 'typedoc:clean-styles';

const typedocMinifyJS = (cb) => {
  src([
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'lib', 'jquery-2.1.1.min.js')),
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'lib', 'underscore-1.6.0.min.js')),
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'lib', 'backbone-1.1.2.min.js')),
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'lib', 'lunr.min.js')),
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'src', 'navigation/igviewer.common.js')),
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'src', 'navigation/igviewer.renderingService.js')),
    slash(path.join(TYPEDOC_THEME.SRC, 'assets','js', 'main.js'))
  ])
  .pipe(concat('main.js'))
  .pipe(dest(slash(path.join(TYPEDOC_THEME.DIST, 'assets', 'js'))));
  
  cb();
};
typedocMinifyJS.displayName = 'typedoc:minify-js';

const typedocCleanJS = async () => {
  return await del(slash(path.join(TYPEDOC_THEME.DIST, 'assets', 'js')), { force: true });
};
typedocCleanJS.displayName = 'typedoc:clean-js';

const typedocBuildTS = async () => {
  const buildTs = shell.task(`tsc --project ${path.join(__dirname, 'tsconfig.json')}`);
  return await buildTs();
};
typedocBuildTS.displayName = 'typedoc:build-ts';

module.exports.typedocBuild = parallel(
  series(typedocCleanImages, typedocCopyImages),
  series(typedocCleanStyles, typedocCopyStyles),
  
  series(
    typedocCleanJS,
    typedocBuildTS, 
    typedocMinifyJS),
     
  series(typedocCleanHBS, typedocCopyHBS),
);