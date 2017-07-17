const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const rename = require('gulp-rename');
const concat = require("gulp-concat");
const browserSync = require('browser-sync').create();

const config = {
		source: "./src/",
		dist: "./public",
};
const paths = {
	html: "**/*.html",
	sass: "assets/scss/**/*.scss",
	mainSass:"assets/scss/main.scss",
	images: "assets/img/*.*"
};

const sources = {
	html: config.source + paths.html,
	sass: config.source + paths.sass,
	rootSass: config.source + paths.mainSass,
	img: config.source + paths.images,
};

gulp.task("mover_html",()=>{
	gulp.src(sources.html)
		.pipe(gulp.dest(config.dist));
});

gulp.task("sass",()=>{
	gulp.src( sources.rootSass )
		.pipe( 
			sass({outputStyle: "compressed"})
				.on("error", sass.logError)  )
		.pipe( gulp.dest( config.dist + "/assets/css") )
});

gulp.task("js", ()=>{
	gulp.src("./src/assets/js/*.js")
		.pipe( concat('all.js') )
		.pipe( gulp.dest( "./public/assets/js" ) );
});

gulp.task("img",()=>{
	gulp.src(sources.img)
		.pipe(gulp.dest(config.dist + "/assets/img"));
});

gulp.task("sass-watch",["sass"],(done)=>{
	browserSync.reload();
	done();
});
gulp.task("js-watch",["js"],(done)=>{
	browserSync.reload();
	done();
});
gulp.task("html-watch",["mover_html"],(done)=>{
	browserSync.reload();
	done();
});

/*
Cambiamos el nombre de serve -> default
Al llamarse default bast con correr "gulp" en la terminal
En lugar de tener que escribir "gulp serve"
*/
gulp.task("default", ()=>{
	browserSync.init({
		server: {
			baseDir: "./public"
		}
	});
	gulp.watch("./src/assets/scss/**/*.scss", ["sass-watch"] );
	gulp.watch("./src/assets/js/*.js", ["js-watch"] );
	gulp.watch("./src/*.html", ["html-watch"] );
});