# generator-simple-static-blog 

> [Yeoman](http://yeoman.io) generator for creating a simple static blog


## Getting Started

To install generator-simple-static-blog from npm, run:

```bash
sudo npm install -g generator-simple-static-blog
```

Then, run the generator:

```bash
yo simple-static-blog
```

### Features

The blog offers comments using either Disqus or Facebook comments. This can be configured when you first set up your blog.

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
* `grunt deploy` builds the site and deploys it to GitHub Pages

## License

MIT
