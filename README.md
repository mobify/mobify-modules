# Mobify Modules

A library of customizable user interface modules built for mobile-first
and tested across a wide range of devices, while also providing a seamless
desktop experience. They can be used standalone or with a Mobify.js-powered
site.

All modules require either the [Zepto](http://zeptojs.com/) or
[jQuery](http://jquery.com/) JavaScript libraries.

All modules available on [GitHub](https://github.com/mobify/mobify-modules)
and published under an [MIT license](http://www.mobify.com/mobifyjs/license/).

For more information about developing a particular module, take a look 
at the README.md for that module.

## Github Page for Mobify Modules

The Mobify Modules page runs on Jekyll. Using Jekyll, it is very simply to
use Github Pages to create a landing page for your code.

### Installation

To get the static site up and running, switch to the Github Pages branch, install Jekyll,
and install rdiscount (markdown processor):

    git checkout gh-pages
    sudo gem install jekyll
    sudo gem install rdiscount

Then run the following command in the root folder:

    jekyll server --watch --safe --port 4001

(using --safe flag because that's how it is built on Github)

Navigate your browser over to http://localhost:4001/ to see the static page for the modules

### Deployment

If you have write access to the `mobify-modules` repo, you simply need to push
to the `gh-pages` branch:

    git push origin gh-pages

After 10 minutes, you should see the changes reflected on mobify.github.io/mobify-modules
    
