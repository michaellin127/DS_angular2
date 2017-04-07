/**
 * System configuration for Angular 2 samples
 * Adjust as necessary for your application needs.
 */
(function(global) {
	// map tells the System loader where to look for things
	var map = {
		'app':                        'dist', // 'app',
		'text':                       'systemjs-text-plugin.js',
		'@angular':                   'node_modules/@angular',
		'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
		'rxjs':                       'node_modules/rxjs',
		'moment':                     'node_modules/moment/moment.js',
		'angular2-jwt':               'node_modules/angular2-jwt/',
		'ng2-validation':			  'node_modules/ng2-validation/dist/',
		'ng2-validators':			  'node_modules/ng2-validators/',
		'angular2-infinite-scroll':	  'node_modules/angular2-infinite-scroll/',
		'@types':					  'node_modules/@types',
		// '@angular/material': 		  'node_modules/@angular/material/material.umd.js',
		'angular2-mdl': 			  'node_modules/angular2-mdl'
	};
	// packages tells the System loader how to load when no filename and/or no extension
	var packages = {
		'app':                        { main: 'main.js',  defaultExtension: 'js' },
		'rxjs':                       { defaultExtension: 'js' },
		'angular2-in-memory-web-api': { main: 'index.js', defaultExtension: 'js' },
		'angular2-jwt':               { main: 'angular2-jwt', defaultExtension: 'js' },
		'ng2-validation':             { main: 'index', defaultExtension: 'js' },
		'ng2-validators':			  { main: 'index', defaultExtension: 'js' },
		'angular2-infinite-scroll':	  { main: 'angular2-infinite-scroll', defaultExtension: 'js' },
		'angular2-mdl': 			  { main: 'bundle/angular2-mdl.js'}
	};
	var ngPackageNames = [
		'common',
		'compiler',
		'core',
		'forms',
		'http',
		'platform-browser',
		'platform-browser-dynamic',
		'router',
		'router-deprecated',
		'upgrade'
	];
	// Individual files (~300 requests):
	function packIndex(pkgName) {
		packages['@angular/'+pkgName] = { main: 'index.js', defaultExtension: 'js' };
	}
	// Bundled (~40 requests):
	function packUmd(pkgName) {
		packages['@angular/'+pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
	}
	// Most environments should use UMD; some (Karma) need the individual index files
	var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
	// Add package entries for angular packages
	ngPackageNames.forEach(setPackageConfig);
	var config = {
		map: map,
		packages: packages
	};
	System.config(config);
})(this);
