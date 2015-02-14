'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');

var PageGenerator = yeoman.generators.Base.extend({
    initializing: function () {
        this.pkg = require('../package.json');
    },

    prompting: function () {
        var done = this.async();

        // Have Yeoman greet the user.
        this.log(yosay(
            'Welcome to the page generator!'
        ));

        var prompts = [{
            type: 'input',
            name: 'title',
            message: 'Please enter the page title',
            default: 'My new page'
        }];

        this.prompt(prompts, function (props) {
            this.title = props.title;

            done();
        }.bind(this));
    },

    writing: {
        content: function () {
            // Create post template
            var page_file_name = this.title.replace(/ /g, '-').replace(/\./g, '-dot-').toLowerCase();
            this.template('_new_page.md', 'content/pages/' + page_file_name + '.md');
        }
    },
    
    end: function () {
    }
});

module.exports = PageGenerator;
