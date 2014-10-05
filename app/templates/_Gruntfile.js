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
                    'bootstrap-sass': 'jquery'
                },
                bowerOptions: {
                    relative: false
                }
            }
        },
        markdown: {
            options: {
                author: "<%= author %>",
                title: "<%= title %>",
                description: "<%= description %>",
                url: "<%= url %>",
                <% if(facebookcomments) { %>
                facebookcomments: "<%= facebookcomments %>",
                <% } %>
                <% if(disqus) { %>
                disqus: "<%= disqus %>",
                <% } %>
                rssCount: 10,
                dateFormat: "Do MMMM YYYY",
                layouts: {
                    wrapper: "app/templates/wrapper.us",
                    index: "app/templates/index.us",
                    post: "app/templates/post.us",
                    page: "app/templates/page.us",
                    archive: "app/templates/archive.us"
                },
                paths: {
                    posts: "content/posts/*.md",
                    pages: "content/pages/*.md",
                    index: "index.html",
                    archive: "archive.html",
                    rss: "rss.xml"
                },
                pathRoots: {
                    posts: "posts",
                    pages: ""
                }
            },
            www: {
                dest: "<%= build %>",
                context: {
                    js: "/static/js/dependencies.js",
                    css: "/static/css/all.css"
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
                    'app/templates/*.us',
                    '<%= src.posts %>/*.md',
                    '<%= src.pages %>/*.md'
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
        'gh-pages': {
            options: {
                base: 'www'
            },
            src: ['**']
        }
    });

    // Load tasks
    grunt.loadNpmTasks('grunt-markdown-blog');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-gh-pages');

    // Register tasks
    grunt.registerTask('default', [
        'clean',
        'bower_concat',
        'markdown',
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
