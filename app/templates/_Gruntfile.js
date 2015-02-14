/* jshint strict: true */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        src: {
            posts: 'content/posts/',
            pages: 'content/pages/'
        },
        bower_concat: {
            all: {
                dest: 'build/dependencies.js',
                dependencies: {
                    'bootstrap-sass-official': 'jquery'
                },
                bowerOptions: {
                    relative: false
                },
                exclude: [
                    'highlightjs'
                ]
            }
        },
        blogbuilder: {
          default: {
            options: {
              data: {
                author: "<%= author %>",
                url: "<%= url %>",
                <% if(addthis) { %>addthis: "<%= addthis %>",<% } %>
                googleanalytics: "<%= googleanalytics %>",
                <% if(facebookcomments) { %>facebookcomments: "<%= facebookcomments %>",<% } %>
                <% if(disqus) { %>disqus: "<%= disqus %>",<% } %>
                title: "<%= title %>",
                description: "<%= description %>"
              },
              template: {
                post: 'app/templates/post.hbs',
                page: 'app/templates/page.hbs',
                index: 'app/templates/index.hbs',
                header: 'app/templates/partials/header.hbs',
                footer: 'app/templates/partials/footer.hbs',
                sidebar: 'app/templates/partials/sidebar.hbs',
                archive: 'app/templates/archive.hbs',
                notfound: 'app/templates/404.hbs',
                robots: 'app/templates/robots.txt'
              },
              src: {
                posts: 'content/posts/',
                pages: 'content/pages/'
              },
              www: {
                dest: 'build'
              }
            },
            files: {
              'tmp/default': ['test/fixtures/testing', 'test/fixtures/123']
            }
          }
        },
        copy: {
            html: {
                expand: true,
                cwd: '<%= build %>/',
                src: [
                    '**/*.html'
                ],
                dest: '<%= www %>/'
            },
            static_assets: {
                expand: true,
                cwd: 'static/',
                src: [
                    'bower_components/**'
                ],
                dest: '<%= www %>/static/'
            },
            css: {
                expand: true,
                cwd: '<%= build %>/css/',
                src: [
                    'style.min.css'
                ],
                dest: '<%= www %>/static/css/'
            },
            js: {
                cwd: '<%= build %>/js/',
                expand: true,
                src: [
                    'dependencies.min.js'
                ],
                dest: '<%= www %>/static/js/'
            },
            rss: {
                cwd: '<%= build %>/',
                expand: true,
                src: [
                    'atom.xml'
                ],
                dest: '<%= www %>/'
            },
            cname: {
                src: 'CNAME',
                dest: '<%= www %>/'
            },
            sitemap: {
                cwd: 'build/',
                expand: true,
                src: [
                    'sitemap.xml'
                ],
                dest: 'www/'
            },
            robots: {
                cwd: 'build/',
                expand: true,
                src: [
                    'robots.txt'
                ],
                dest: 'www/'
            }
        },
        clean: [
            '<%= www %>',
            '<%= build %>'
        ],
        watch: {
            scripts: {
                files: [
                    'app/templates/*.hbs',
                    'app/templates/partials/*.hbs',
                    'app/templates/robots.txt',
                    'content/pages/*.md',
                    'content/pages/*.markdown',
                    'content/posts/*.md',
                    'content/posts/*.markdown',
                    'app/sass/style.scss'
                ],
                tasks: ['default'],
                options: {
                    spawn: false,
                    livereload: {
                        options: {
                            livereload: 35729
                        }
                    }
                }
            }
        },
        connect: {
            options: {
                hostname: 'localhost',
                livereload: 35729,
                open: 'http://localhost:8000/',
                debug: true,
                base: 'www'
            },
            www: {
                directory: '<%= www %>',
                livereload: true
            }
        },
        compass: {
            dist: {
                options: {
                    sassDir: 'app/sass',
                    cssDir: 'build/css'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    'static/bower_components/highlightjs/styles/rainbow.css',
                    'build/css/style.css'
                ],
                dest: 'build/css/output.css'
            }
        },
        cssmin: {
            dist: {
                src: 'build/css/output.css',
                dest: 'build/css/style.min.css'
            }
        },
        uglify: {
            dist: {
                src: 'build/dependencies.js',
                dest: 'build/js/dependencies.min.js'
            }
        },
        imagemin: {
            images: {
                files: [{
                    expand: true,
                    cwd: 'content/images/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= www %>/static/images/'
                }]
            }
        },
        sitemap: {
            dist: {
                siteRoot: 'build/',
                pattern: [
                    'build/index.html',
                    'build/**/*.html',
                    'build/**/atom.xml'
                ],
                homepage: '<%= url %>'
            }
        },
        'gh-pages': {
            options: {
                base: 'www'
            },
            src: ['**']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-blogbuilder');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-sitemap');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'bower_concat',
        'blogbuilder',
        'sitemap',
        'compass',
        'concat',
        'cssmin',
        'uglify',
        'imagemin',
        'copy'
    ]);
    grunt.registerTask('serve', [
        'default',
        'connect',
        'watch'
    ]);
    grunt.registerTask('deploy', [
        'default',
        'gh-pages'
    ]);
};
