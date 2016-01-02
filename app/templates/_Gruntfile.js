/* jshint strict: true */
module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        src: {
            posts: 'content/posts/',
            pages: 'content/pages/'
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'app/js/*.js'
            ]
        },
        browserify: {
          dist: {
            files: {
              'build/js/all.js': 'app/js/main.js'
            }
          }
        },
        blogbuilder: {
          default: {
            options: {
              data: {
                author: "<%= author %>",
                url: "<%= url %>",
                email: "<%= email %>",
                <% if(addthis) { %>addthis: "<%= addthis %>",<% } %>
                googleanalytics: "<%= googleanalytics %>",
                <% if(facebookcomments) { %>facebookcomments: "<%= facebookcomments %>",<% } %>
                <% if(disqus) { %>disqus: "<%= disqus %>",<% } %>
                <% if(github) { %>github: "<%= github %>",<% } %>
                title: "<%= title %>",
                description: "<%= description %>",
                truncatefeed: 0,
                linenos: true
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
                robots: 'app/templates/robots.txt',
                category: 'app/templates/category.hbs'
              },
              src: {
                posts: 'content/posts/',
                pages: 'content/pages/'
              },
              www: {
                dest: '<%= blogbuilderoutput %>'
              }
            }
          }
        },
        copy: {
            html: {
                expand: true,
                cwd: '<%= build %>/',
                src: [
                    '**/*.html',
                    '**/rss.xml',
                    '**/atom.xml'
                ],
                dest: '<%= www %>/'
            },
            static_assets: {
                expand: true,
                cwd: '<%= static %>/',
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
                    'all.min.js'
                ],
                dest: '<%= www %>/static/js/'
            },
            rss: {
                cwd: '<%= blogbuilderoutput %>/',
                expand: true,
                src: [
                    'rss.xml'
                ],
                dest: '<%= www %>/'
            },
            atom: {
                cwd: '<%= blogbuilderoutput %>/',
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
                cwd: '<%= blogbuilderoutput %>/',
                expand: true,
                src: [
                    'sitemap.xml'
                ],
                dest: '<%= www %>/'
            },
            robots: {
                cwd: '<%= blogbuilderoutput %>/',
                expand: true,
                src: [
                    'robots.txt'
                ],
                dest: '<%= www %>/'
            },
            lunr: {
                cwd: '<%= blogbuilderoutput %>/',
                expand: true,
                src: [
                    'lunr.json'
                ],
                dest: '<%= www %>/'
            }
        },
        clean: [
            '<%= www %>',
            '<%= build %>',
            '<%= blogbuilderoutput %>'
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
                    cssDir: '<%= build %>/css'
                }
            }
        },
        concat: {
            dist: {
                src: [
                    '<%= static %>/bower_components/highlightjs/styles/rainbow.css',
                    '<%= build %>/css/style.css'
                ],
                dest: '<%= build %>/css/output.css'
            }
        },
        cssmin: {
            dist: {
                src: '<%= build %>/css/output.css',
                dest: '<%= build %>/css/style.min.css'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= blogbuilderoutput %>',
                    src: '**/*.html',
                    dest: '<%= build %>/'
                }]
            }
        },
        uglify: {
            dist: {
                src: [
                    '<%= build %>/dependencies.js',
                    'app/js/main.js'
                ],
                dest: '<%= build %>/js/all.min.js'
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
                siteRoot: '<%= blogbuilderoutput %>/',
                pattern: [
                    '<%= blogbuilderoutput %>/index.html',
                    '<%= blogbuilderoutput %>/**/*.html',
                    '<%= blogbuilderoutput %>/**/rss.xml'
                ],
                homepage: '<%= url %>/'
            }
        },
        'gh-pages': {
            options: {
                base: '<%= www %>',
                branch: 'master'
            },
            src: ['**']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-newer');
    grunt.loadNpmTasks('grunt-blogbuilder');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-sitemap');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-browserify');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'newer:jshint',
        'browserify',
        'blogbuilder',
        'sitemap',
        'compass',
        'cssmin',
        'htmlmin',
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
