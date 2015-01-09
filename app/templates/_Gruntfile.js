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
                dest: '<%= static_files %>/js/dependencies.js',
                dependencies: {
                    'bootstrap-sass-official': 'jquery'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        blogbuilder: {
          default_options: {
            options: {
              data: {
                author: "<%= author %>",
                url: "<%= url %>",
                <% if(facebookcomments) { %>
                facebookcomments: "<%= facebookcomments %>",
                <% } %>
                <% if(disqus) { %>
                disqus: "<%= disqus %>",
                <% } %>
                title: "<%= title %>",
                description: "<%= description %>"
              },
              template: {
                post: 'app/templates/post.hbs',
                page: 'app/templates/page.hbs',
                index: 'app/templates/index.hbs',
                header: 'app/templates/partials/header.hbs',
                footer: 'app/templates/partials/footer.hbs',
                archive: 'app/templates/archive.hbs',
                notfound: 'app/templates/404.hbs'
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
              'tmp/default_options': ['test/fixtures/testing', 'test/fixtures/123']
            }
          }
        },
        copy: {
            html: {
                expand: true,
                cwd: '<%= build%>/',
                src: [
                    '**'
                ],
                dest: '<%= www %>/'
            },
            static_assets: {
                expand: true,
                src: [
                    'static/**'
                ],
                dest: '<%= www %>/'
            },
            cname: {
                src: 'CNAME',
                dest: '<%= www %>/'
            }
        },
        clean: [
            '<%= www %>',
            '<%=build%>'
        ],
        watch: {
            scripts: {
                files: [
                    'app/templates/*.hbs',
                    'app/templates/partials/*.hbs',
                    'content/pages/*.md',
                    'content/pages/*.markdown',
                    'content/posts/*.md',
                    'content/posts/*.markdown'
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
        sitemap: {
            dist: {
                siteRoot: 'build/',
                pattern: [
                    'build/index.html',
                    'build/**/*.html',
                    'build/**/rss.xml'
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
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-sitemap');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'bower_concat',
        'blogbuilder',
        'sitemap',
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
