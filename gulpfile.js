// gulpfile.js
let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    babel = require('gulp-babel'),
    terser = require('gulp-terser'),
    del = require('del'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    svgmin = require('gulp-svgmin'),
    svgSprite = require('gulp-svg-sprite')

gulp.task('clean', async function () {
    del.sync('dist')
})

gulp.task('svgSprite', function () {
    return gulp
        .src('app/img/icons/*.svg')
        .pipe(
            svgSprite({
                mode: {
                    symbol: {
                        sprite: '/app/sprite.svg',
                    },
                    css: {
                        dest: '/app/img/sprite',
                        render: {
                            scss: true,
                            dest: '/app/sass/_sprite.scss',
                        },
                    },
                },
                shape: {
                    maxHeight: 32,
                },
            })
        )
        .pipe(gulp.dest('app/img/sprite/'))
})

gulp.task('sass', function () {
    return gulp
        .src('app/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'expanded' }).on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('css', function () {
    return gulp
        .src([
            'node_modules/normalize.css/normalize.css',
            'node_modules/bootstrap-4-grid/css/grid.min.css',
            'app/libs/Slick/slick.css',
            'app/libs/Slick/slick-theme.css',
        ])
        .pipe(concat('_libs.css'))
        .pipe(gulp.dest('app/sass'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('html', function () {
    return gulp.src('app/*.html').pipe(browserSync.reload({ stream: true }))
})

gulp.task('js', function () {
    return gulp
        .src('app/js/main.js')
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('libs', function () {
    return gulp
        .src([
            'app/libs/jQuery/jquery.slim.min.js',
            'app/libs/Slick/slick.min.js',
        ])
        .pipe(concat('libs.min.js'))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.reload({ stream: true }))
})

gulp.task('watch', function () {
    gulp.watch('app/sass/**/*.sass', gulp.parallel('sass'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('js'))
})

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: 'app/',
        },
    })
})

gulp.task(
    'default',
    gulp.parallel(
        'css',
        'sass',
        // 'svgSprite',
        'js',
        'libs',
        'browser-sync',
        'watch'
    )
)

gulp.task('export', async function () {
    let buildHtml = gulp.src('app/*.html').pipe(gulp.dest('dist'))
    let buildCss = gulp
        .src('app/sass/**/*.sass')
        .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
        .pipe(
            autoprefixer({
                cascade: false,
                overrideBrowserslist: ['> 1%', 'last 7 versions'],
            })
        )
        .pipe(gulp.dest('dist/css'))
    let buildJs = gulp
        .src('app/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(
            babel({
                presets: ['@babel/env'],
            })
        )
        .pipe(terser())
        .pipe(sourcemaps.write())
        // .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('dist/js'))
    let buildLibsJs = gulp
        .src('app/js/libs.min.js')
        .pipe(terser())
        .pipe(gulp.dest('dist/js'))
    let buildFonts = gulp
        .src('app/fonts/**/*.*')
        .pipe(gulp.dest('dist/fonts'))
    let buildSvg = gulp
        .src('app/img/*.svg')
        .pipe(svgmin())
        .pipe(gulp.dest('dist/img'))
    let buildImg = gulp.src('app/img/**/*.*').pipe(gulp.dest('dist/img'))
    let buildSprite = gulp.src('app/sprite.svg').pipe(gulp.dest('dist'))
})

gulp.task('build', gulp.series('clean', 'export'))
