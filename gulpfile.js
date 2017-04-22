var addStream = require('add-stream');
var gulp = require('gulp');
var nodemon = require('nodemon');
//var gulpInject = require('gulp-inject');
var concat = require('gulp-concat');
var concatCss = require('gulp-concat-css');
var cssNano = require('gulp-cssnano');
var rename = require('gulp-rename');
var sourceMaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var ts = require('gulp-typescript');
var tslint = require('gulp-tslint');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var debug = require('gulp-debug');
var path = require('path');
var wiredep = require('wiredep').stream;
var _ = require('underscore');
var del = require('del');
var tsProject = ts.createProject('tsconfig.json');
//var gulpIf = require('gulp-if');
//var gulpOrder = require('gulp-order');
var $ = require('gulp-load-plugins')({ lazy: true });
//var jshint = require('gulp-jshint');

var tsFiles = ['public/dist/**/*.ts']

gulp.task('clean-dist', function (done) {
	return del(['public/dist/**/*'], done);
});

// Lint to keep us in line
gulp.task('lint', function () {
	return gulp
		.src(tsFiles)
		.pipe(debug())
		.pipe(tslint())
		.pipe(tslint.report('default'));
});

// gulp.task('style', function() {
// 	gulp.src(tsFiles).pipe(jshint()).pipe(jshint.reporter('jshint-stylish', {
// 		verbose: true
// 	}));
// });

// Concatenate & minify JS
gulp.task('scripts', ['clean-dist', 'lint'], function () {

	return gulp
		.src([
			'public/src/app/app.module.ts',
			'public/src/app/**/*.entity.ts',
			'public/src/app/**/*.module.ts',
			'public/src/app/**/*.service.ts',
			'public/src/app/**/*.component.ts'
		])
		.pipe(debug())
		// .pipe(addStream.obj(prepareTemplates()))
		.pipe(sourceMaps.init())
		.pipe(ts(tsProject))
		// .pipe(ts({
		// 	noImplicitAny: true,
		// 	suppressImplicitAnyIndexErrors: true,
		// 	out: 'app.js'
		// }))
		.pipe(debug())
		.pipe(gulp.dest('public/dist'))
		// .pipe(rename('app.min.js'))
		//.pipe(uglify())
		.pipe(sourceMaps.write('.'))
		.pipe(gulp.dest('public/dist'));
});

