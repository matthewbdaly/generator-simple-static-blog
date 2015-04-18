# generator-simple-static-blog 

> [Yeoman](http://yeoman.io) generator for creating a simple static blog. It includes a static search system, powered by [Lunr.js](http://lunrjs.com/).

To see an example of this blogging system in the wild, visit [my site](http://matthewdaly.co.uk).


## Getting Started

To install generator-simple-static-blog from npm, run:

```bash
npm install -g generator-simple-static-blog
```

Then, run the generator:

```bash
yo simple-static-blog
```

### Features

The blog offers comments using either Disqus or Facebook comments. This can be configured when you first set up your blog.

It also includes AddThis integration.

### Sub-generators

This generator has two sub-generators:

```bash
yo simple-static-blog:post
```

This will create a new blog post.

```bash
yo simple-static-blog:page
```

This will create a new page.

Using these two generators makes it easy to create however many posts or pages you wish.

### Grunt tasks

There are three Grunt tasks included:

* `grunt` builds the site - however, in practice you will probably never need to call this as the other tasks also call it.
* `grunt serve` builds the site and calls the development server, with live reload included so that you can see new content immediately.
* `grunt deploy` builds the site and deploys it to GitHub Pages. However, it's easy to amend it to deploy it using other methods, including:
  * `grunt-rsync` for syncing to a server with shell access (I have used this to deploy to a Raspberry Pi)
  * `grunt-bitbucket-pages` for pushing the site to Bitbucket Pages (this is very easy to configure and works well)
  * `grunt-ftp-deploy` if you only have FTP access

## License

MIT
