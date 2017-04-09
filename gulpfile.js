var gulp = require('gulp'),
	imagemin = require('gulp-imagemin'),
	pngquant = require('imagemin-pngquant');


//image min
gulp.task('imagemin',function(){
	
	gulp.src('src/assets/img/*.{png,jpg,gif,ico}')
		.pipe(imagemin({
			optimizationLevel: 1,
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],//不要移除svg的viewbox属性
            use: [pngquant()] //使用pngquant深度压缩png图片的imagemin插件
        }))
		.pipe(gulp.dest('dist/assets/img/'));
});