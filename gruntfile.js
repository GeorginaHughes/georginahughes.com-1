module.exports = function (grunt) {
    grunt.initConfig({
        version: grunt.file.read('version.txt'),
        pkg: grunt.file.readJSON('package.json'),

        //JavaScript


        /**
         * This is JSHint. It prevents the JavaScript process from continuing if there are any JS errors
         * detected. It is configured to use the default JSHint instead of any other, this may be changed
         * in the future.
         * all:				This lists the files that JSHint should check, and allows for inclusion of all
         *					files in all sub-directories.
         * options.reporter: This declares the plugin that is used to output any messages. jshint-stylish
         *					is as stylish as it sounds.
         * options.globals:	This tells JSHint about global variables that may be declared elsewhere.
         */

        jshint: {
            all: ['gruntfile.js', 'scripts/src/**/*.js'],
            options: {
                reporter: require('jshint-stylish'),
                globals: {
                    'jQuery': true
                }
            }
        },

        /**
         * This is Jasmine. It tests all JS files using PhantomJs.
         * src:				The JavaScript source files to be tested.
         * options.specs		The location of the spec files.
         * options.vendor	The location of the vendor files (angular & mocks).
         * options.summary	Flag to display a list of all failed tests and their error messages.
         *					'specs' attribute is not included in the option because it runs the test twice
         *					(explanation: http://stackoverflow.com/a/30160850)
         */

        /*jasmine: {
            dist: {
                //src: ['scripts/modules/GoogleTagManager/*.js'],
                options: {
                    vendor: ['bower_components/angular/angular.min.js', 'scripts/libs/angularjs/1.2.9/angular-route.min.js', 'bower_components/angular-sanitize/angular-sanitize.min.js', 'scripts/libs/angularjs/1.2.9/angular-mocks.js', 'bower_components/wired/wired.min.js'],
                    summary: true
                }
            }
        },*/

        /**
         * This is concat. It concatenates all the JavaScript files so that the next tasks can do their jobs with ease.
         * options.banner:	This is a string to append to the outputted file.
         * src:				The source files to be concatendated.
         * dest:				The file to output to.
         */

        concat: {
            options: {
                banner: '/*Version: <%= version %>, Date: <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %>*/'
            },
            gh: {
                src: ['scripts/src/Apps/app.js', 'scripts/src/cv/*.js', 'scripts/src/home/*.js', 'scripts/src/links/*.js', 'scripts/src/contact/*.js', 'scripts/src/page/*.js', 'scripts/src/Apps/ghConfiguration.js', '!scripts/modules/**/*.spec.js'],
                dest: 'scripts/buffer/gh.concat.js'
            }
        },

        /**
         * This is ngannotate. It helps with dependancy injection in AngularJs.
         * options.remove:		This removes any existing DI.
         * options.add:			This adds DI based on function signatures.
         * options.signleQuotes:	This uses single quotes for string wrappers instead of double.
         * files:				The location of the files to annotate and where to output to, in the format
         *						output: [input].
         */

        ngAnnotate: {
            options: {
                remove: true,
                add: true,
                singleQuotes: true
            },
            build: {
                files: {
                    'scripts/buffer/gh.annotate.js': 'scripts/buffer/gh.concat.js'
                }
            }
        },

        /**
         * This is uglify. If minifies all JS files and outputs to the distribution folder.
         *
         *										!IMPORTANT!
         * The dev process produces human friendly files for ease of debugging. These will contain comments
         * and will not be uglified.
         *
         * files:					The source files and where to output to, in the format output: [inputs].
         * options.beautify:			This option sets whether or not the file should be minified. True = unminified file.
         * options.banner:			This is prepended to the minified file. It includes product name, version number,
         *							and date to help with debugging.
         * options.compress:			This sets variables to allow insertion of debug code that doesn't go through to
         *							production. To create debug code, wrap code in an if statement.
         *							if(DEBUG){//code here} As DEBUG is false in production the code will be unreachable
         *							and so will not be included in the minified file.
         * options.preserveComments:	This options sets whether or not comments should be in the resulting file.
         */

        uglify: {
            build: {
                options: {
                    beautify: false,
                    banner: '/*Product: <%= pkg.name %>, Version: <%= version %>, Date: <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %>*/',
                    compress: {
                        global_defs: {
                            "DEBUG": false
                        }
                    }
                },
                files: {
                    'scripts/dist/gh.min.js': ['scripts/buffer/gh.annotate.js']
                }
            },
            dev: {
                options: {
                    beautify: true,
                    preserveComments: true,
                    banner: '/*Product: <%= pkg.name %>, Version: <%= version %>, Date: <%= grunt.template.today("yyyy-mm-dd h:MM:ss") %>*/',
                    compress: {
                        global_defs: {
                            "DEBUG": true
                        }
                    }
                },
                files: {
                    'scripts/dist/gh.min.js': ['scripts/buffer/gh.annotate.js']
                }
            }
        },


        //CSS


        /**
         * This is sass. It transpiles and minifies all sass files in the given directory.
         * options.style:		This is the format the output file should be written in. It currently compresses.
         * options.lineNumbers:	This is whether or not it should put in original file line numbers. Set to true for
         *						debugging purposes, but leave false upon check in.
         * options.trace:		This shows a full traceback on any errors.
         * files:				The source file and where to output to, in the format output: input.
         */

        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    lineNumbers: false,
                    trace: true
                },
                files: {
                    'styles/dist/gh.min.css': 'styles/src/gh.scss'
                }
            }
        },

        /**
         * This is autoprefixer. It inserts the browser prefixes into our transpiled and minified CSS files.
         * options.browsers:	The list of browsers to support with prefixes.
         * options.cascade:	This stops autoprefixer form making nice indentation with the prefixes, which we don't want
         *					as this is a minified file.
         * options.map:		This tells autoprefixer to create a map file, which helps with debugging in Chrome.
         */

        /*autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 10 versions', 'ie 8', 'ie 9'],
                cascade: false,
                map: true
            },
            bingo: {
                src: 'styles/build/bingo_unprefixed.min.css',
                dest: 'styles/build/bingo.min.css'
            },
            casino: {
                src: 'styles/build/casino_unprefixed.min.css',
                dest: 'styles/build/casino.min.css'
            },
            plus: {
                src: 'styles/build/plus_unprefixed.min.css',
                dest: 'styles/build/plus.min.css'
            },
            poker: {
                src: 'styles/build/poker_unprefixed.min.css',
                dest: 'styles/build/poker.min.css'
            },
            sport: {
                src: 'styles/build/sport_unprefixed.min.css',
                dest: 'styles/build/sport.min.css'
            },
            vegas: {
                src: 'styles/build/vegas_unprefixed.min.css',
                dest: 'styles/build/vegas.min.css'
            },
            sportsSideBar: {
                src: 'styles/build/sportsSideBar_unprefixed.min.css',
                dest: 'styles/build/sportsSideBar.min.css'
            },
            reset: {
                src: 'styles/build/reset_unprefixed.min.css',
                dest: 'styles/build/reset.min.css'
            }
        },*/

        //Tools

        /**
         * This is watch. It keeps an eye on files and when they change it triggers other Grunt tasks.
         * scripts:	The tasks to run for the JS build process.
         * styles:	The tasks to run for the CSS build process.
         */

        watch: {
            scripts: {
                files: 'scripts/src/**/*.js', //to watch
                tasks: ['clean:previousJsBuild', 'jshint', 'concat', 'ngAnnotate', 'uglify:dev', 'clean:jsBuffer'] //to do
            },
            styles: {
                files: 'styles/src/**/*.scss', //to watch
                tasks: ['clean:previousCssBuild', 'sass'] //to do
            }
        },

        /**
         * This is jsdoc. It builds the documentation for our JS files.
         * src:			The source code of the JS files to document.
         * dest:			The output directory for the documentation.
         * template:		The documentation site template to use.
         * configure:	The JSON configuration of the template being used.
         */

        /*jsdoc: {
            dist: {
                //src:		['scripts/modules/*.js'],
                dest:		'scripts/jsdoc',
                template:	'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template',
                configure:	'node_modules/grunt-jsdoc/node_modules/ink-docstrap/template/jsdoc.conf.json'
            }
        },*/

        /**
         * This is kss. It builds the documentation for our CSS files.
         */

       /*kss: {
            options: {

            },
            dist: {
                files: {
                    //kssdocs: ['styles/sass/*.scss']
                }
            }
        },*/

        /**
         * This is clean. It removes any unwanted files that were created during running
         * previousCssBuild:	The path to the previously built CSS files.
         * previousJsBuild:	The path to the previously built JS files.
         * previousBuild:	The paths to the previously built JS and CSS files.
         * cssUnprefixed:	The path to the unprefixed css files that we want to remove.
         * jsBuffer:			The path to the various JS files that are created as part of the build process, but are no longer required.
         */

        clean: {
            previousCssBuild: ["styles/dist/*"],
            previousJsBuild: ["scripts/dist/*"],
            previousBuild: ["styles/dist/*", "scripts/dist/*"],
            jsBuffer: ["scrpits/buffer/**/*.js"]
        }

    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    //grunt.loadNpmTasks('grunt-autoprefixer');
    //grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    //grunt.loadNpmTasks('grunt-jsdoc');
    //grunt.loadNpmTasks('grunt-kss');
    grunt.loadNpmTasks('grunt-contrib-clean');

    //tasks
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('watchJs', ['watch:scripts']);
    grunt.registerTask('watchCss', ['watch:styles']);
    grunt.registerTask('development', ['clean:previousBuild', 'jshint', 'concat', 'ngAnnotate', 'uglify:dev', 'sass', 'clean:jsBuffer']);
    grunt.registerTask('production', ['clean:previousBuild', 'jshint', 'concat', 'ngAnnotate', 'uglify:build', 'clean:jsBuffer']);
};
