var gulp = require('gulp');
//压缩html  gulp-htmlclean
var htmlClean = require('gulp-htmlclean');
//压缩图片 gulb-imagemin
var imageMin = require('gulp-imagemin');
//压缩js gulb-uglify
var uglify = require('gulp-uglify');
//去掉调试语句
var debug = require('gulp-strip-debug');
//less -> css gulp-ledd
var less = require('gulp-less');
//压缩css gulb-clean-css
var cleanCss = require('gulp-clean-css');
//添加前缀 gulp-postcss autoprefixer
var Postcss = require('gulp-postcss');
var Autoprefixer = require('autoprefixer');
//开启服务器 gulp-connect
var connect = require('gulp-connect');
var folder = {
    src: 'src/',
    dist: 'dist/'
}
//判断当前环境变量
var devMod = process.env.NODE_ENV == 'development'
// export NODE_ENV=development 设置环境变量
gulp.task('html', function () {
    var html = gulp.src(folder.src + 'html/*')
        .pipe(connect.reload())
    if (!devMod) {
        html.pipe(htmlClean())
    }
    html.pipe(gulp.dest(folder.dist + 'html/'))
})
gulp.task('image', function () {
    gulp.src(folder.src + 'image/*')
        .pipe(imageMin())
        .pipe(gulp.dest(folder.dist + 'image/'))
})
gulp.task('css', function () {
    var css = gulp.src(folder.src + 'css/*')
        .pipe(connect.reload())
        .pipe(less())
        .pipe(Postcss([Autoprefixer()]))
    if (!devMod) {
        css.pipe(cleanCss())
    }

    css.pipe(gulp.dest(folder.dist + 'css/'))
})
gulp.task('js', function () {
    var js = gulp.src(folder.src + 'js/*')
            .pipe(connect.reload())
    if (!devMod) {
        js.pipe(uglify())
            .pipe(debug())
    }
    js.pipe(gulp.dest(folder.dist + 'js/'))
})
gulp.task('server', function () {
    connect.server({
        port: "8888",
        livereload: true,
        open: true
    });
})
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*', ['html'])
    gulp.watch(folder.src + 'css/*', ['css'])
    gulp.watch(folder.src + 'js/*', ['js'])
})
gulp.task('default', ['html', 'css', 'js', 'image', 'server', 'watch']);
