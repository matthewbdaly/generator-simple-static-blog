'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var moment = require('moment');

var PostGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the post generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'title',
            message: 'Please enter the post title',
            default: 'My new blog post'
        }];

        this.prompt(prompts, function (props) {
            this.title = props.title;
            this.date = moment();

            done();
        }.bind(this));
    },

    writing: {
        content: function () {
            // Create post template
            var post_file_name = this.title.replace(/ /g, '-').replace(/\./g, '-').toLowerCase();
            this.template('_new_post.md', 'content/posts/' + this.date.toISOString().replace(/T.*$/, '') + '-' + post_file_name + '.md');
        }
    },
    
    end: function () {
    }
});

module.exports = PostGenerator;
