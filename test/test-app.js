/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var assert = require('yeoman-generator').assert;
var helpers = require('yeoman-generator').test;
var os = require('os');

describe('simple-static-blog:app', function () {
  before(function (done) {
    helpers.run(path.join(__dirname, '../app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompt({
        someOption: true
      })
      .on('end', done);
  });

  it('creates files', function () {
    assert.file([
      'package.json',
      '.editorconfig',
      '.jshintrc',
      'Gruntfile.js',
      'CNAME',
      'app/js/main.js',
      'app/sass/style.scss',
      'app/templates/partials/header.hbs',
      'app/templates/partials/footer.hbs',
      'app/templates/404.hbs',
      'app/templates/archive.hbs',
      'app/templates/category.hbs',
      'app/templates/index.hbs',
      'app/templates/page.hbs',
      'app/templates/post.hbs',
      'app/templates/robots.txt',
    ]);
  });
});
