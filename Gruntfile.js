'use strict';

module.exports = function (grunt) {
	require('load-grunt-tasks')(grunt);
	require('time-grunt')(grunt);

	var config = {
		app: 'app',
		dist: 'dist'
	};

	grunt.initConfig({
		config: config,

		watch: {
			compass: {
				files: ['<%= config.app %>/sass/{,*/}*.{scss,sass}'],
				tasks: ['compass']
			},
			jade: {
				files: ['<%= config.app %>/jade/{,*/}*.jade'],
				tasks: ['jade']
			},
			livereload: {
				options: {
					livereload: '<%= connect.options.livereload %>'
				},
				files: [
					'<%= config.dist %>/{,*/}*.html',
					'<%= config.dist %>/stylesheets/{,*/}*.css'
				]
			}
		},
		connect: {
			options: {
				port: 9000,
				open: true,
				livereload: 35729,
				base: '<%= config.dist %>',
				hostname: '0.0.0.0'
			},
			livereload: {
				options: {
					middleware: function (connect) {
						return [
							connect.static(config.dist),
							connect.static(config.app)
						];
					}
				}
			},
		},
		compass: {
			options: {
				sassDir: '<%= config.app %>/sass',
				cssDir: '<%= config.dist %>/stylesheets'
			},
			server: {
				options: {
					debugInfo: false
				}
			}
		},
		jade: {
			compile: {
				options: {
					pretty: true,
					debug: false
				},
				files: [{
					expand: true,
					cwd: '<%= config.app %>/jade',
					src: ['*.jade'],
					dest: '<%= config.dist %>',
					ext: '.html'
				}]
			}
		}
	});

	grunt.registerTask('serve', function (target) {
		grunt.task.run([
			'default',
			'connect:livereload',
			'watch'
		]);
	});

	grunt.registerTask('default', [
		'compass',
		'jade'
	]);

};