// Compile, concat & minify sass
gulp.task('sass', function () {
	return gulp.src('public/src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('public/dist/css'));
});

gulp.task('concatCss', ['sass'], function () {
	return gulp.src('public/dist/css/**/*.css')
		.pipe(concatCss("app.css"))
		.pipe(gulp.dest('public/dist'))
});

gulp.task('cssNano', ['sass', 'concatCss'], function () {
	return gulp.src('public/dist/app.css')
		.pipe(cssNano())
		.pipe(rename({ suffix: '.min' }))
		.pipe(gulp.dest('public/dist'));
});

gulp.task('copyLibs', function () {
	return gulp
		.src(['public/lib/**/*.min.js', 'public/lib/**/*.min.css', 'public/lib/**/fontawesome*.*'])
		.pipe(debug())
		.pipe(gulp.dest('public/dist/lib'));
});

gulp.task('copyFiles', function () {
	return gulp
		.src(['public/index.html', 'public/src/app/**/*.html', 'public/src/app/**/*.json'])
		.pipe(debug())
		.pipe(gulp.dest('public/dist'));
});

gulp.task('copyLayoutFile', function () {
	return gulp
		.src(['public/layout/topnav.html'])
		.pipe(debug())
		.pipe(gulp.dest('public/dist/layout'));
});

gulp.task('inject1', function () {

	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	return gulp
		.src('./dist/**/*.html')
		.pipe(wiredep(options))
		.pipe(gulp.dest('./public'));
});

gulp.task('clean', function () {
	return del([
		'./public/dist/**/*'
	]);
});

// Inject dist + bower lib files
gulp.task('inject', function () {

	// inject our dist files
	// var injectSrc = gulp.src([
	// 	'./public/dist/app.css',
	// 	'./public/dist/app.js'
	// ], { read: false });

	// var injectSrc = gulp.src([
	// 	'./public/css/*.css',
	// 	'./public/dist/app.js',
	// 	'./public/dist/entities/*.js',
	// 	'./public/dist/services/*.js',
	// 	'./public/dist/vehicles/*.js',
	// 	'./public/dist/demo/*.js',
	// 	'./public/dist/things/*.js',
	// 	'./public/dist/components/*.js'
	// ], { read: false });

	var injectSrc = [
		'public/dist/css/*.css',
		'public/dist/app.module.js',
		'public/dist/entities/*.js',
		'public/dist/services/*.js',
		'public/dist/vehicles/*.js',
		'public/dist/demo/*.js',
		'public/dist/things/*.js',
		'public/dist/components/*.js'
	];

	log('injectSrc: ', injectSrc);

	var injectOptions = {
		ignorePath: '/public'
	};

	// inject bower deps
	var options = {
		bowerJson: require('./bower.json'),
		directory: './public/lib',
		ignorePath: '../../public'
	};

	var jsOrder = [
		'**/app.module.js',
		'**/*.entity.js',
		'**/*.module.js',
		'**/*.service.js',
		'**/*.component.js',
		'**/*.js'
	];

	return gulp.src('./public/index.html')
		.pipe(wiredep(options))
		.pipe(debug())
		.pipe(inject(injectSrc, '', jsOrder))
		.pipe(debug())
		.pipe(gulp.dest('./public'));

});

gulp.task('serve-dev', ['scripts', 'copyLibs', 'copyFiles', 'copyLayoutFile', 'inject'], function() {

});

/**
 * Inject files in a sorted sequence at a specified inject label
 * @param   {Array} src   glob pattern for source files
 * @param   {String} label   The label name
 * @param   {Array} order   glob pattern for sort order of the files
 * @returns {Stream}   The stream
 */
function inject(src, label, order) {

	log('src: ', src);
	log('order: ', order);

	var options = { read: false, ignorePath: '/public' };
	if (label) {
		options.name = 'inject:' + label;
	}

	return $.inject(orderSrc(src, order), options);
}

/**
 * Order a stream
 * @param   {Stream} src   The gulp.src stream
 * @param   {Array} order Glob array pattern
 * @returns {Stream} The ordered stream
 */
function orderSrc(src, order) {
	// order = order || ['**/*'];

	log('src: ', src);
	log('order: ', order);

	return gulp
		.src(src)
		.pipe(debug())
		.pipe($.if(order, $.order(order)));
}

/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
	if (typeof (msg) === 'object') {
		for (var item in msg) {
			if (msg.hasOwnProperty(item)) {
				$.util.log($.util.colors.yellow(msg[item]));
			}
		}
	} else {
		$.util.log($.util.colors.yellow(msg));
	}
}

gulp.task('serve', ['scripts', 'copyLayoutFile', 'copyLibs', 'copyFiles', 'inject'], function () {

	var options = {
		restartable: "rs",
		verbose: true,
		ext: "ts html scss",
		script: 'server.js',
		delayTime: 1,
		watch: ['public/src/**/*(*.ts|*.html)', 'public/src/**/*.scss'],
		env: {
			'PORT': 3002
		},
		ignore: ["public/dist/*", "public/dist/**/**"],
		// bit faster if we only do what we need to
		tasks: function (changedFiles) {
			var tasks = [];
			changedFiles.forEach(function (file) {
				var ext = path.extname(file);
				if (ext === '.ts' || ext === '.html') {
					tasks.push('lint');
					tasks.push('scripts');
				}
				else if (ext === '.scss') {
					tasks.push('sass');
					tasks.push('concatCss');
					tasks.push('cssNano');
				}
			});
			return tasks
		}
	};

	return nodemon(options)
		.on('restart', function (ev) {
			console.log('restarting..');
		});
});

// Default Task
gulp.task('default', ['lint', 'scripts', 'sass', 'concatCss', 'cssNano', 'inject', 'serve']);

function prepareTemplates() {

	// we get a conflict with the < % = var % > syntax for $templateCache
	// template header, so we'll just encode values to keep yo happy
	var encodedHeader = "angular.module(&quot;&lt;%= module %&gt;&quot;&lt;%= standalone %&gt;).run([&quot;$templateCache&quot;, function($templateCache:any) {";
	return gulp.src('public/src/**/*.html')
		.pipe(templateCache('templates.ts', {
			root: "app-templates",
			module: "app.templates",
			standalone: true,
			templateHeader: _.unescape(encodedHeader)
		}));
}

